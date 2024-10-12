import json
import logging
import os

from channels.generic.websocket import JsonWebsocketConsumer
from rest_framework.test import APIRequestFactory

from .model_mappings import get_model_viewset_mapping


class GlobalConsumer(JsonWebsocketConsumer):
    model_viewset_mapping = get_model_viewset_mapping()

    # Initialize logging
    logging.basicConfig(format="%(asctime)s - %(message)s", level=logging.INFO)
    logger = logging.getLogger("websocket")

    async def connect(self):
        self.challenge = os.urandom(32).hex()
        self.accept()
        self.send(
            text_data=json.dumps(
                {
                    "type": "authentication_challenge",
                    "challenge": self.challenge,
                }
            )
        )
        self.self.logger.info(
            "WebSocket connection accepted", level=self.logger.INFO
        )

    def disconnect(self, close_code):
        self.logger.info("WebSocket disconnected: %s", close_code)

    def receive_json(self, content):
        self.logger.info("Received data: %s", content)

        # Extract action and model from content
        action = content.get("action")
        model_name = content.get("model")
        data = content.get("data", {})

        # Check if model exists in the dynamic mapping
        if model_name in self.model_viewset_mapping:
            model, viewset_class = self.model_viewset_mapping[model_name]
            self.dispatch_to_viewset(viewset_class, action, data)
        else:
            self.send_json(
                {"type": "error", "message": "Unknown model: {model_name}."}
            )
            self.logger.error("Unknown model requested: %s", model_name)

    def dispatch_to_viewset(self, viewset_class, action, data):
        factory = APIRequestFactory()

        # Dispatch to appropriate ViewSet based on the action
        if action == "GET":
            request = factory.get("/")
            viewset = viewset_class.as_view({"get": "list"})
            response = viewset(request)
            self.send_json(response.data)
            self.logger.info("GET request for %s", viewset_class.__name__)

        elif action == "POST":
            request = factory.post("/", data)
            viewset = viewset_class.as_view({"post": "create"})
            response = viewset(request)
            self.send_json(response.data)
            self.logger.info("POST request for %s", viewset_class.__name__)

        elif action == "PUT":
            object_id = data.get("id")
            request = factory.put(f"/{object_id}/", data)
            viewset = viewset_class.as_view({"put": "update"})
            response = viewset(request, pk=object_id)
            self.send_json(response.data)
            self.logger.info(
                "PUT request for %s on object ID %s",
                viewset_class.__name__,
                object_id,
            )

        elif action == "DELETE":
            object_id = data.get("id")
            request = factory.delete(f"/{object_id}/")
            viewset = viewset_class.as_view({"delete": "destroy"})
            response = viewset(request, pk=object_id)
            self.send_json({"message": f"Deleted {object_id}"})
            self.logger.info(
                "DELETE request for %s_on object ID %s",
                viewset_class.__name__,
                object_id,
            )

        else:
            self.send_json(
                {"type": "error", "message": f"Unsupported action: {action}."}
            )
            self.logger.error(f"Unsupported action requested: {action}")

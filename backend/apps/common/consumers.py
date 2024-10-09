import logging
import os

from channels.generic.websocket import JsonWebsocketConsumer
from rest_framework.test import APIRequestFactory

from .model_mappings import get_model_viewset_mapping

# Initialize logging
logger = logging.getLogger(__name__)


class GlobalConsumer(JsonWebsocketConsumer):
    model_viewset_mapping = get_model_viewset_mapping()

    async def connect(self):
        self.challenge = os.urandom(32).hex()
        self.accept()
        self.send(
            text_data=json.dumps(
                {"type": "authentication_challenge", "challenge": self.challenge}
            )
        )
        logger.info("WebSocket connection accepted")

    def disconnect(self, close_code):
        logger.info(f"WebSocket disconnected: {close_code}")

    def receive_json(self, content):
        logger.info(f"Received data: {content}")

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
                {"type": "error", "message": f"Unknown model: {model_name}."}
            )
            logger.error(f"Unknown model requested: {model_name}")

    def dispatch_to_viewset(self, viewset_class, action, data):
        factory = APIRequestFactory()

        # Dispatch to appropriate ViewSet based on the action
        if action == "GET":
            request = factory.get("/")
            viewset = viewset_class.as_view({"get": "list"})
            response = viewset(request)
            self.send_json(response.data)
            logger.info(f"GET request for {viewset_class.__name__}")

        elif action == "POST":
            request = factory.post("/", data)
            viewset = viewset_class.as_view({"post": "create"})
            response = viewset(request)
            self.send_json(response.data)
            logger.info(f"POST request for {viewset_class.__name__}")

        elif action == "PUT":
            object_id = data.get("id")
            request = factory.put(f"/{object_id}/", data)
            viewset = viewset_class.as_view({"put": "update"})
            response = viewset(request, pk=object_id)
            self.send_json(response.data)
            logger.info(
                f"PUT request for {viewset_class.__name__} on object ID {object_id}"
            )

        elif action == "DELETE":
            object_id = data.get("id")
            request = factory.delete(f"/{object_id}/")
            viewset = viewset_class.as_view({"delete": "destroy"})
            response = viewset(request, pk=object_id)
            self.send_json({"message": f"Deleted {object_id}"})
            logger.info(
                f"DELETE request for {viewset_class.__name__} on object ID {object_id}"
            )

        else:
            self.send_json(
                {"type": "error", "message": f"Unsupported action: {action}."}
            )
            logger.error(f"Unsupported action requested: {action}")

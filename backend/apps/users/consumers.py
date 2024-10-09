import json

from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import AnonymousUser


class AuthenticatedConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Access the user via the session authentication system
        user = self.scope["user"]
        if isinstance(user, AnonymousUser):
            await self.close()
        else:
            await self.accept()

    async def receive(self, text_data):
        user = self.scope["user"]
        data = json.loads(text_data)
        action = data.get("action")

        if action == "view_profile" and user.is_authenticated:
            profile_data = {"username": user.username, "email": user.email}
            await self.send(json.dumps(profile_data))

    async def disconnect(self, close_code):
        pass

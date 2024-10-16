import logging

from rest_framework.decorators import action
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

logger = logging.getLogger(__name__)


class SystemView(APIView):
    renderer_classes = [JSONRenderer]

    @action(detail=False, methods=["get"])
    def get(self, request, *args, **kwargs):
        data = {"message": "Endpoint api/sys/ works!!"}
        return Response(data, status=200)

    @action(detail=False, methods=["post"])
    def post(request):
        message = request.data.get("message")
        if message:
            logger.info(message)
            return Response({"status": "logged"}, status=200)
        return Response({"error": "No message provided"}, status=400)

import importlib

from django.apps import apps


def get_model_viewset_mapping():
    model_viewset_mapping = {}

    for app_config in apps.get_app_configs():
        try:
            # Import the views module for each app
            views_module = importlib.import_module(f"{app_config.name}.views")
        except ModuleNotFoundError:
            continue  # Skip apps without a views module

        # Get all models for the app
        app_models = app_config.get_models()

        for model in app_models:
            # Check if a ViewSet exists for the model
            viewset_class_name = f"{model.__name__}ViewSet"
            viewset_class = getattr(views_module, viewset_class_name, None)

            if viewset_class:
                model_viewset_mapping[model.__name__] = (model, viewset_class)

    return model_viewset_mapping

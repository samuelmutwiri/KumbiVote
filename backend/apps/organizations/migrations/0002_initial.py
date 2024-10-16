# Generated by Django 5.1 on 2024-10-12 10:49

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("organizations", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="incumbent",
            name="user",
            field=models.ForeignKey(
                default=None,
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="member",
            name="branch",
            field=models.ForeignKey(
                default=0,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="%(class)s",
                to="organizations.branch",
            ),
        ),
        migrations.AddField(
            model_name="member",
            name="user",
            field=models.ForeignKey(
                default=None,
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="member",
            name="organization",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="%(class)s",
                to="organizations.organization",
            ),
        ),
        migrations.AddField(
            model_name="branch",
            name="organization",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="organizations.organization",
            ),
        ),
        migrations.AddField(
            model_name="body",
            name="organization",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="organizations.organization",
            ),
        ),
        migrations.AddField(
            model_name="organizationalunit",
            name="organization",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="organizations.organization",
            ),
        ),
        migrations.AddField(
            model_name="organizationalunit",
            name="parent_id",
            field=models.ForeignKey(
                default=None,
                on_delete=django.db.models.deletion.CASCADE,
                to="organizations.organizationalunit",
            ),
        ),
        migrations.AddField(
            model_name="member",
            name="unit",
            field=models.ForeignKey(
                default=None,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="%(class)s",
                to="organizations.organizationalunit",
            ),
        ),
        migrations.AddField(
            model_name="branch",
            name="ou",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="%(class)s",
                to="organizations.organizationalunit",
            ),
        ),
        migrations.AddField(
            model_name="body",
            name="unit",
            field=models.ForeignKey(
                default=None,
                on_delete=django.db.models.deletion.CASCADE,
                to="organizations.organizationalunit",
            ),
        ),
        migrations.AddField(
            model_name="organization",
            name="org_type",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="organizations.organizationtype",
            ),
        ),
        migrations.AddField(
            model_name="position",
            name="body",
            field=models.ForeignKey(
                default=None,
                on_delete=django.db.models.deletion.CASCADE,
                to="organizations.body",
            ),
        ),
        migrations.AddField(
            model_name="incumbent",
            name="position",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="organizations.position"
            ),
        ),
        migrations.AddField(
            model_name="term",
            name="body",
            field=models.ForeignKey(
                default=None,
                on_delete=django.db.models.deletion.CASCADE,
                to="organizations.body",
            ),
        ),
        migrations.AddField(
            model_name="incumbent",
            name="term",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="organizations.term"
            ),
        ),
    ]

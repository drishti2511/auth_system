# Generated by Django 4.2.5 on 2023-10-07 16:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0004_rename_users_bandfrequency_band_frequency"),
    ]

    operations = [
        migrations.AddField(
            model_name="userprofileaccount",
            name="band_frequency",
            field=models.ManyToManyField(blank=True, to="accounts.bandfrequency"),
        ),
    ]

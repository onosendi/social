# Generated by Django 3.1.1 on 2021-02-25 20:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_profile_sex'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='fake_account',
            field=models.BooleanField(default=False),
        ),
    ]

# Generated by Django 5.0.2 on 2024-02-23 05:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resume', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='professionalexperience',
            name='relevance',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='project',
            name='relevance',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='resume',
            name='relevance',
            field=models.IntegerField(default=0),
        ),
    ]

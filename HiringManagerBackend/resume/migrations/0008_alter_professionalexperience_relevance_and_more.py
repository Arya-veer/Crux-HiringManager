# Generated by Django 5.0.2 on 2024-02-26 15:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resume', '0007_alter_professionalexperience_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='professionalexperience',
            name='relevance',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='project',
            name='relevance',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='resume',
            name='relevance',
            field=models.IntegerField(default=0, null=True),
        ),
    ]

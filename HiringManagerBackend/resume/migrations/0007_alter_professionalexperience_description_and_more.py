# Generated by Django 5.0.2 on 2024-02-26 15:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resume', '0006_alter_college_branch_alter_college_degree_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='professionalexperience',
            name='description',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='professionalexperience',
            name='organization',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='professionalexperience',
            name='relevance',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='professionalexperience',
            name='role',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='professionalexperience',
            name='tech_stack',
            field=models.JSONField(null=True),
        ),
        migrations.AlterField(
            model_name='professionalexperience',
            name='time_duration',
            field=models.JSONField(null=True),
        ),
        migrations.AlterField(
            model_name='project',
            name='description',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='project',
            name='relevance',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='project',
            name='tech_stack',
            field=models.JSONField(null=True),
        ),
        migrations.AlterField(
            model_name='project',
            name='time_duration',
            field=models.JSONField(null=True),
        ),
    ]
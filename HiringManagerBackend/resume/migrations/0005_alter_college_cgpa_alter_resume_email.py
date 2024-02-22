# Generated by Django 5.0.2 on 2024-02-26 12:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resume', '0004_college_cgpa'),
    ]

    operations = [
        migrations.AlterField(
            model_name='college',
            name='cgpa',
            field=models.DecimalField(decimal_places=1, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='resume',
            name='email',
            field=models.EmailField(blank=True, max_length=100, null=True),
        ),
    ]

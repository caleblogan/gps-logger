# Generated by Django 2.0.2 on 2018-02-07 21:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('geologger', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='position',
            name='date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]

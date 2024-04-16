# seed mushroom model
from django.db import migrations

def seed_mushrooms(apps, schema_editor):
    Mushroom = apps.get_model('field_trips', 'Mushroom')
    Mushroom.objects.create(common_name='Lobster mushroom', latin_name='Hypomyces lactiflourum', image_url='https://en.wikipedia.org/wiki/Hypomyces_lactifluorum#/media/File:Lobster_mushrooms.jpg', info_url='https://www.inaturalist.org/taxa/48215-Hypomyces-lactifluorum')
    Mushroom.objects.create(common_name='Common Morel', latin_name='Morchella esculenta', image_url='https://en.wikipedia.org/wiki/Morchella_esculenta#/media/File:Morchella_esculenta_-_DE_-_TH_-_2013-05-01_-_01.JPG', info_url='https://www.inaturalist.org/taxa/58682-Morchella-esculenta')
    Mushroom.objects.create(common_name='Chicken of the woods', latin_name='Laetiporus sulphureus', image_url='https://en.wikipedia.org/wiki/Laetiporus_sulphureus#/media/File:Laetiporus_sulphureus_big.jpg', info_url='https://www.inaturalist.org/taxa/53713-Laetiporus-sulphureus')
    Mushroom.objects.create(common_name='Oyster mushroom', latin_name='Pleurotus ostreatus', image_url='https://en.wikipedia.org/wiki/Pleurotus_ostreatus#/media/File:Pleurotus_ostreatus_JPG7.jpg', info_url='https://www.inaturalist.org/taxa/1196165-Pleurotus-ostreatus')
    Mushroom.objects.create(common_name='Golden Chanterelle', latin_name='Cantharellus cibarius', image_url='https://en.wikipedia.org/wiki/Cantharellus_cibarius#/media/File:Chanterelle_Cantharellus_cibarius.jpg', info_url='https://www.inaturalist.org/taxa/47347-Cantharellus-cibarius')
    Mushroom.objects.create(common_name='Fly Agaric', latin_name='Amanita muscaria', image_url='https://en.wikipedia.org/wiki/Amanita_muscaria#/media/File:Muchomurka_cervena.jpg', info_url='https://www.inaturalist.org/taxa/48715-Amanita-muscaria')
    Mushroom.objects.create(common_name='Cauliflower mushroom', latin_name='Sparassis radicata', image_url='https://en.wikipedia.org/wiki/Sparassis#/media/File:Sparassis_crispa_JPG1.jpg', info_url='https://www.inaturalist.org/taxa/486226-Sparassis-radicata')
    Mushroom.objects.create(common_name='Puffball', latin_name='Lycoperdon perlatum', image_url='https://en.wikipedia.org/wiki/Puffball#/media/File:Flaschenst%C3%A4ubling.jpg', info_url='https://www.inaturalist.org/taxa/48443-Lycoperdon-perlatum')
    Mushroom.objects.create(common_name='Common Ink Cap', latin_name='Coprinopsis atramentaria', image_url='https://en.wikipedia.org/wiki/Coprinopsis_atramentaria#/media/File:Coprinopsis_atramentaria_3_-_Lindsey.jpg', info_url='https://www.inaturalist.org/taxa/48521-Coprinopsis-atramentaria')
    Mushroom.objects.create(common_name='Mica cap', latin_name='Coprinellus micaceus', image_url='https://en.wikipedia.org/wiki/Coprinellus_micaceus#/media/File:Coprinellus_micaceus_Glimmer-Tintling.jpg', info_url='https://www.inaturalist.org/taxa/56318-Coprinellus-micaceus')
    Mushroom.objects.create(common_name='King Bolete', latin_name='Boletus edulis', image_url='https://en.wikipedia.org/wiki/Boletus_edulis#/media/File:Boletus_edulis_IT.jpg', info_url='https://www.inaturalist.org/taxa/48701-Boletus-edulis')
    Mushroom.objects.create(common_name='West Coast Reishi', latin_name='Ganoderma oregonense', image_url='https://en.wikipedia.org/wiki/Ganoderma_oregonense#/media/File:Ganoderma_oregonense_343616476.jpg', info_url='https://www.inaturalist.org/taxa/118062-Ganoderma-oregonense')
    Mushroom.objects.create(common_name='Turkey Tail', latin_name='Trametes versicolor', image_url='https://en.wikipedia.org/wiki/Trametes_versicolor#/media/File:Trametes_versicolor_G4_(1).JPG', info_url='https://www.inaturalist.org/taxa/54134-Trametes-versicolor')
    Mushroom.objects.create(common_name='Mycena', latin_name='Mycena sp.', image_url='https://en.wikipedia.org/wiki/Mycena#/media/File:2020-11-23_Mycena_amicta_(Fr.)_Qu%C3%A9l_1282158.jpg', info_url='https://www.inaturalist.org/taxa/55922-Mycena')
    Mushroom.objects.create(common_name='Shaggy Mane', latin_name='Coprinus comatus', image_url="https://en.wikipedia.org/wiki/Coprinus_comatus#/media/File:Coprinus_comatus,_the_shaggy_ink_cap,_lawyer's_wig,_or_shaggy_mane_mushroom.jpg", info_url='https://www.inaturalist.org/taxa/47392-Coprinus-comatus')              
    Mushroom.objects.create(common_name='Wrinkled thimble morel', latin_name='Verpa bohemica', image_url='https://en.wikipedia.org/wiki/Verpa_bohemica#/media/File:Verpa_bohemica1.jpg', info_url='https://www.inaturalist.org/taxa/126131-Verpa-bohemica')
    Mushroom.objects.create(common_name='Conic morel', latin_name='Verpa conica', image_url='https://en.wikipedia.org/wiki/Verpa_conica#/media/File:Verpa_conica_by_Ron_Pastorino.jpg', info_url='https://www.inaturalist.org/taxa/118002-Verpa-conica')
    Mushroom.objects.create(common_name='False morel', latin_name='Gyromitra esculenta', image_url='https://en.wikipedia.org/wiki/Gyromitra_esculenta#/media/File:Fr%C3%BChjahrslorchel.JPG', info_url='https://www.inaturalist.org/taxa/85120-Gyromitra-esculenta')
    Mushroom.objects.create(common_name='Winter chanterelle/yellowfoot', latin_name='Craterellus tubaeformis', image_url='https://en.wikipedia.org/wiki/Craterellus_tubaeformis#/media/File:Craterellus_tubaeformis_LC0374.jpg', info_url='https://www.inaturalist.org/taxa/350511-Craterellus-tubaeformis')
    Mushroom.objects.create(common_name='American Matsutake', latin_name='Tricholoma magnivelare', image_url='https://en.wikipedia.org/wiki/Tricholoma_magnivelare#/media/File:2018-10-05_Tricholoma_magnivelare_(Peck)_Redhead_972957.jpg', info_url='https://www.inaturalist.org/taxa/62483-Tricholoma-magnivelare')

class Migration(migrations.Migration):
    dependencies = [
        ('field_trips', '0002_mushroom_info_url'),
    ]

    operations = [
        migrations.RunPython(seed_mushrooms),
    ]

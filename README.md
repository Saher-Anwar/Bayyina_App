# Bayyina_App
<h2> Steps to build Database </h2>
cd frontend
docker-compose up -d
run table_creator.sql
run quran_builder.sql
python ./database_builder/build_morphology.py <b> Wait for it to finish building before running next line</b>
python ./database_builder/build_isms.py 
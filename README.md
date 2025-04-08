# Bayyina_App
<h2> Steps to build Database </h2>

```bash
cd frontend
docker-compose up -d
run table_creator.sql
run quran_builder.sql

# Wait for build_morphology file to finish executing before running build_isms
python ./database_builder/build_morphology.py 
python ./database_builder/build_isms.py 
```
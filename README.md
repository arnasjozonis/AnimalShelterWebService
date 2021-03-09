# AnimalShelterWebService

Build docker image:
docker build --tag asws .

Run docker container:
docker run -it --init -p 5000:3000 asws

API documentation:

/api/shelter
GET: list of all shelters and animals in them
POST: add shelter object: { name, description, location} // location and name combination should be unique

/api/shelter/:id
GET: get shelter object with animals
PUT: upadate shelter info
DELETE: delete shelter (only if all animals are previously deleted)

/api/shelter/:id/animal
GET: get all animals in shelter with id in url
POST: add animal to shelter with id in url

/api/shelter/:id/animal/:animalId
GET: get animal with animalId in url
PUT: update animal info for animal with animalId in url
DELETE: delete animal with animalId in url

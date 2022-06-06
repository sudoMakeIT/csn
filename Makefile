up:
	docker-compose up --build

down: 
	docker-compose down

clean:
	sudo rm -rf database/
	docker-compose down
	docker-compose build --no-cache
	docker-compose up

build:
	docker-compose build --no-cache

shell:
	docker exec -ti webserver bash

mongo:
	docker exec -ti csnDatabase mongo

logs:
	docker logs -f --tail 100 webserver


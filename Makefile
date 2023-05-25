DOCKER_COMPOSE?=docker-compose
DOCKER?=docker

up: docker-compose
	${DOCKER_COMPOSE} up -d

build:
	@docker-compose stop && docker-compose up --build -d --remove-orphans

.PHONY: Migrate / seed database

migrate:
	docker-compose exec service yarn migrate

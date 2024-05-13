#включть контейнеры в текущем каталоге (из фаила docker-compose.yml)
docker-up:
	sudo docker-compose up -d

#собрать/пересобрать контейнеры в текущем каталоге (из фаила docker-compose.yml)
docker-build:
	sudo docker-compose up --build -d

#остановить контейнеры в текущем каталоге (из фаила docker-compose.yml)
docker-down:
	sudo docker-compose down

docker-rebuild:
	sudo docker-compose up -d --no-deps --build $(name)

#список всех контейнеров
docker-containers-list:
	sudo docker ps -a

#выключить все контейнеры, абсолютно все
docker-all-stop:
	sudo docker stop $$(sudo docker ps -a -q)

#удалить все контейнеры, абсолютно все
docker-all-destroy:
	sudo docker rm $$(sudo docker ps -a -q)

#изменить права на каталоги
perm:
	sudo chown ${USER}:${USER} ./app/storage -R
	sudo chmod -R 777 ./app/storage

########################################################
########################################################
######                  LARA                      ######
########################################################
########################################################

#версия laravel
laravel-version:
	sudo docker exec php-fpm php -v
	sudo docker exec php-fpm php artisan -V

#Собственно установка самой лары
laravel-self-install:
	sudo docker exec php-fpm composer create-project laravel/laravel .

#laravel ссылка на папку storage
laravel-storage-link:
	sudo docker exec php-fpm php artisan storage:link

#Сделать env
env-prepare:
	sudo docker exec php-fpm cp .env.example .env

#Сгенерировать ключ
key: 
	sudo docker exec php-fpm php artisan key:generate

#очистить кеш лары
laravel-clear:
	sudo docker exec php-fpm php artisan cache:clear
	sudo docker exec php-fpm php artisan config:clear
	sudo docker exec php-fpm php artisan route:cache

#Запустить миграции
laravel-migrate:
	sudo docker exec php-fpm php artisan migrate

#Откат миграции
laravel-migrate-rollback:
	sudo docker exec php-fpm php artisan migrate:rollback

########################################################
########################################################
######                  NODE                      ######
########################################################
########################################################

#Установить ноду зависимости
node-install:
	sudo docker exec node npm install

#собрать пакеты
node-dev:
	sudo docker exec node npm run dev

#Установить пакет
node-pack-install:
	sudo docker exec node npm i -S $(packname)

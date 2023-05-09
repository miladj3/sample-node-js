## Description

A temporary repo for daal co assessment test for Senior NodeJS Developer position.
## Installation
First install the dependencies in all services including `gateway`, `transaction` and `wallet`:
```bash
$ npm i
```
Then you need to create `.env` files for `transaction` and `wallet` to run database migrations on your database.

So next step would be running the migration command in each service directory:
```
    npx prisma migrate dev
```


Then you should make the `.env` file from `.env.example` from the root directory of the project next to `docker-compose.yml` file.

Now we are able to run out docker compose:
```
    docker-compose up
```
At the end you should see url to Swagger's API and test the microservices.



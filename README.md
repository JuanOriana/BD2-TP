# BD2-TP

A simple API + SPA page combo that servers as an URL shortener like bit.ly. Its includes authentication, admin panel, user-plan control, and much more.

## Set Up
To get the API running, you need MongoDB and Redis instances running. You can set them up very quickly using docker by executing the following command inside the
```./backend``` directory

```shell
docker-compose up
```

Once that is done, you can bootstrap the backend. It is built on top of FastAPI, so you will need Python 3.7 or above. Then, you can install the requirements
by running

```shell
pip install -r requirements.txt
```

Finally, once that is done, start the api using

```shell
uvicorn app.main:app
```

It will start operating on port 8000 (you can see documentation over at localhost:8000/docs!)

Finally, you may want to get the frontend running as well. Just go to the ```frontend``` directory and execute the following commands
```shell
npm install
npm start
```

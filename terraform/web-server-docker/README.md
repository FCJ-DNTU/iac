# A simple web server with Docker
## About
In this example, we will deploy a simple NodeJS server to Docker.

## Steps
### 1 - Build image
Before you start, you have to build the image to pack the source code of application. Change the current working directory to this directory, and run
```bash
bash scripts/setup.sh
```

Check your image
```bash
docker image ls
```

```bash
REPOSITORY         TAG       IMAGE ID       CREATED          SIZE
web-server-image   latest    347d16ad1c69   12 seconds ago   142MB
```

Go to the next step.

### 2 - Make plan
Tell Terraform makes plan in our source.

```bash
terraform init
```

Logs
```bash
Initializing the backend...
Initializing provider plugins...
- Finding kreuzwerker/docker versions matching "~> 3.0.1"...
- Installing kreuzwerker/docker v3.0.2...
- Installed kreuzwerker/docker v3.0.2 (self-signed, key ID XXXXXXXXXXXXXXXX)
...
Terraform has been successfully initialized!
...
```

## 3 - Apply plan
Tell Terraform applys plan.

```bash
terraform apply
```

When you run this command, Terraform will output the plan and ask you "Do you want to perform these actions?". If you say "yes", Terraform will establish docker image, container and run nginx server.

Logs
```bash
docker_image.webserver-image: Creating...
docker_image.webserver-image: Creation complete after 0s [id=<id>]
docker_container.webserver: Creating...
docker_container.webserver: Creation complete after 1s [id=<id>]

Apply complete! Resources: 2 added, 0 changed, 0 destroyed.
```

## 4 - View result
View the result.

```bash
docker ps
```

You'll will see
```bash
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                  NAMES
ca3e207ae53c   a1b3d8623fd9   "docker-entrypoint.s…"   4 seconds ago   Up 4 seconds   0.0.0.0:3000->8000/tcp webserver
```

Or view in [http://localhost:3000](http://localhost:3000)

## Test
When you enter the browser, you will see the response like this
```json
{
  "data": "Welcome to my app",
  "error": null,
  "success": {
    "title": "OK"
  },
  "code": 200
}
```

Now you can test the application with following paths
```
GET - /users
GET - /users/:id
GET - /posts
GET - /posts/:id
GET - /albums
GET - /albums/:id
GET - /comments
GET - /comments/:id
GET - /photos
GET - /photos/:id
GET - /todos
GET - /todos/:id
```

You can use `limit` or `skip` query to skip or get an amount of data, for example
```
http://localhost:3000/users?limit=2&skip=5
```

You can get the result
```json
{
  "data": [
    {
      "id": 6,
      "name": "Mrs. Dennis Schulist",
      "username": "Leopoldo_Corkery",
      "email": "Karley_Dach@jasper.info",
      "address": {
        "street": "Norberto Crossing",
        "suite": "Apt. 950",
        "city": "South Christy",
        "zipcode": "23505-1337",
        "geo": {
          "lat": "-71.4197",
          "lng": "71.7478"
        }
      },
      "phone": "1-477-935-8478 x6430",
      "website": "ola.org",
      "company": {
        "name": "Considine-Lockman",
        "catchPhrase": "Synchronised bottom-line interface",
        "bs": "e-enable innovative applications"
      }
    },
      {
        "id": 7,
        "name": "Kurtis Weissnat",
        "username": "Elwyn.Skiles",
        "email": "Telly.Hoeger@billy.biz",
        "address": {
          "street": "Rex Trail",
          "suite": "Suite 280",
          "city": "Howemouth",
          "zipcode": "58804-1099",
          "geo": {
              "lat": "24.8918",
              "lng": "21.8984"
            }
          },
        "phone": "210.067.6132",
        "website": "elvis.io",
        "company": {
          "name": "Johns Group",
          "catchPhrase": "Configurable multimedia task-force",
          "bs": "generate enterprise e-tailers"
        }
      }
  ],
  "error": null,
  "success": {
    "title": "OK",
    "message": "Query users successfully"
  },
  "code": 200
}
```
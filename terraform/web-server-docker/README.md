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
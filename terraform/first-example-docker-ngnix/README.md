# First example with Docker and Ngnix
This is the first example of Terraform.

## About
In this example, we will deploy a NginX server in Docker with Terraform.

## Steps
### 1 - Make plan
First, you need to change your current work directory to this directory and tell Terraform makes plan in our source.

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

## 2 - Apply plan
Tell Terraform applys plan.

```bash
terraform apply
```

When you run this command, Terraform will output the plan and ask you "Do you want to perform these actions?". If you say "yes", Terraform will establish docker image, container and run nginx server.

Logs
```bash
docker_image.nginx: Creating...
docker_image.nginx: Still creating... [10s elapsed]
docker_image.nginx: Creation complete after 16s [id=<id>]
docker_container.nginx: Creating...
docker_container.nginx: Creation complete after 2s [id=<id>]

Apply complete! Resources: 2 added, 0 changed, 0 destroyed.
```

## 3 - View result
View the result.

```bash
docker ps
```

You'll will see
```bash
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                  NAMES
ef41ba6b5843   39286ab8a5e1   "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes   0.0.0.0:8000->80/tcp   first-example-docker-nginx
```

Or view in [http://localhost:8000](http://localhost:8000)
# Define prodiver
# We need to deploy Nginx on Docker,
# so we need to use Docker as Provider.
terraform {
  required_providers {
    docker = {
      # Source of the Provider
      source  = "kreuzwerker/docker"

      # Version of provider
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {}

# Configure the docker image
resource "docker_image" "nginx" {
  name         = "nginx"
  keep_locally = false
}

# Configure the docker container
resource "docker_container" "nginx" {
  # We have a docker image name nginx
  # and need its id
  image = docker_image.nginx.image_id

  # Name of docker container
  name  = "first-example-docker-nginx"

  # Deploy on port 80: in docker container
  # and expose in port 8000 for external accesses.
  ports {
    internal = 80
    external = 8000
  }
}
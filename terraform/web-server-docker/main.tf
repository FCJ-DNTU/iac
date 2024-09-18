# Define provider
# Use docker
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

# You should run the scripts/setup.sh
# to build the image
resource "docker_image" "webserver-image" {
  # The name of docker image that you give it
  # when run docker build command
  name = "web-server-image"
  keep_locally = false
}

# Run container
resource "docker_container" "webserver" {
  image = docker_image.webserver-image.image_id
  name = "webserver"

  ports {
    internal = 8000
    external = 3000
  }
}
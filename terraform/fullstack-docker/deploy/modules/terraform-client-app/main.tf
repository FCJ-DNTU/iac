resource "docker_image" "client-image" {
  # The name of docker image that you give it
  # when run docker build command
  name = var.image_name
  keep_locally = false
}

# Run container
resource "docker_container" "client" {
  image = docker_image.client-image.image_id
  name = var.container_name

  networks_advanced {
    name = var.network_name
  }

  ports {
    internal = 5173
    external = 5500
  }
}
resource "docker_image" "client_image" {
  # The name of docker image that you give it
  # when run docker build command
  name = var.image_name
  keep_locally = false
}

# Define network
resource "docker_network" "network" {
  name = var.network_name
}

# Run container
resource "docker_container" "client" {
  image = docker_image.client_image.image_id
  name = var.container_name

  networks_advanced {
    name = docker_network.network.name
  }

  ports {
    internal = 5173
    external = 5500
  }
}
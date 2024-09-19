resource "docker_image" "server-image" {
  # The name of docker image that you give it
  # when run docker build command
  name = var.image_name
  keep_locally = false
}

# Run container
resource "docker_container" "webserver" {
  image = docker_image.server-image.image_id
  name = var.container_name

  networks_advanced {
    name = var.network_name
  }

  env = [
    "MYSQL_CONTAINER=${var.database_container_name}",
    "MYSQL_USER=${var.database_user}",
    "MYSQL_USER_PASSWORD=${var.database_user_password}"
  ]

  ports {
    internal = 8000
    external = 3000
  }
}
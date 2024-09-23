resource "docker_image" "server_image" {
  # The name of docker image that you give it
  # when run docker build command
  name = var.image_name
  keep_locally = false
}

# Run container
resource "docker_container" "webserver" {
  image = docker_image.server_image.image_id
  name = var.container_name

  # Use variables are passed from var to link the dependencies
  depends_on = [ var.database_container_id, var.database_container_hostname ]

  networks_advanced {
    name = var.network_name
  }

  env = [
    "MYSQL_HOST=${var.database_container_name}",
    "MYSQL_USER=${var.database_user}",
    "MYSQL_USER_PASSWORD=${var.database_user_password}"
  ]

  ports {
    internal = 8000
    external = 8000
  }

  # Make sure MySQL Server in database container is running
  # By checking with netcat, it will check again after fail 5 seconds.
  entrypoint = [
    "/bin/sh", "-c",
    "until nc -z -v -w30 ${var.database_container_name} 3306; do echo 'Waiting for MySQL...'; sleep 5; done && npm start"
  ]
}
resource "docker_image" "database_image" {
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
resource "docker_container" "database" {
  image = docker_image.database_image.image_id
  name = var.container_name

  networks_advanced {
    name = var.network_name
  }

  env = [
    "MYSQL_ROOT_PASSWORD=${var.mysql_password}"
  ]

  healthcheck {
    test = ["CMD", "mysqladmin", "ping", "--silent"]
    interval = "10s"
    retries = 5
    start_period = "10s"
    timeout = "10m"
  }

  ports {
    internal = 3306
  }
}
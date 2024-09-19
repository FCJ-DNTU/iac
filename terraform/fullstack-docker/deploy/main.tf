module "client-app" {
  source = "./modules/terraform-client-app"

  providers = {
    docker = docker
  }

  image_name = "client-app-image"
  container_name = "client-app-container"
  network_name = "public-network"
}

module "server-app" {
  source = "./modules/terraform-server-app"

  providers = {
    docker = docker
  }

  image_name = "server-app-image"
  container_name = "server-app-container"
  network_name = "private-network"
  database_container_name = "server-database-container"
  database_user = "root"
  database_user_password = "test"

  depends_on = [ module.server-database, module.server-database.database_id ]
}

module "server-database" {
  source = "./modules/terraform-server-database"

  providers = {
    docker = docker
  }

  image_name = "server-database-image"
  container_name = "server-database-container"
  network_name = "private-network"
  mysql_password = "test"
}

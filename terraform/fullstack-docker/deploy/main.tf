module "client" {
  source = "./modules/terraform-client-app"

  image_name = "client-app-image"
  container_name = "client-app-container"
  network_name = "public-network"
}

module "database" {
  source = "./modules/terraform-server-database"

  image_name = "server-database-image"
  container_name = "server-database-container"
  network_name = "private-network"
  mysql_password = "test"
}

module "server" {
  source = "./modules/terraform-server-app"

  image_name = "server-app-image"
  container_name = "server-app-container"
  network_name = "private-network"
  database_container_name = "server-database-container"
  database_user = "root"
  database_user_password = "test"

  # Make a explicit dependence on database
  database_container_hostname = module.database.endpoint
  database_container_id = module.database.container_id

  depends_on = [ module.database ]
}
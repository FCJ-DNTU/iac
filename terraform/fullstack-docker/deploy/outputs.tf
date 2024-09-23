output "client_container_id" {
  description = "Id of client container"
  value = module.client.container_id
}

output "client_endpoint" {
  description = "Endpoint of client container"
  value = module.client.endpoint
}

output "client_container_external_port" {
  description = "External port of client container"
  value = module.client.container_external_port
}

output "server_container_id" {
  description = "Id of server container"
  value = module.server.container_id
}

output "server_endpoint" {
  description = "Endpoint of server container"
  value = module.server.endpoint
}

output "server_container_external_port" {
  description = "External port of server container"
  value = module.server.container_external_port
}

output "database_container_id" {
  description = "Id of database container"
  value = module.database.container_id
}

output "database_endpoint" {
  description = "Endpoint of database container"
  value = module.database.endpoint
}

output "database_container_external_port" {
  description = "External port of database container"
  value = module.database.container_external_port
}
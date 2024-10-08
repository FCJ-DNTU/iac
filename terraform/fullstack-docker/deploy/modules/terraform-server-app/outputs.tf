output "container_id" {
  description = "Id of container"
  value = docker_container.webserver.id
}

output "endpoint" {
  description = "Endpoint of container"
  value = docker_container.webserver.hostname
}

output "container_external_port" {
  description = "External port of container"
  value = docker_container.webserver.ports
}
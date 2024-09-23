output "container_id" {
  description = "Id of container"
  value = docker_container.client.id
}

output "endpoint" {
  description = "Endpoint of container"
  value = docker_container.client.hostname
}

output "container_external_port" {
  description = "External port of container"
  value = docker_container.client.ports
}
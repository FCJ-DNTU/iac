variable "image_name" {
  description = "Name of docker image of server"
  type = string
}

variable "container_name" {
  description = "Name of docker container of server"
  type = string
}

variable "network_name" {
  description = "Name of network of docker container"
  type = string
}
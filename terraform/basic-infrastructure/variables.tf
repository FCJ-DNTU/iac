variable "region" {
  type        = string
  description = "A region where resources are deployed"
}

variable "profile" {
  type    = string
}

variable "vpc_name" {
  type    = string
}

variable "vpc_cidr" {
  type    = string
}

variable "private_subnets" {
  type = map(any)
}

variable "public_subnets" {
  type = map(any)
}
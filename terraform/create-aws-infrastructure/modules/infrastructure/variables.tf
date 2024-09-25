variable "cidr" {
  type = string
  description = "CIDR block of VPC"
}

variable "cidr_private_subnet" {
  type = string
  description = "CIDR block of Private subnet"
}

variable "cidr_public_subnet" {
  type = string
  description = "CIDR block of Public subnet"
}

variable "region" {
  type = string
  description = "Region of VPC"
}

variable "is_public" {
  type = bool
  description = "Is this VPC public?"
}

variable "author" {
  type = string
  description = "The owner of resources"
}
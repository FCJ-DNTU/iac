variable "ami_id" {
  type = string
  description = "AMI Id of Image"
  # Default is Amazon Linux 2023
  default = "ami-0aa097a5c0d31430a"
}

variable "name" {
  type = string
  description = "Name of instance"
}

variable "instance_type" {
  type = string
  description = "Instance type of EC2 Node"
  default = "t2.micro"
}

variable "subnet_id" {
  type = string
  description = "Id of subnet"
}

variable "is_public" {
  type = bool
  description = "Can instance be accessed via internet?"
  default = false
}

variable "security_groups_ids" {
  type = set(string)
  description = "Security Groups of Instance"
  default = []
}

variable "key_pair_name" {
  type = string
  description = "Key pair for private access"
}

variable "author" {
  type = string
  description = "The owner of resources"
}
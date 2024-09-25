# This file is used to define security for network

# Define SG
resource "aws_security_group" "public_terra_sg" {
  # Id of VPC
  vpc_id = var.vpc_id
  name = "public_terra_sg"
  description = "Allow public access and only SSH from a specific IP"
  tags = {
    Name = "public_terra_sg"
    Type = "Security_Group"
    Author = var.author
  }
}

# Define ingress of `public_terra_sg`
resource "aws_vpc_security_group_ingress_rule" "public_terra_sg_inbound" {
  security_group_id = aws_security_group.public_terra_sg.id
  cidr_ipv4 = "0.0.0.0/0"
  ip_protocol = "-1"
}

# Define SG
resource "aws_security_group" "private_terra_sg" {
  # Id of VPC
  vpc_id = var.vpc_id
  name = "private_terra_sg"
  description = "Allow private access"
  tags = {
    Name = "private_terra_sg"
    Type = "Security_Group"
    Author = var.author
  }
}

# Define ingress of `private_terra_sg`
resource "aws_vpc_security_group_ingress_rule" "private_terra_sg_inbound" {
  security_group_id = aws_security_group.private_terra_sg.id
  cidr_ipv4 = var.vpc_cidr
  ip_protocol = "-1"
}
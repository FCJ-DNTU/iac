resource "aws_vpc" "terranet" {
  # Define CIDR Block for VPC
  cidr_block = var.cidr
  # DNS Features
  enable_dns_hostnames = var.is_public
  enable_dns_support = var.is_public
  tags = {
    Name = "terranet"
    Type = "VPC"
    Author = var.author
  }
}

# Define a private subnet
resource "aws_subnet" "private_sub_terranet" {
  vpc_id = aws_vpc.terranet.id
  # CIDR Block of Subnet
  cidr_block = var.cidr_private_subnet
  # AZ
  availability_zone = "${var.region}a"
  tags = {
    Name = "private_sub_terranet"
    Type = "Subnet"
    Author = var.author
  }
}

# Define a public subnet
resource "aws_subnet" "public_sub_terranet" {
  vpc_id = aws_vpc.terranet.id
  # CIDR Block of Subnet
  cidr_block = var.cidr_public_subnet
  # AZ
  availability_zone = "${var.region}b"
  # Assign public ipv4
  map_public_ip_on_launch = true
  tags = {
    Name = "public_sub_terranet"
    Type = "Subnet"
    Author = var.author
  }
}

# Define an internet gateway
resource "aws_internet_gateway" "igw" {
  # Attach to VPC
  vpc_id = aws_vpc.terranet.id
  tags = {
    Name = "terra_igw"
    Type = "Internet_Gateway"
    Author = var.author
  }
}

# Define public route table
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.terranet.id

  # Define routes
  route {
    cidr_block = aws_vpc.terranet.cidr_block
    gateway_id = "local"
  }

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "public_terrnet_rtb"
    Type = "Route_Table"
    Author = var.author
  }
}

# Define private route table
resource "aws_route_table" "private_route_table" {
  vpc_id = aws_vpc.terranet.id

  # Define routes
  route {
    cidr_block = aws_vpc.terranet.cidr_block
    gateway_id = "local"
  }

  tags = {
    Name = "private_terrnet_rtb"
    Type = "Route_Table"
    Author = var.author
  }
}

resource "aws_route_table_association" "public_assiciation" {
  route_table_id = aws_route_table.public_route_table.id

  # Associate to public subnet
  subnet_id = aws_subnet.public_sub_terranet.id
}

resource "aws_route_table_association" "private_assiciation" {
  route_table_id = aws_route_table.private_route_table.id
  # Associate to private subnet
  subnet_id = aws_subnet.private_sub_terranet.id
}
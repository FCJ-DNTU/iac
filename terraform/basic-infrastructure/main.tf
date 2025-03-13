provider "aws" {
  region  = var.region
  profile = var.profile
}

# Lấy các list AZs đang có sẵn trong Region hiện tại.
data "aws_availability_zones" "available" {}
data "aws_region" "current" {}

# Define VPC
resource "aws_vpc" "vpc" {
  cidr_block = var.vpc_cidr

  tags = {
    Name        = var.vpc_name
    Environment = "demo-${terraform.workspace}"
    Terraform   = "true"
  }
}

# Tạo các Private Subnets
resource "aws_subnet" "private_subnets" {
  # Mình sẽ lặp một list key-value này để tạo ra các
  # subnet phù hợp.
  for_each = var.private_subnets
  vpc_id   = aws_vpc.vpc.id
  # Tạo CIDR Block dựa trên VPC CIDR.
  # Hàm cidrsubnet nhận 3 tham số
  #   - prefix: là các bit reserve. Tối thiểu là 16 bits được giữ lại.
  #   - newbits: là các bit reserve được thêm vào, ví dụ nêu thêm 4 thì subnet mask sẽ là /20.
  #   - netnum: hiểu đại khái là số bắt đầu của một subnet, và nó không lớn hơn netbits.
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, each.value)
  availability_zone = tolist(data.aws_availability_zones.available.names)[each.value - 1]

  tags = {
    # Tạo name của Subnet theo từng TF Instance của Subnet.
    Name      = each.key
    Environment = "demo-${terraform.workspace}"
    Terraform = "true"
  }
}

# Tạo các Public Subnets
resource "aws_subnet" "public_subnets" {
  for_each = var.public_subnets
  vpc_id   = aws_vpc.vpc.id
  # Tạo CIDR Block dựa trên VPC CIDR.
  # Bao gồm N IPs.
  cidr_block              = cidrsubnet(var.vpc_cidr, 8, each.value + 100)
  availability_zone       = tolist(data.aws_availability_zones.available.names)[each.value - 1]
  map_public_ip_on_launch = true

  tags = {
    Name      = each.key
    Environment = "demo-${terraform.workspace}"
    Terraform = "true"
  }
}

# Create route tables for public and private subnets
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.internet_gateway.id
    # nat_gateway_id = aws_nat_gateway.nat_gateway.id
  }
  tags = {
    Name      = "demo_public_rtb"
    Environment = "demo-${terraform.workspace}"
    Terraform = "true"
  }
}

resource "aws_route_table" "private_route_table" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    # gateway_id     = aws_internet_gateway.internet_gateway.id
    nat_gateway_id = aws_nat_gateway.nat_gateway.id
  }
  tags = {
    Name      = "demo_private_rtb"
    Environment = "demo-${terraform.workspace}"
    Terraform = "true"
  }
}

# Tạo các liên kết cho route table
resource "aws_route_table_association" "public" {
  depends_on     = [aws_subnet.public_subnets]
  route_table_id = aws_route_table.public_route_table.id
  for_each       = aws_subnet.public_subnets
  subnet_id      = each.value.id
}

resource "aws_route_table_association" "private" {
  depends_on     = [aws_subnet.private_subnets]
  route_table_id = aws_route_table.private_route_table.id
  for_each       = aws_subnet.private_subnets
  subnet_id      = each.value.id
}

# Tạo Internet Gateway
resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = aws_vpc.vpc.id
  tags = {
    Name = "demo_igw"
    Environment = "demo-${terraform.workspace}"
    Terraform = "true"
  }
}

# Tạo EIP cho NAT Gateway
resource "aws_eip" "nat_gateway_eip" {
  domain     = "vpc"
  depends_on = [aws_internet_gateway.internet_gateway]
  tags = {
    Name = "demo_igw_eip"
    Environment = "demo-${terraform.workspace}"
    Terraform = "true"
  }
}

# Tạo NAT Gateway
resource "aws_nat_gateway" "nat_gateway" {
  depends_on    = [aws_subnet.public_subnets]
  allocation_id = aws_eip.nat_gateway_eip.id
  subnet_id     = aws_subnet.public_subnets["public_subnet_1"].id
  tags = {
    Name = "demo_nat_gateway"
    Environment = "demo-${terraform.workspace}"
    Terraform = "true"
  }
}
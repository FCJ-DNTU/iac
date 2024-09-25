resource "aws_instance" "terra_ec2" {
  # Use Ubuntu Server 24.04 LTS (HVM), SSD
  ami = var.ami_id
  # Use t2.micro
  instance_type = var.instance_type
  # Assign a public IPv4 Address
  associate_public_ip_address = var.is_public
  # Key
  key_name = var.key_pair_name
  # Associate security groups
  security_groups = var.security_groups_ids
  # Subnet
  subnet_id = var.subnet_id

  tags = {
    Name = var.name
    Type = "EC2_Instance"
    Author = var.author
  }
}
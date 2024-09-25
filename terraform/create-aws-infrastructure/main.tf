# Define local variables
locals {
  region = "ap-southeast-1"
  author = "TunaNguyen"
  vpc_cidr = "192.168.1.0/24"
}

provider "aws" {
  region = local.region
}

module "infrastructure" {
  source = "./modules/infrastructure"

  # Input
  cidr = local.vpc_cidr
  cidr_public_subnet = "192.168.1.0/25"
  cidr_private_subnet = "192.168.1.128/25"
  region = local.region
  is_public = true
  author = local.author
}

module "security" {
  source = "./modules/security"
  depends_on = [ module.infrastructure ]

  # Input
  vpc_cidr = local.vpc_cidr
  vpc_id = module.infrastructure.vpc_id
  author = local.author
}

module "public_ec2" {
  source = "./modules/ec2"

  # Depend on security module
  depends_on = [ module.security ]

  # Input
  name = "terra_public_ec2"
  subnet_id = module.infrastructure.public_subnet_id
  security_groups_ids = [
    module.security.public_sg_id
  ]
  is_public = true
  key_pair_name = "aptopus-ai"
  author = local.author
}

module "private_ec2" {
  source = "./modules/ec2"

  # Depend on security module
  depends_on = [ module.security ]

  # Input
  name = "terra_private_ec2"
  subnet_id = module.infrastructure.private_subnet_id
  security_groups_ids = [
    module.security.private_sg_id
  ]
  key_pair_name = "aptopus-ai"
  author = local.author
}
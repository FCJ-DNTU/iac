region   = "ap-southeast-1"
vpc_name = "basic-demo-vpc"
vpc_cidr = "10.0.0.0/16"
profile  = "dev"
private_subnets = {
  "private_subnet_1" = 1
  "private_subnet_2" = 2
  "private_subnet_3" = 3
}
public_subnets = {
  "public_subnet_1" = 1
  "public_subnet_2" = 2
  "public_subnet_3" = 3
}
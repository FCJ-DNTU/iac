output "vpc_id" {
  description = "ID of VPC"
  value = aws_vpc.terranet.id
}

output "vpc_arn" {
  description = "ARN of VPC"
  value = aws_vpc.terranet.arn
}

output "public_subnet_id" {
  description = "ID of public subnet"
  value = aws_subnet.public_sub_terranet.id
}

output "public_subnet_arn" {
  description = "ARN of public subnet"
  value = aws_subnet.public_sub_terranet.arn
}

output "private_subnet_id" {
  description = "ID of private subnet"
  value = aws_subnet.private_sub_terranet.id
}

output "private_subnet_arn" {
  description = "ARN of private subnet"
  value = aws_subnet.private_sub_terranet.arn
}
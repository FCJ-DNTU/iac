output "public_sg_id" {
  description = "Id of SG"
  value = aws_security_group.public_terra_sg.id
}

output "public_sg_arn" {
  description = "ARN of SG"
  value = aws_security_group.public_terra_sg.arn
}

output "public_sg_name" {
  description = "Name of SG"
  value = aws_security_group.public_terra_sg.name
}

output "private_sg_id" {
  description = "Id of SG"
  value = aws_security_group.private_terra_sg.id
}

output "private_sg_arn" {
  description = "ARN of SG"
  value = aws_security_group.private_terra_sg.arn
}

output "private_sg_name" {
  description = "Name of SG"
  value = aws_security_group.public_terra_sg.name
}
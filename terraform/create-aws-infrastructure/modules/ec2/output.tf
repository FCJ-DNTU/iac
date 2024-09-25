output "id" {
  value = aws_instance.terra_ec2.id
}

output "arn" {
  value = aws_instance.terra_ec2.arn
}

output "public_dns" {
  value = aws_instance.terra_ec2.public_dns
}

output "public_ip" {
  value = aws_instance.terra_ec2.public_ip
}

output "private_ip" {
  value = aws_instance.terra_ec2.private_ip
}
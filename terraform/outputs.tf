output "ec2_public_ip" {
  value = aws_instance.juice_ec2.public_ip
}

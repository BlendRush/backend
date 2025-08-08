provider "aws" {
  region = "us-east-1"
}

resource "aws_key_pair" "deployer" {
  key_name   = "juice-ec2-key"
  public_key = file("${path.module}/juice_ec2_key.pub")
}

resource "aws_security_group" "juice_sg" {
  name        = "juice_sg"
  description = "Allow SSH, HTTP, custom app ports"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "juice_ec2" {
  ami                    = "ami-0ac80df6eff0e70b5"
  instance_type          = "t2.micro"
  key_name               = aws_key_pair.deployer.key_name
  vpc_security_group_ids = [aws_security_group.juice_sg.id]

  tags = {
    Name = "juice-bar-instance"
  }
}

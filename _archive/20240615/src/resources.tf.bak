provider "aws" {
}


terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }

  }

  required_version = ">= 1.0"
}

resource "aws_iam_access_key" "akia47crzov4ob22iiqn" {
  status = "Active"
  user   = aws_iam_user.tf_user.id
}

resource "aws_iam_role" "awsserviceroleforsupport" {
  assume_role_policy = "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"support.amazonaws.com\"},\"Action\":\"sts:AssumeRole\"}]}"
  description        = "Enables resource access for AWS to provide billing, administrative and support services"
  inline_policy {
  }

  managed_policy_arns  = ["arn:aws:iam::aws:policy/aws-service-role/AWSSupportServiceRolePolicy"]
  max_session_duration = 3600
  name                 = "AWSServiceRoleForSupport"
  path                 = "/aws-service-role/support.amazonaws.com/"
}

resource "aws_iam_role" "awsservicerolefortrustedadvisor" {
  assume_role_policy = "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"trustedadvisor.amazonaws.com\"},\"Action\":\"sts:AssumeRole\"}]}"
  description        = "Access for the AWS Trusted Advisor Service to help reduce cost, increase performance, and improve security of your AWS environment."
  inline_policy {
  }

  managed_policy_arns  = ["arn:aws:iam::aws:policy/aws-service-role/AWSTrustedAdvisorServiceRolePolicy"]
  max_session_duration = 3600
  name                 = "AWSServiceRoleForTrustedAdvisor"
  path                 = "/aws-service-role/trustedadvisor.amazonaws.com/"
}

resource "aws_iam_role_policy_attachment" "awsserviceroleforsupport_arn_aws_iam__aws_policy_aws_service_role_awssupportservicerolepolicy" {
  policy_arn = "arn:aws:iam::aws:policy/aws-service-role/AWSSupportServiceRolePolicy"
  role       = aws_iam_role.awsserviceroleforsupport.id
}

resource "aws_iam_role_policy_attachment" "awsservicerolefortrustedadvisor_arn_aws_iam__aws_policy_aws_service_role_awstrustedadvisorservicerolepolicy" {
  policy_arn = "arn:aws:iam::aws:policy/aws-service-role/AWSTrustedAdvisorServiceRolePolicy"
  role       = aws_iam_role.awsservicerolefortrustedadvisor.id
}

resource "aws_iam_user" "flackey_admin" {
  name = "flackey_admin"
  path = "/"
}

resource "aws_iam_user" "tf_user" {
  name = "tf_user"
  path = "/"
}

resource "aws_iam_user_policy_attachment" "flackey_admin_arn_aws_iam__aws_policy_administratoraccess" {
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
  user       = aws_iam_user.flackey_admin.name
}

resource "aws_iam_user_policy_attachment" "flackey_admin_arn_aws_iam__aws_policy_iamuserchangepassword" {
  policy_arn = "arn:aws:iam::aws:policy/IAMUserChangePassword"
  user       = aws_iam_user.flackey_admin.name
}

resource "aws_iam_user_policy_attachment" "tf_user_arn_aws_iam__aws_policy_administratoraccess" {
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
  user       = aws_iam_user.tf_user.name
}

resource "aws_internet_gateway" "igw_09a9ebbab5713c545" {
  vpc_id = aws_vpc.vpc_0eae3e3dde1b92567.id
}

resource "aws_route_table" "rtb_0665545cbc2874491" {
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw_09a9ebbab5713c545.id
  }

  vpc_id = aws_vpc.vpc_0eae3e3dde1b92567.id
}

resource "aws_security_group" "sg_0afe7c1446fcc470a" {
  description = "default VPC security group"
  egress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 0
    protocol    = "-1"
    to_port     = 0
  }

  ingress {
    from_port = 0
    protocol  = "-1"
    self      = true
    to_port   = 0
  }

  name   = "default"
  vpc_id = aws_vpc.vpc_0eae3e3dde1b92567.id
}

resource "aws_subnet" "subnet_05c3d9e8466ca604b" {
  availability_zone                   = "us-east-1d"
  cidr_block                          = "172.31.80.0/20"
  map_public_ip_on_launch             = true
  private_dns_hostname_type_on_launch = "ip-name"
  vpc_id                              = aws_vpc.vpc_0eae3e3dde1b92567.id
}

resource "aws_subnet" "subnet_09cc81b3a55da338e" {
  availability_zone                   = "us-east-1a"
  cidr_block                          = "172.31.16.0/20"
  map_public_ip_on_launch             = true
  private_dns_hostname_type_on_launch = "ip-name"
  vpc_id                              = aws_vpc.vpc_0eae3e3dde1b92567.id
}

resource "aws_subnet" "subnet_0a5f1124c803cdd79" {
  availability_zone_id                = "use1-az6"
  cidr_block                          = "172.31.32.0/20"
  map_public_ip_on_launch             = true
  private_dns_hostname_type_on_launch = "ip-name"
  vpc_id                              = aws_vpc.vpc_0eae3e3dde1b92567.id
}

resource "aws_subnet" "subnet_0a6dcbb934f38f29e" {
  availability_zone                   = "us-east-1e"
  cidr_block                          = "172.31.48.0/20"
  map_public_ip_on_launch             = true
  private_dns_hostname_type_on_launch = "ip-name"
  vpc_id                              = aws_vpc.vpc_0eae3e3dde1b92567.id
}

resource "aws_subnet" "subnet_0d8877a4c4998aad1" {
  availability_zone                   = "us-east-1f"
  cidr_block                          = "172.31.64.0/20"
  map_public_ip_on_launch             = true
  private_dns_hostname_type_on_launch = "ip-name"
  vpc_id                              = aws_vpc.vpc_0eae3e3dde1b92567.id
}

resource "aws_subnet" "subnet_0dc20f7133e0742fd" {
  availability_zone_id                = "use1-az1"
  cidr_block                          = "172.31.0.0/20"
  map_public_ip_on_launch             = true
  private_dns_hostname_type_on_launch = "ip-name"
  vpc_id                              = aws_vpc.vpc_0eae3e3dde1b92567.id
}

resource "aws_vpc" "vpc_0eae3e3dde1b92567" {
  cidr_block           = "172.31.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  instance_tenancy     = "default"
}

resource "aws_route53_resolver_rule_association" "rslvr_autodefined_assoc_vpc_0eae3e3dde1b92567_internet_resolver" {
  name             = "System Rule Association"
  resolver_rule_id = "rslvr-autodefined-rr-internet-resolver"
  vpc_id           = aws_vpc.vpc_0eae3e3dde1b92567.id
}


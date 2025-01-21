provider "aws" {
  region = "us-east-1"  # Adjust to your preferred region
}

terraform {
  backend "s3" {
    bucket         = "awsjameslo-terraform-state-bucket"  # S3 bucket for storing state
    key            = "terraform.tfstate"       # Path to store state in the bucket
    region         = "us-east-1"               # Your AWS region
    dynamodb_table = "terraform-lock-table"    # DynamoDB table for state locking
    encrypt        = true                      # Enable encryption for the state file
  }
}

# S3 Bucket for storing Terraform state
resource "aws_s3_bucket" "tf_state" {
  bucket = "awsjameslo-terraform-state-bucket"
}

# Set the ACL for the S3 bucket
resource "aws_s3_bucket_acl" "tf_state_acl" {
  bucket = aws_s3_bucket.tf_state.bucket
  acl    = "private"
}

# DynamoDB Table for state locking
resource "aws_dynamodb_table" "tf_lock" {
  name           = "terraform-lock-table"
  hash_key       = "LockID"
  billing_mode   = "PAY_PER_REQUEST"
  attribute {
    name = "LockID"
    type = "S"
  }
}
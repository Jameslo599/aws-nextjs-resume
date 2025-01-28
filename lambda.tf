# Create the Lambda function
variable "getCounter_zip" {
      type = string
      description = "..."
}
resource "aws_lambda_function" "terraGetCounter" {
  function_name = "terraGetCounter"
  runtime       = "python3.9"
  handler       = "terraGetCounter.lambda_handler"
  role          = "arn:aws:iam::503561410637:role/lambda-dynamodb"
  filename      = "${var.getCounter_zip}"

  s3_bucket     = aws_s3_bucket.lambda_deployment.bucket
  s3_key        = aws_s3_object.lambda_get_counter.key

  # Reference the code signing configuration
  signing_config {
    signing_profile_version_arn = aws_lambda_code_signing_config.lambda_csc.arn
  }
}

variable "checkUnique_zip" {
      type = string
      description = "..."
}
resource "aws_lambda_function" "terraCheckUnique" {
  function_name = "terraCheckUnique"
  runtime       = "python3.9"
  handler       = "terraCheckUnique.lambda_handler"
  role          = "arn:aws:iam::503561410637:role/lambda-dynamodb"
  filename      = "${var.checkUnique_zip}"

  s3_bucket     = aws_s3_bucket.lambda_deployment.bucket
  s3_key        = aws_s3_object.lambda_check_unique.key

  # Reference the code signing configuration
  signing_config {
    signing_profile_version_arn = aws_lambda_code_signing_config.lambda_csc.arn
  }
}

variable "increment_zip" {
      type = string
      description = "..."
}
resource "aws_lambda_function" "terraIncrementCounter" {
  function_name = "terraIncrementCounter"
  runtime       = "python3.9"
  handler       = "terraIncrementCounter.lambda_handler"
  role          = "arn:aws:iam::503561410637:role/lambda-dynamodb"
  filename      = "${var.increment_zip}"

  s3_bucket     = aws_s3_bucket.lambda_deployment.bucket
  s3_key        = aws_s3_object.lambda_increment_counter.key

  # Reference the code signing configuration
  signing_config {
    signing_profile_version_arn = aws_lambda_code_signing_config.lambda_csc.arn
  }
}

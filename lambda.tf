# Create the Lambda function
resource "aws_lambda_function" "terraGetCounter" {
  function_name = "terraGetCounter"
  runtime       = "python3.9"
  handler       = "terraGetCounter.lambda_handler"
  role          = "arn:aws:iam::503561410637:role/lambda-dynamodb"
  filename      = "terraGetCounter.zip"
}

resource "aws_lambda_function" "terraCheckUnique" {
  function_name = "terraCheckUnique"
  runtime       = "python3.9"
  handler       = "terraCheckUnique.lambda_handler"
  role          = "arn:aws:iam::503561410637:role/lambda-dynamodb"
  filename      = "terraCheckUnique.zip"
}

resource "aws_lambda_function" "terraIncrementCounter" {
  function_name = "terraIncrementCounter"
  runtime       = "python3.9"
  handler       = "terraIncrementCounter.lambda_handler"
  role          = "arn:aws:iam::503561410637:role/lambda-dynamodb"
  filename      = "terraIncrementCounter.zip"
}
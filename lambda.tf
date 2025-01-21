# Create the Lambda function
resource "aws_lambda_function" "terraGetCounter" {
  function_name = "terraGetCounter"
  runtime       = "python3.9"
  handler       = "terraGetCounter.lambda_handler"
  role          = "arn:aws:iam::503561410637:role/lambda-dynamodb"
  filename      = "./lambda/terraGetCounter.zip"
}
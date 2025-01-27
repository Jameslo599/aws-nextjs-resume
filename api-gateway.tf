# API Gateway
resource "aws_api_gateway_rest_api" "api_gateway" {
  name        = "resume_gateway"
  description = "Cloud resume API gateway created with Terraform"

  endpoint_configuration {
    types = ["REGIONAL"]  # Change from EDGE to REGIONAL
  }
}

# OPTIONS method for all methods
module "getCounter_options" {
  source       = "./modules/options"
  rest_api_id  = aws_api_gateway_rest_api.api_gateway.id
  resource_id  = aws_api_gateway_resource.getCounter.id
}

module "incrementCounter_options" {
  source       = "./modules/options"
  rest_api_id  = aws_api_gateway_rest_api.api_gateway.id
  resource_id  = aws_api_gateway_resource.incrementCounter.id
}

module "checkUnique_options" {
  source       = "./modules/options"
  rest_api_id  = aws_api_gateway_rest_api.api_gateway.id
  resource_id  = aws_api_gateway_resource.checkUnique.id
}

# Add a new resource for /getCounter
resource "aws_api_gateway_resource" "getCounter" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  parent_id   = aws_api_gateway_rest_api.api_gateway.root_resource_id
  path_part   = "getCounter" # The endpoint path
}

# Add a GET method for /getCounter
resource "aws_api_gateway_method" "getCounter_get_method" {
  rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
  resource_id   = aws_api_gateway_resource.getCounter.id
  http_method   = "GET"
  authorization = "NONE"

  request_parameters = {
        "method.request.querystring.website_name" = true
        "method.request.querystring.website_id" = true
  }
}

# Integrate /getCounter GET with the Lambda function
resource "aws_api_gateway_integration" "getCounter_lambda_proxy" {
  rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
  resource_id             = aws_api_gateway_resource.getCounter.id
  http_method             = aws_api_gateway_method.getCounter_get_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:503561410637:function:terraGetCounter/invocations"

  request_parameters = {
        "integration.request.querystring.website_name" = "method.request.querystring.website_name"
        "integration.request.querystring.website_id" = "method.request.querystring.website_id"
  }

  passthrough_behavior = "WHEN_NO_MATCH"
}

# Permission for API Gateway to invoke the getCounter Lambda
resource "aws_lambda_permission" "getCounter_api_gateway_invoke" {
  statement_id  = "AllowGetCounterInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.terraGetCounter.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:us-east-1:503561410637:5khlor5cgb/*/*/getCounter"
}

# Add a new resource for /incrementCounter
resource "aws_api_gateway_resource" "incrementCounter" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  parent_id   = aws_api_gateway_rest_api.api_gateway.root_resource_id
  path_part   = "incrementCounter" # The endpoint path
}

# Add a PUT method for /incrementCounter
resource "aws_api_gateway_method" "incrementCounter_put_method" {
  rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
  resource_id   = aws_api_gateway_resource.incrementCounter.id
  http_method   = "PUT"
  authorization = "NONE"
}

# Integrate /incrementCounter PUT with the Lambda function
resource "aws_api_gateway_integration" "incrementCounter_lambda_proxy" {
  rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
  resource_id             = aws_api_gateway_resource.incrementCounter.id
  http_method             = aws_api_gateway_method.incrementCounter_put_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:503561410637:function:terraIncrementCounter/invocations"
}

# Permission for API Gateway to invoke the incrementCounter Lambda
resource "aws_lambda_permission" "incrementCounter_api_gateway_invoke" {
  statement_id  = "AllowIncrementCounterInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.terraIncrementCounter.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:us-east-1:503561410637:5khlor5cgb/*/*/incrementCounter"
}

# Add a new resource for /checkUnique
resource "aws_api_gateway_resource" "checkUnique" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  parent_id   = aws_api_gateway_rest_api.api_gateway.root_resource_id
  path_part   = "checkUnique" # The endpoint path
}

# Add a POST method for /checkUnique
resource "aws_api_gateway_method" "checkUnique_post_method" {
  rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
  resource_id   = aws_api_gateway_resource.checkUnique.id
  http_method   = "POST"
  authorization = "NONE"
}

# Integrate /checkUnique POST with the Lambda function
resource "aws_api_gateway_integration" "checkUnique_lambda_proxy" {
  rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
  resource_id             = aws_api_gateway_resource.checkUnique.id
  http_method             = aws_api_gateway_method.checkUnique_post_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:503561410637:function:terraCheckUnique/invocations"
}

# Permission for API Gateway to invoke the checkUnique Lambda
resource "aws_lambda_permission" "checkUnique_api_gateway_invoke" {
  statement_id  = "AllowCheckUniqueInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.terraCheckUnique.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:us-east-1:503561410637:5khlor5cgb/*/*/checkUnique"
}

# Deployment
resource "aws_api_gateway_deployment" "prod_deploy" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id

  depends_on = [
    aws_api_gateway_method.checkUnique_post_method,
    aws_api_gateway_method.getCounter_get_method,
    aws_api_gateway_method.incrementCounter_put_method
  ]

  lifecycle {
    create_before_destroy = true
  }
}

# Stage name
resource "aws_api_gateway_stage" "stage_prod" {
  deployment_id = aws_api_gateway_deployment.prod_deploy.id
  rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
  stage_name    = "stage_prod"
}
# OPTIONS Method for Preflight Requests

variable "rest_api_id" {}
variable "resource_id" {}

resource "aws_api_gateway_method" "options_method" {
  rest_api_id  = var.rest_api_id
  resource_id  = var.resource_id
  http_method  = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_method_response" "options_method_response" {
  rest_api_id = var.rest_api_id
  resource_id = var.resource_id
  http_method = aws_api_gateway_method.options_method.http_method
  status_code = "200"
  response_models = {
    "application/json" = "Empty"
  }
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

# OPTIONS integration.
resource "aws_api_gateway_integration" "options_integration" {
  rest_api_id  = var.rest_api_id
  resource_id  = var.resource_id
  http_method  = "OPTIONS"
  type = "MOCK"
  passthrough_behavior = "WHEN_NO_MATCH"
  request_templates = {
    "application/json" : "{\"statusCode\": 200}"
  }
}

resource "aws_api_gateway_integration_response" "options_integration_response" {
  rest_api_id = var.rest_api_id
  resource_id = var.resource_id
  http_method = aws_api_gateway_method.options_method.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    "method.response.header.Access-Control-Allow-Methods" = "'GET,POST,PUT,DELETE,OPTIONS'",
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
}


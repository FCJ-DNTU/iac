provider "aws" {
  region  = var.region
  profile = var.profile
}

locals {
  lambda_function_name = "example_function"
}

# Set up lambda function file
data "archive_file" "example_function_file" {
  type        = "zip"
  source_file = "./handler/example.js"
  output_path = "${local.lambda_function_name}.zip"
}

# Set up IAM Policy document
data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

# Set up IAM Role for Lambda
resource "aws_iam_role" "iam_for_lambda" {
  name               = "iam_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

# Set up lambda function
resource "aws_lambda_function" "example_function" {
  filename      = "${local.lambda_function_name}.zip"
  function_name = local.lambda_function_name
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "example.handler"

  source_code_hash = data.archive_file.example_function_file.output_base64sha256

  runtime = "nodejs22.x"
}

# Set up API Gateway
resource "aws_apigatewayv2_api" "example_api" {
  name          = "example_api"
  protocol_type = "HTTP"

  # Setup CORS
  cors_configuration {
    allow_origins = ["*"]
  }
}

resource "aws_apigatewayv2_integration" "integration" {
  api_id           = aws_apigatewayv2_api.example_api.id
  integration_type = "AWS_PROXY"

  integration_uri = aws_lambda_function.example_function.invoke_arn
  connection_type    = "INTERNET"
  description        = "Invole example function"
}

resource "aws_apigatewayv2_route" "route" {
  api_id = aws_apigatewayv2_api.example_api.id
  route_key = "GET /example"
  target = "integrations/${aws_apigatewayv2_integration.integration.id}"
}
 
# Deploy API Gateway
resource "aws_apigatewayv2_stage" "test" {
  api_id      = aws_apigatewayv2_api.example_api.id
  name        = "test"
  auto_deploy = true
}

# Allow invocation
resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.example_function.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.example_api.execution_arn}/*/*"
}
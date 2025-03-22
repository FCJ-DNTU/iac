# Deploy an API Gateway with Lambda Function

## About

In this lab, we will deploy an API Gateway with lambda function integration. And there are some concepts that we will learn:

- Variable and import variables with `.tfvars` file.
- Loop in configurations.
- Use AWS CLI Profile instead of environment variables.

## Steps

### 0 - Prepare (\*\*\*)

Before we go further, you should configure a aws cli profile.

```bash
aws configure --profile `<name-of-profile>`
```

Enter your credential and go to next step.

### 1 - Init

Init all of providers are used in this configuration.

```bash
terraform init
```

### 2 - Verify configuration with Plan

Before we apply the configuration to deploy our resources, we had verify our configuration.

```bash
terraform validate
terraform plan --var-file=default.tfvars -out "plan-name"
```

### 3 - Apply the configuration to deploy

Now, It's good to go, we should deploy our resources to AWS.

```bash
terraform apply "plan-name"
```

We'll wait for a fews minutes and check the result after that.

### 4 - Clean up

To clean up the resources, use

```bash
terraform destroy --var-file=default.tfvars
```

Enter `yes`, then waiting for destruction process. And the output will look like this

```
aws_lambda_permission.apigw_lambda: Destroying... [id=AllowAPIGatewayInvoke]
aws_apigatewayv2_route.route: Destroying... [id=bw4h75g]
aws_apigatewayv2_stage.test: Destroying... [id=test]
aws_lambda_permission.apigw_lambda: Destruction complete after 1s
aws_apigatewayv2_route.route: Destruction complete after 1s
aws_apigatewayv2_integration.integration: Destroying... [id=m7gsi3c]
aws_apigatewayv2_stage.test: Destruction complete after 1s
aws_apigatewayv2_integration.integration: Destruction complete after 0s
aws_apigatewayv2_api.example_api: Destroying... [id=4zdjskby2g]
aws_lambda_function.example_function: Destroying... [id=example_function]
aws_lambda_function.example_function: Destruction complete after 0s
aws_iam_role.iam_for_lambda: Destroying... [id=iam_for_lambda]
aws_apigatewayv2_api.example_api: Destruction complete after 2s
aws_iam_role.iam_for_lambda: Destruction complete after 2s

Destroy complete! Resources: 7 destroyed.
```

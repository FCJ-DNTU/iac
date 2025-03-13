# Deploy a basic infrasucture

## About

In this lab, we will deploy a simple infrastrucure to AWS. And there are some concepts that we will learn:

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
terraform plan
```

### 3 - Apply the configuration to deploy

Now, It's good to go, we should deploy our resources to AWS.

```bash
terraform apply
```

We'll wait for a fews minutes and check the result after that.

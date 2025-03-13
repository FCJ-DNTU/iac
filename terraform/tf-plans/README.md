# Terraform Plans

## About

In this lab, we will learn how to mark version to our configuration by using plan.

## Steps

We don't use AWS in this lab, so we don't need to prepare AWS CLI Profile.

### 1 - Init

We have to init our configuration to download proper providers.

```bash
terraform init
```

### 2 - Create new plan and apply configuration

Now, we will create new plan, it's name can be `16-length`.

```bash
terraform plan -out plans/16-length
```

And then, we have to apply this plan.

```bash
terraform apply plans/16-length
```

You will we, terraform will apply this plan an return a random 16-length string.

### 3 - Create another plan and deploy

Suppose we want to increase the length of string and store the current configuration, so we need to create new plan to change the length of string. Open the file and modify the length to `64`, save the file;

```bash
terraform plan -out plans/64-length
```

Apply new plan.

```bash
terraform apply plans/64-length
```

A new random 64-length string will be created. And you can simply go back to `plans/16-length` without any additional configuration.

Note: you can see that when we make a new plan, we have to modify our configuration => This is a bad design if we have various parameters and we want to make multiple plans by changing their value? So the solution is we will need variable(s) by using `variables.tf` and `.tfvars` file to dynamically import variables into configuration. Now the plan command should be.

```bash
terraform plan -out plans/64-length -var-file="my-var.tfvars"
```

And apply this plan with

```bash
terraform apply plans/64-length
```

=> We don't need to inject variables file to `apply` command, because we did it with `plan` command.

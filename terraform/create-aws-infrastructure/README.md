# Deploy a simple infrastructure in AWS

## About

In this example, we'll deploy a simple infrastructure with an EC2. We have learned about Terraform Module before, so in this example, I'll split the Root Module into 2 sub-modules (`infrastucture` and `ec2`).

## Infrastructure
![image](https://github.com/user-attachments/assets/4250ebe0-5f0a-4ac3-83a9-3d82f8a36129)

## Dependencies Map
![image](https://github.com/user-attachments/assets/56aaa321-3747-4d9a-aba3-a743db4cf22a)

## Steps

### 0 - Prepare (\*\*\*)

You have to assign your credential of IAM User to do this example

Way 1: use environment variables

```bash
export AWS_ACCESS_KEY_ID="Enter you Access Key ID here"
export AWS_SECRET_ACCESS_KEY="Enter you Secret Access Key here"
```

Way 2: use aws cli

```bash
aws configure
AWS Access Key ID []: "Enter you Access Key ID here"
AWS Secret Access Key[]: "Enter you Secret Access Key here"
Default region name []: "Enter you region"
Default output format [] : "json"
```

### 1 - Build modules

Build all modules

```bash
terraform get
```

```bash
- infrastructure in modules/infrastructure
- private_ec2 in modules/ec2
- public_ec2 in modules/ec2
- security in modules/security
```

## 2 - Make plan

When all modules are built, we need to init plan

```bash
terraform init
```

```bash
Initializing the backend...
Initializing modules...
Initializing provider plugins...
- Finding hashicorp/aws versions matching "~> 5.0"...
- Installing hashicorp/aws v5.68.0...
- Installed hashicorp/aws v5.68.0 (signed by HashiCorp)
Terraform has created a lock file .terraform.lock.hcl to record the provider
selections it made above. Include this file in your version control repository
so that Terraform can guarantee to make the same selections by default when
you run "terraform init" in the future.

Terraform has been successfully initialized!
...
```

Done!

## 3 - Apply plan

Now, we have to deploy our infrastructure to AWS Cloud

```bash
terraform apply
```

When you run this command, Terraform will output the plan and ask you "Do you want to perform these actions?", enter "yes".

```bash
module.infrastructure.aws_vpc.terranet: Creating...
module.infrastructure.aws_vpc.terranet: Still creating... [10s elapsed]
module.infrastructure.aws_vpc.terranet: Creation complete after 14s [id=vpc-01f6eb1358aed7b2b]
...
module.public_ec2.aws_instance.terra_ec2: Creation complete after 35s [id=i-002d0b9924414b8f8]

Apply complete! Resources: 14 added, 0 changed, 0 destroyed.
```

## 4 - View result
Search **VPC** and go to **Your VPCs** selection, choose `terranet` and select `Resource map` tab in below, you will see the map of resources that are created with this VPC
![image](https://github.com/user-attachments/assets/a0b38339-981d-4d2a-bdb5-0711cfae2dec)

Next, search **EC2** and go to **Instances** selection, enter `terra` in the filter input, choose state = "Running".
![image](https://github.com/user-attachments/assets/a91def23-1683-4bcf-b130-0d785fb65601)

Now we need the public ipv4 of `terra_public_ec2`, then connect SSH to that instance
![image](https://github.com/user-attachments/assets/3345f236-643f-4237-bf41-4a55c7e00dfb)

Then open the MobaXterm to start a new SSH session, and here is the result
![image](https://github.com/user-attachments/assets/676d1774-46e7-4b29-af87-7598d582084e)

> Note: if you choose correct key-pair, you will start new session successfully.

## 5 - Clean up resources

When you run `terraform destroy`, Terraform will ask you again, just enter "yes" to clean up resources. Choose `terra_public_ec2`, copy the ip in Public** IPv4 address**

```bash
terraform destroy
```

```bash
module.private_ec2.aws_instance.terra_ec2: Destroying... [id=i-08e2242fbc6c7cdb0]
module.public_ec2.aws_instance.terra_ec2: Destroying... [id=i-002d0b9924414b8f8]
...
module.infrastructure.aws_internet_gateway.igw: Destroying... [id=igw-0e63ebc38e2e6b0c9]
module.infrastructure.aws_internet_gateway.igw: Destruction complete after 1s
module.infrastructure.aws_vpc.terranet: Destroying... [id=vpc-01f6eb1358aed7b2b]
module.infrastructure.aws_vpc.terranet: Destruction complete after 0s

Destroy complete! Resources: 14 destroyed.
```

# Infrastructure as Code

In this repository, we focus on learning IaC with AWS as a main cloud provider, view more about AWS [here](https://aws.amazon.com/about-aws/). Let's start!!

## First words
We recommend that you should learn how to configure AWS services by you hands before you learn and do examples with us in this repository.

Because of focusing on AWS Cloud, we need to learn about:
- **Terraform**: we can write configuration with it and `apply` to multiple cloud platforms.
- **CDK**: use with NodeJS.
- **CloudFormation**: a service has responsibility for deploy infrastructure and services.

You should read the `README.md` carefully before you start doing something in this repository. That's all, have a good journey.

## Objectives
After we following instructions, examples in this repository, we'll have a clearer sight about these following concepts:
- Know how to configure infrastucture and services with Terraform, CDK and CloudFormation.
- Know how to manage, monitor infrastructure and services with IaC. Will depend on which IaC we learn and use.
- Have a quick thought (to give an early idea) in infrastructure diagram and know what we'll do.
- Can deploy your own application to cloud with IaC.

## Concepts
### What is IaC?
Infrastructure as Code (IaC) is the managing and provisioning of infrastructure through **code** instead of through *manual processes* or *command lines* (it makes life easier for experienced engineer).

Learn more about IaC: [https://www.redhat.com/en/topics/automation/what-is-infrastructure-as-code-iac](https://www.redhat.com/en/topics/automation/what-is-infrastructure-as-code-iac).

### Terraform
It uses a syntax which is called **Configuration Language** base on HCL by HashiCorp to provision and manage infrastructures and services in cloud and on-premise environment.

> Learn more about **Terraform**: [https://developer.hashicorp.com/terraform](https://developer.hashicorp.com/terraform)

### Cloud Development Kit
CDK is provided by AWS, we can use it with NodeJS, Python or another languages. Its syntax is depend on which language we use.

> Learn more about **CDK**: [https://docs.aws.amazon.com/cdk/v2/guide/home.html](https://docs.aws.amazon.com/cdk/v2/guide/home.html)

### CloudFormation
It's a native iac of AWS, as a service, so It will provide us more options and conventions when we provision and manage resources on AWS. The syntax of CloudFormation can by YAML or JSON, we'll use JSON in this journey.

> Learn more about **CloudFormation**: [https://docs.aws.amazon.com/cloudformation/](https://docs.aws.amazon.com/cloudformation/)

Each IaC will have pros and cons, so before you configure your infrastructure and services, you should understand your requirements of applications and system as well as your team culture.

## Structure of repository
We'll split this repository into 3 main folder: `terraform`, `cdk` and `cloudformation`. These folder contain source codes and examples in sub-folders.

```
.
├── cdk/
│   ├── example_01
│   └── README.md
├── cloudformation/
│   ├── example_01
│   └── README.md
├── terraform/
│   ├── example_01
│   └── README.md
└── README.md
```

We will try to explain the example in detail and give an infrastructure in each example.

Have a good journey.
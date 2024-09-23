# Fullstack application with Docker

## About

Suppose you have an application which interacts with server to do some tasks, your application can be splited into 3 sub applications, so how do you deploy it to docker?. In this example, we'll deploy a simple fullstack application with Client App, Server and Database without docker compose.

> Note: You can modify the configuration to deploy you own system.

If you want to run the application without docker, you should run `scripts/install-mysql.sh` to install MySQL in your local machine.

### 1 - Install MySQL Server

```bash
sudo bash scripts/install-mysql.sh
```

### 2 - Get the current working directory string

When the installation is done, check the current working directory with

```bash
echo $PWD
```

And copy the result.

### 3 - Go into MySQL Command Line and use SQL Script to create required Database, tables.

Now, you have to run `database/scripts/init.sql` with MySQL Command Line to create required database, tables.

```bash
sudo mysql -u root
```

In MySQL Command Line

```
mysql > source <your-current-working-directory>database/scripts/init.sql
```

And you'll see the result

```
Query OK, 1 row affected (0.03 sec)

Database changed
Query OK, 0 rows affected (0.05 sec)

Query OK, 0 rows affected (0.03 sec)
```

### 4 - Check result

```
mysql > SHOW DATABASES;
```

```
+--------------------+
| Database           |
+--------------------+
| TODOAPP            |
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)
```

### 5 - Run Client and Server application

First, go to `server/scripts/start.sh`, modify these environment variables' value:

```bash
export MYSQL_HOST="localhost"
export MYSQL_USER="your-user-here"
export MYSQL_USER_PASSWORD="your-password-of-user"
```

Then you run the `scripts/start.sh` in `server`.

```bash
bash scripts/start.sh
```

Now, go to `client`, and run

```bash
npm run dev
```

```bash
VITE v5.4.6  ready in 256 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://172.25.207.155:5173/
  ➜  press h + enter to show help
```

Good luck!

## Steps

Follow these step to deploy the application to docker with Terraform.

### 1 - Build image

First, you need to build 3 images for Client Application, Server Application and Database Server. Change directory to `fullstack-docker/deploy`.

```bash
bash scripts/setup.sh
```

You'll receive these results
Image of Client Application

```bash
[+] Building 9.9s (10/10) FINISHED                                                                                    docker:default
...
 => [4/4] RUN npm install                                                                                                       4.4s
 => exporting to image                                                                                                          0.3s
 => => exporting layers                                                                                                         0.3s
 => => writing image sha256:1b387b7ca98deebeb36f48d56f3b2ad81702d14d3a478e9752a5522effabb381                                    0.0s
 => => naming to docker.io/library/client-app-image                                                                             0.0s
```

Image of Server Application

```bash
[+] Building 170.7s (9/9) FINISHED                                                                                    docker:default
...
 => [4/4] RUN npm install                                                                                                     167.3s
 => exporting to image                                                                                                          1.6s
 => => exporting layers                                                                                                         1.6s
 => => writing image sha256:fdfae42f2d3ba3d014fc4157a94bbd136db6c150f95de393d2a94fe15ab229af                                    0.0s
 => => naming to docker.io/library/server-app-image                                                                             0.0s
```

Image of Database Server

```bash
[+] Building 51.2s (8/8) FINISHED                                                                                     docker:default
...
 => [2/2] COPY ./scripts/init.sql /docker-entrypoint-initdb.d/                                                                  0.4s
 => exporting to image                                                                                                          0.1s
 => => exporting layers                                                                                                         0.0s
 => => writing image sha256:bbff0e921b0bf5262c92d48d4c85349a3e786af8069b2b9cba8fdc98b7505eed                                    0.0s
 => => naming to docker.io/library/server-database-image                                                                        0.0s
```

Run `docker image ls` to check the result

```bash
REPOSITORY              TAG       IMAGE ID       CREATED         SIZE
server-database-image   latest    bbff0e921b0b   2 minutes ago   586MB
server-app-image        latest    fdfae42f2d3b   3 minutes ago   441MB
client-app-image        latest    1b387b7ca98d   6 minutes ago   137MB
web-server-image        latest    7cfd126e10cd   7 hours ago     142MB
nginx                   latest    39286ab8a5e1   5 weeks ago     188MB
```

### 2 - Create modules

You need to create modules first

```bash
terraform get
```

You will see the result

```bash
- client-app in modules/terraform-client-app
- server-app in modules/terraform-server-app
- server-database in modules/terraform-server-database
```

Check providers in each modules

```bash
terraform providers
```

```bash
Providers required by configuration:
.
├── provider[registry.terraform.io/kreuzwerker/docker] ~> 3.0.1
├── module.client-app
│   └── provider[registry.terraform.io/kreuzwerker/docker] ~> 3.0.1
├── module.server-app
│   └── provider[registry.terraform.io/kreuzwerker/docker] ~> 3.0.1
└── module.server-database
    └── provider[registry.terraform.io/kreuzwerker/docker] ~> 3.0.1
```

### 3 - Make plan

Then you tell terraform to create plan for you deployment.

```bash
terraform init
```

You will get the result

```bash
Initializing the backend...
Initializing modules...
Initializing provider plugins...
- Finding kreuzwerker/docker versions matching "~> 3.0.1"...
- Installing kreuzwerker/docker v3.0.2...
- Installed kreuzwerker/docker v3.0.2 (self-signed, key ID XXXXXXXXXXXXXXXX)
Partner and community providers are signed by their developers.
If you'd like to know more about provider signing, you can read about it here:
https://www.terraform.io/docs/cli/plugins/signing.html
...

Terraform has been successfully initialized!

...
```

### 4 - Apply plan

Now our applications are ready, we should tell Terraform to apply the plan

```bash
terraform apply
```

You will see outputs, depend on you docker

```bash
Apply complete! Resources: 3 added, 0 changed, 0 destroyed.

Outputs:

client_container_external_port = tolist([
  {
    "external" = 5500
    "internal" = 5173
    "ip" = "0.0.0.0"
    "protocol" = "tcp"
  },
])
client_container_id = "*****"
client_endpoint = ""*****""
database_container_external_port = tolist([
  {
    "external" = 32772
    "internal" = 3306
    "ip" = "0.0.0.0"
    "protocol" = "tcp"
  },
])
database_container_id = ""*****""
database_endpoint = ""*****""
server_container_external_port = tolist([
  {
    "external" = 8000
    "internal" = 8000
    "ip" = "0.0.0.0"
    "protocol" = "tcp"
  },
])
```

### 5 - View result

Before we test the application, we should go to **Server Container** in Docker Desktop, go to the **Logs** tab and make sure your server connect to mysql server inside **Database Container** successfully llike this
<p align="center">
  <img src="https://github.com/user-attachments/assets/e10818ed-4a63-4da5-932c-3f8354b9685c" />
</p>

Now, open the client application by `http://localhost:5500`, you will be redirect to sign in page. Let's make an account.

![2024-09-23_095154](https://github.com/user-attachments/assets/9cb762e2-2278-44a9-82b8-3f720e4de852)

After you sign up account successfully,  you will see the **Home Page**, click `Navigate to Todo`

![2024-09-23_095233](https://github.com/user-attachments/assets/329f2b2c-a335-4c80-95a5-5cf0aa6a84d6)

And the task form will be showed up, let's assign a task. Then **mark it as done**.

![2024-09-23_095536](https://github.com/user-attachments/assets/ab5b8486-d897-4a17-b198-7645eba7c096)
![2024-09-23_095600](https://github.com/user-attachments/assets/d4aa95bf-8f3f-49fb-9cd3-26d5210a5279)


Go to **Complete** tab

![2024-09-23_095618](https://github.com/user-attachments/assets/95878176-cd43-407e-af23-fe8709e5efa4)

After 15 minutes, your token will be expired, then you have to re-sign in.

That's all.

terraform {
  required_providers {
    docker = {
      # Source of the Provider
      source  = "kreuzwerker/docker"

      # Version of provider
      version = "~> 3.0.1"
    }
  }
}
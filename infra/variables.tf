variable "cloudflare_api_token" {
  type      = string
  sensitive = true
}
variable "github_token" {
  type      = string
  sensitive = true
}
variable "cloudflare_account_id" { type = string }
variable "cloudflare_zone_id" { type = string }
variable "github_owner" {
  type    = string
  default = "emilan21"
}
variable "preview_ip_cidr" {
  type        = string
  default     = "132.147.2.73/32"
  description = "Only source address allowed to reach the private public-site preview."
  validation {
    condition     = can(cidrhost(var.preview_ip_cidr, 0)) && strcontains(var.preview_ip_cidr, "/")
    error_message = "preview_ip_cidr must be a valid IPv4 or IPv6 CIDR range."
  }
}

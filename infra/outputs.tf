output "repository_url" { value = github_repository.site.html_url }
output "preview_application_ids" {
  value = {
    apex = cloudflare_zero_trust_access_application.apex.id
    www  = cloudflare_zero_trust_access_application.www.id
  }
}
output "custom_domain_ids" {
  value = {
    apex = cloudflare_workers_custom_domain.apex.id
    www  = cloudflare_workers_custom_domain.www.id
  }
}


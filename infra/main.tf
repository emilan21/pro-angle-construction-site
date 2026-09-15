locals {
  repository_name = "pro-angle-construction-site"
  apex_hostname   = "proangleconstructionpa.com"
  www_hostname    = "www.proangleconstructionpa.com"
}

resource "github_repository" "site" {
  name                   = local.repository_name
  description            = "Public website for Pro Angle Contracting"
  visibility             = "public"
  has_issues             = true
  delete_branch_on_merge = true
  allow_merge_commit     = false
  allow_rebase_merge     = true
  allow_squash_merge     = true
}

# The repository is bootstrapped once by `gh repo create`; the first apply adopts it.
import {
  to = github_repository.site
  id = "pro-angle-construction-site"
}

resource "github_repository_vulnerability_alerts" "site" {
  repository = github_repository.site.name
  enabled    = true
}

resource "github_repository_ruleset" "main" {
  name        = "protect-main"
  repository  = github_repository.site.name
  target      = "branch"
  enforcement = "active"
  conditions {
    ref_name {
      include = ["~DEFAULT_BRANCH"]
      exclude = []
    }
  }
  rules {
    deletion                = true
    non_fast_forward        = true
    required_linear_history = true
    pull_request {
      required_approving_review_count = 0
      dismiss_stale_reviews_on_push   = false
      require_code_owner_review       = false
    }
    required_status_checks {
      strict_required_status_checks_policy = true
      required_check { context = "quality" }
    }
  }
}

resource "cloudflare_zero_trust_access_policy" "preview_ip" {
  account_id       = var.cloudflare_account_id
  name             = "Allow Pro Angle public-site preview IP"
  decision         = "allow"
  session_duration = "24h"
  include          = [{ ip = { ip = var.preview_ip_cidr } }]
  lifecycle { create_before_destroy = true }
}

resource "cloudflare_zero_trust_access_application" "apex" {
  account_id                = var.cloudflare_account_id
  name                      = "Pro Angle Public Site Preview (apex)"
  type                      = "self_hosted"
  domain                    = local.apex_hostname
  session_duration          = "24h"
  auto_redirect_to_identity = false
  app_launcher_visible      = false
  policies                  = [{ id = cloudflare_zero_trust_access_policy.preview_ip.id, precedence = 1 }]
}

resource "cloudflare_zero_trust_access_application" "www" {
  account_id                = var.cloudflare_account_id
  name                      = "Pro Angle Public Site Preview (www)"
  type                      = "self_hosted"
  domain                    = local.www_hostname
  session_duration          = "24h"
  auto_redirect_to_identity = false
  app_launcher_visible      = false
  policies                  = [{ id = cloudflare_zero_trust_access_policy.preview_ip.id, precedence = 1 }]
}

resource "cloudflare_workers_custom_domain" "apex" {
  account_id = var.cloudflare_account_id
  zone_id    = var.cloudflare_zone_id
  zone_name  = local.apex_hostname
  hostname   = local.apex_hostname
  service    = local.repository_name
}

resource "cloudflare_workers_custom_domain" "www" {
  account_id = var.cloudflare_account_id
  zone_id    = var.cloudflare_zone_id
  zone_name  = local.apex_hostname
  hostname   = local.www_hostname
  service    = local.repository_name
}

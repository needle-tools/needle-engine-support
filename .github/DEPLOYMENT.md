# Deployment Configuration

## GitHub Secrets

The following secrets need to be configured in the GitHub repository settings for the deployment workflow to function properly.

### Cloudflare Cache Purge

**Required for automatic cache invalidation after docs deployment:**

- `CLOUDFLARE_ZONE_ID` - The Zone ID for engine.needle.tools
  - Found in Cloudflare Dashboard → Select your domain → Overview (right sidebar)
  - Example: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

- `CLOUDFLARE_API_TOKEN` - API token with cache purge permissions
  - Create at: Cloudflare Dashboard → My Profile → API Tokens → Create Token
  - Use template: "Custom token"
  - Permissions needed:
    - Zone → Cache Purge → Purge
  - Zone Resources:
    - Include → Specific zone → engine.needle.tools
  - Copy the token immediately (shown only once)

### Existing Secrets

- `GITHUB_TOKEN` - Automatically provided by GitHub Actions
- `FTP_SERVER` - FTP server hostname for deployment
- `FTP_PASSWORD` - FTP server password
- `DEPLOY_DISCORD_WEBHOOK` - Discord webhook URL for deployment notifications

## How to Add Secrets

1. Go to repository Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add the secret name and value
4. Click "Add secret"

## Testing

After adding the Cloudflare secrets, the cache will be automatically purged after each successful deployment to the `main` branch. You can verify this works by:

1. Making a change to the docs
2. Committing to main
3. Watching the GitHub Actions workflow run
4. Checking that the "Purge Cloudflare Cache" step succeeds
5. Verifying the updated content appears at https://engine.needle.tools/docs/

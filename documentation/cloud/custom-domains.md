---
title: Custom Domains
description: 'Connect your own domain (e.g. yourdomain.com) to a deployment on Needle Cloud, so visitors reach your 3D app on your own address with automatic HTTPS.'
---

# Custom Domains

::: warning Draft
This feature is rolling out. Details (especially the exact DNS records) may still change.
:::

Connect your **own domain** — like `yourdomain.com` or `viewer.yourdomain.com` — to a Needle
Cloud deployment. Visitors then reach your 3D app on your own address, with a TLS
certificate issued and renewed automatically. No server setup, no certificate management.

::: tip Requirements
- A **Pro** plan (custom domains are a Pro feature).
- A **deployment** to connect the domain to.
- Access to your domain's **DNS settings** (at your registrar / DNS provider).
:::

## How it works (in one minute)

A deployment is normally served at `your-project.needle.run`. Connecting a custom domain
adds a second address that points at the same deployment. You prove you own the domain and
point it at us by adding a couple of **DNS records** at your provider; we then issue the
HTTPS certificate and start serving your domain.

## Connect a domain

1. Open your **deployment** in [Needle Cloud](https://cloud.needle.tools) and find the
   **Custom domains** section.
2. Enter your domain (e.g. `yourdomain.com`) and click **Connect**.
3. The domain appears as **Validating…** with a short list of **DNS records to add**.
4. Add those records at your DNS provider (see below), then click **Verify**.
5. Once your records are in place and verified, the status turns **Active** — your domain is
   live with HTTPS. ✅

## Adding the DNS records

You add the records wherever you manage your domain's DNS (your **registrar** or DNS
provider — e.g. Cloudflare, GoDaddy, Namecheap, IONOS, Squarespace). DNS changes can take a
few minutes to a couple of hours to take effect (*propagation*).

### Apex vs. subdomain

The record you add to **point the domain at us** depends on what kind of domain it is:

| Your domain | Type | Record to add |
| --- | --- | --- |
| `yourdomain.com` (an **apex** / root domain) | A | an **A record** to the IP shown in the connect dialog |
| `viewer.yourdomain.com` (a **subdomain**) | CNAME | a **CNAME** to the target shown in the connect dialog |

::: tip Why an apex needs an A record
An apex (root) domain can't be a `CNAME` — that's a DNS rule, not a Needle limitation. So for
`yourdomain.com` you add an **A record** to the IP we show you. For a subdomain like
`viewer.yourdomain.com`, a `CNAME` is fine.
:::

### The verification records

Alongside the routing record above, the connect dialog shows one or more **TXT records**
(names starting with `_cf-custom-hostname` and `_acme-challenge`). These prove you control
the domain and let us issue the certificate. **Add every record shown** — there may be more
than one `_acme-challenge` value; add all of them (same name, different values).

Use the **copy** button next to each value to avoid typos.

## Common gotchas

::: warning Cloudflare: use "DNS only" (grey cloud)
If your domain is on **Cloudflare**, set the routing record to **DNS only** (grey cloud),
not **Proxied** (orange cloud). A proxied record conflicts with the connection.
:::

::: warning Wildcard / catch-all DNS hides your records
Some hosts (e.g. all-inkl and similar shared hosting) point **every** subdomain at their web
server by default (a *wildcard* / catch-all). Because a DNS name can't be both a `CNAME` and
a `TXT` record at the same time, that wildcard can **shadow** the `_acme-challenge` /
`_cf-custom-hostname` records — so we never see them and validation gets stuck.

If your domain is stuck on **Validating…**, check for a wildcard / catch-all at your DNS
provider and make sure the verification records are added as **explicit** records that
override it.
:::

- **Propagation:** records aren't instant. If Verify says it's not validated yet, wait a few
  minutes and try again.
- **Trailing slashes / `http://`:** enter just the bare domain (`yourdomain.com`), not a full
  URL.

## How do I know it worked?

The status badge tells you:

- **Validating…** — we're waiting for your DNS records / certificate.
- **Active** — your domain is live with HTTPS. Open `https://yourdomain.com/` to see it.
- **Failed** — something went wrong; re-check your records and click Verify.

## Removing a domain

In the **Custom domains** section, use the **disconnect** (trash) action next to the domain.
This stops serving that domain and removes it cleanly. This can't be undone, but you can
re-connect it later.

## Email is unaffected

Connecting a custom domain only changes where **web** traffic for that name goes. Your
**email** (the `MX` records) keeps working as before — connecting a domain to Needle Cloud
does not touch it.

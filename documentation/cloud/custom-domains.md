---
title: Custom Domains
description: 'Connect your own domain (e.g. yourdomain.com) to a deployment on Needle Cloud, so visitors reach your 3D app on your own address with automatic HTTPS.'
---

# Custom Domains

::: warning Draft
This feature is rolling out. Details (especially the exact DNS records) may still change.
:::

Connect a **subdomain of your own domain** — like `www.yourdomain.com` or
`viewer.yourdomain.com` — to a Needle Cloud deployment. Visitors then reach your 3D app on your own
address, with a TLS certificate issued and renewed automatically. No server setup, no certificate
management. *(Root domains like `yourdomain.com` are supported too, via a redirect — see
[Root / apex domains](#root-apex-domains).)*

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
2. Enter a **subdomain** (e.g. `www.yourdomain.com`) and click **Connect**.   
  *(For a root domain like `yourdomain.com`, see [Root / apex domains](#root-apex-domains).)*
3. The domain appears as **Validating…** with a short list of **DNS records to add**.
4. Add those records at your DNS provider (see below), then click **Verify**.
5. Once your records are in place and verified, the status turns **Active** — your domain is
   live with HTTPS. ✅

## Adding the DNS records

You add the records wherever you manage your domain's DNS (your **registrar** or DNS
provider — e.g. Cloudflare, GoDaddy, Namecheap, IONOS, Squarespace). DNS changes can take a
few minutes to a couple of hours to take effect (*propagation*).

### The routing record — a CNAME on a subdomain

Connect a **subdomain** — `www.yourdomain.com`, `viewer.yourdomain.com`, `app.yourdomain.com` — and
add the **CNAME** record shown in the connect dialog. That's the routing done; the subdomain now
points at your deployment.

::: tip Prefer a subdomain
A subdomain is the recommended (and simplest) way to connect a custom domain — one `CNAME` and it
just works. Want visitors to reach your **root** domain (`yourdomain.com`) too? See
[Root / apex domains](#root-apex-domains) below.
:::

### The verification records

Alongside the routing record above, the connect dialog shows one or more **TXT records**
(names starting with `_cf-custom-hostname` and `_acme-challenge`). These prove you control
the domain and let us issue the certificate. **Add every record shown** — there may be more
than one `_acme-challenge` value; add all of them (same name, different values).

Use the **copy** button next to each value to avoid typos.

## Root / apex domains

A **root** (or *apex*) domain is the bare domain with no subdomain — `yourdomain.com`. By a DNS
rule, a root domain **can't be a `CNAME`**, so it can't be pointed at Needle Cloud directly. Use
your root domain in two steps:

1. **Connect a subdomain** — usually `www.yourdomain.com` — exactly as above (CNAME + verification
   records → **Active**). This serves your app. *(In the connect dialog, if you type a root domain
   we'll offer a one-click "Use `www.…`" to do this for you.)*
2. **Redirect the root to the subdomain.** At your registrar / DNS provider, set up a **301
   (permanent) redirect** so `yourdomain.com` → `https://www.yourdomain.com/`, and **enable HTTPS**
   on the forward — often labeled **"SSL"** (or "Let's Encrypt") — so `https://yourdomain.com`
   doesn't show a certificate warning. Most providers
   offer this under "URL forwarding" / "redirect" — e.g. **all-inkl** "Weiterleitung", **Porkbun** /
   **Namecheap** "URL forwarding", **Cloudflare** "Redirect Rules". Choose **permanent (301)**, not
   temporary — it's the SEO-correct choice.

Now visitors typing `yourdomain.com` are sent to `www.yourdomain.com`, which serves your app. This
is standard practice — much of the web canonicalises to `www`.

::: tip Need your bare root domain to serve directly?
Serving a root domain *directly* — so the address stays `yourdomain.com`, with no redirect — needs
a dedicated setup and isn't available on the standard plan. If that matters for your project,
[get in touch](mailto:hi@needle.tools) and we'll help you find the best option. For now, the
**subdomain + redirect** above is the reliable path that works everywhere today.
:::

## Troubleshooting

### Stuck on "Validating…"? Let us check for you

When a domain isn't verifying, click **Verify** — we run a live DNS check and tell you, per
record, exactly what's wrong: not found yet, the wrong value, blocked by a wildcard, or entered
with your domain accidentally doubled (see below). You usually don't have to debug DNS by hand.

### Don't include your domain in the record name

Many DNS providers **add your domain automatically** to whatever you type in a record's *name*
field. If you paste the full name shown (e.g. `_acme-challenge.yourdomain.com`), it can end up
**doubled** — `_acme-challenge.yourdomain.com.yourdomain.com` — and we'll never find it. Enter
only the **label** (the part before your domain, e.g. `_acme-challenge`); the provider appends the
rest. If you're unsure, add it and click **Verify** — we'll tell you if it landed at the wrong name.

### Cloudflare: use "DNS only" (grey cloud)

If your domain is on **Cloudflare**, set the routing record to **DNS only** (grey cloud), not
**Proxied** (orange cloud). A proxied record conflicts with the connection.

### A wildcard / catch-all is hiding your records

Some DNS providers point **every** subdomain at their web server by default (a *wildcard* /
catch-all). Because a DNS name can't be both a `CNAME` and a `TXT` record at the same time, that
wildcard can **shadow** the `_acme-challenge` / `_cf-custom-hostname` records — so we never see
them and validation gets stuck.

If your domain is stuck on **Validating…**, check for a wildcard / catch-all at your DNS provider
and make sure the verification records are added as **explicit** records that override it.

### Propagation takes time

DNS records aren't instant. If Verify says it's not validated yet, wait a few minutes and try again.

### Enter the bare hostname, not a URL

Type just the hostname (`www.yourdomain.com`) — no `http://`, no trailing slash, no path.

## How do I know it worked?

The status badge tells you:

- **Validating…** — we're waiting for your DNS records / certificate.
- **Active** — your domain is live with HTTPS. Open `https://www.yourdomain.com/` to see it.
- **Failed** — something went wrong; re-check your records and click Verify.

## Removing a domain

In the **Custom domains** section, use the **disconnect** (trash) action next to the domain.
This stops serving that domain and removes it cleanly. This can't be undone, but you can
re-connect it later.

## Email is unaffected

Connecting a custom domain only changes where **web** traffic for that name goes. Your
**email** (the `MX` records) keeps working as before — connecting a domain to Needle Cloud
does not touch it.

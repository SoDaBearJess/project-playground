# Deploying a React Site to cPanel with GitHub Actions

A plain-language guide to the pipeline we built — how it works, and the traps
we hit along the way so you can avoid them next time.

---

## The big idea

Your cPanel host can *store* and *serve* files, but on shared hosting it cannot
*build* a React app (there is no reliable `npm run build` on the server). So the
work is split:

- **GitHub Actions** builds your site (turns source code into finished files).
- **FTP** carries those finished files up to cPanel's `public_html`.

Every time you push to your `main` branch, this happens automatically.

---

## One-time setup

### 1. Store your FTP credentials as GitHub secrets

In your repo: **Settings -> Secrets and variables -> Actions -> New repository secret.**

Create three, one at a time:

| Name           | Value (the real thing)                         |
|----------------|------------------------------------------------|
| `FTP_SERVER`   | Your server's address (see the Cloudflare note below) |
| `FTP_USERNAME` | Your cPanel FTP username                        |
| `FTP_PASSWORD` | Your cPanel FTP password                        |

The **Name** is a label; the **Secret** is the true value. In the workflow file
you only ever reference the *names* (e.g. `${{ secrets.FTP_PASSWORD }}`) — the
real values stay sealed in the vault and never appear in your code or logs.

**Repository secret vs. environment secret:** use a *repository* secret. It just
works. Environment secrets are for teams needing approval gates and staged
deploys — extra ceremony you don't need for one site.

### 2. Add the workflow file

Put `deploy.yml` at `.github/workflows/deploy.yml` in your repo (see the
accompanying file). Adjust three things to match your project:

- `working-directory: ./react` -> your actual subfolder name
- `cp -R react/dist/*` -> `dist` for Vite, `build` for Create React App
- the `cp portfolio-*.html` line -> your own loose root files (or delete it)

---

## How the workflow reads, step by step

1. **checkout** — copies your repo onto a temporary build machine.
2. **setup-node** — installs Node 24 on that machine.
3. **npm ci** — installs dependencies exactly as your lockfile specifies.
4. **npm run build** — compiles your React app into a `dist` (or `build`) folder.
5. **Assemble** — copies the built site plus any loose files into one `deploy` folder.
6. **Upload via FTP** — sends the `deploy` folder to `public_html`.

---

## The traps we hit (and the fixes)

**"Node.js 20 is deprecated..."**
Two different "Nodes" live in a workflow. `node-version:` sets the Node that
*builds your site* — safe to set to 24. The deprecation *warning*, though, is
about the Node runtime the *actions themselves* use. Fix it by bumping the
action versions: `actions/checkout@v6` and `actions/setup-node@v6`.

**"npm ci can only install with an existing package-lock.json"**
Your `package.json` and lockfile live in a subfolder, not the repo root, so the
commands were running in the wrong place. Fixed with
`defaults.run.working-directory: ./react`, which runs the npm commands inside
that folder. (You do NOT need an empty build folder — `npm run build` creates it.)

**FTP upload times out (ETIMEDOUT), IPs look like 172.67.x / 104.21.x**
Those are Cloudflare addresses. Your domain's DNS is proxied through Cloudflare,
which only carries web traffic — not FTP. Fix: set `FTP_SERVER` to your server's
**direct IP** (cPanel -> General Information -> Shared IP Address) or an
unproxied hostname, so FTP reaches the real server.

**"read ECONNRESET (data socket)" with a TLS line in the trace**
This is FTPS (encrypted FTP) colliding with cPanel's TLS session-reuse rule —
the server resets the data connection. Fixes, in order of preference:
- **SFTP** would avoid it entirely, but this action doesn't support SFTP.
- **`protocol: ftp`** (plain FTP) sidesteps it and works on nearly every cPanel
  host. Cost: the transfer is unencrypted (fine for a public static site).

**FTPS is NOT the same as SFTP.**
- *FTPS* = ordinary FTP wrapped in TLS. Port 21, same passive data socket.
- *SFTP* = a different protocol over SSH, port 22, single connection.

**Files land in a nested `public_html/public_html` (or `home/user/...`)**
FTP sessions usually start *inside* your home directory. So:
- An absolute path like `/home/user/public_html` gets rebuilt *inside* home.
- If your FTP account is rooted inside `public_html`, then `server-dir:
  public_html/` nests again.
Fix: use `server-dir: public_html/` for a home-rooted account, or
`server-dir: ./` for an account already rooted in `public_html`. Test once and
see where files land.

---

## Uploading more than the built site

This action uploads exactly one folder (`local-dir`). To send extra files or
folders, copy them into the single `deploy` staging folder before upload — do
**not** add a second upload step to the same `server-dir`, because the action
reconciles the destination to match its source and the two steps would delete
each other's files. One staging folder, one upload, no conflict.

`cp` flags: `-R` = recursive (required for folders); plain `cp` for single files.

---

## Testing a deploy

1. Push a small commit to `main`.
2. Watch the run under the repo's **Actions** tab — aim for green checks.
3. Confirm files landed: cPanel -> File Manager -> `public_html` (check timestamps).
4. Visit the site with a hard refresh (Ctrl/Cmd+Shift+R) to dodge the cache.

If a step fails, the real error is in the lines *just above* "Process completed
with exit code 1" — expand the red step and scroll up.

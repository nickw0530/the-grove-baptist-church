# The Grove Baptist Church

A responsive church website built with TypeScript and Vite. All illustrations,
icons, and fonts are local or system-provided. No external services, database,
credentials, or environment variables are required to run it.

## Develop

Requires Node.js 22.12+ (Node.js 24 is available in the cloud environment).

```sh
npm ci
npm run dev
```

Use the existing checkout at `/workspace/the-grove-baptist-church` in the cloud
environment. Do not create another checkout or a Git worktree for routine tasks.

## Validate

```sh
npm run build
npm test
```

The build runs strict TypeScript checking and produces the static website in
`dist/`. Browser tests cover desktop and mobile rendering, navigation, the visit
guide, focus handling, and FAQ controls. Tests use `/usr/bin/chromium` when present.
Set `CHROMIUM_PATH` for another system Chromium, or run
`npx playwright install --with-deps chromium` if no system Chromium is available.

For a local production check, run `npm run preview -- --port 4174 --strictPort`
after building. The homepage and `/grove-landscape.svg` should both respond with
HTTP 200. Check that the page title names The Grove Baptist Church.

## Church information

The site includes the congregation’s supplied details: 70 West St, Whiteland,
Indiana 46184; Sunday School at 9:30 am; Sunday worship at 10:30 am;
(317) 800-0515; and ingrovechurch@gmail.com. Edit `src/church.ts` to keep these
current. There are no invented events, ministry programs, or donation destinations.
Directions and contact links appear automatically when configured. If a detail is
removed, the site describes it as unconfirmed rather than inventing a replacement.

The homepage’s general welcome and faith statements are draft copy. Have church
leadership review them before announcing the website. The illustration is original
artwork, not a photograph of the church building.

Watch links open `https://www.facebook.com/ingrovechurch`, where the church
also streams its services. The owner plans to forward `.net` to `.com`, so no watch
links use the `.net` domain. The original BoxCast embed code was not available in
this conversation; an inline player can be added when that code is available.

This version has no mailing list, contact submission form, analytics, or online
giving. No visitor information is collected. Add those only when real destinations
and services have been provided.

## Publish the website

The repository is configured for Netlify in `netlify.toml`:

1. In your Netlify account, choose **Add new project → Import an existing project**
   (or **Add new site → Import an existing project**, depending on the dashboard).
2. Choose GitHub and `nickw0530/the-grove-baptist-church`.
3. Select branch `main`. Netlify reads the build command (`npm run build`), Node.js
   version (`24`), and output directory (`dist`) from `netlify.toml`.
4. Deploy, then add your church domain under the site’s domain settings if desired.

If you already created the Netlify site, connect this repository to that site
instead of creating another. Future pushes to `main` can deploy automatically.
No environment variables or secrets are needed for the website build. Publishing
the Codex development environment is separate from publishing this website.

### Connect the GoDaddy domain

Use `thegrovebaptistchurch.com` as the primary domain. The site’s canonical and
sharing URL already use this address. After Netlify creates the site, add this
custom domain and its `www` alias in Netlify’s domain management. Follow the DNS
records that Netlify displays for external DNS and enter them in GoDaddy’s DNS
manager. Keep existing unrelated records, especially email records. Netlify
provisions HTTPS after the domain is correctly connected. The owner plans to forward `thegrovebaptistchurch.net` to
`https://thegrovebaptistchurch.com/` through GoDaddy. That is separate from the
Netlify site setup; no DNS or forwarding changes have been made by this project.

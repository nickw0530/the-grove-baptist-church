# The Grove Baptist Church

A responsive church website built with TypeScript and Vite. The homepage leads
with the church's BoxCast live player and previous-service playlist. No database,
credentials, or environment variables are required to build or serve the site.
The viewing experience depends on BoxCast's external player and media services.

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
`dist/`. The 22 browser tests cover desktop and mobile rendering, streaming-first
page order, the supplied BoxCast integration/options, provider failure fallback,
navigation, the visit guide, focus handling, and FAQ controls. The external player
script is replaced with an explicit provider stub in tests, so those checks do
not establish real BoxCast video playback. Tests use `/usr/bin/chromium` when present.
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
artwork, not a photograph of the church building. The previously invented logo
has been removed from the header, footer, and browser icon. A text wordmark is
used until the owner reattaches the original logo.

## Live and previous services

`src/broadcast.ts` loads the supplied `https://js.boxcast.com/v3.min.js` widget
for channel `rs1sn7iap6fgcn3nn8as`. All original embed options are preserved,
including `playlist-to-right`, related broadcasts, the next-video default,
countdown, DVR, descriptions, documents, donations, and chat. The player and its
playlist appear before the welcome and visit sections. No sample episodes,
invented video titles, or static mock broadcasts are included in the website.

If the provider script fails or takes too long to initialize, visitors get a
readable fallback and a Facebook watch link. Facebook links remain available
alongside the player. The owner plans to forward `.net` to `.com`, so no video
links use `.net`.

Local tests verify our provider integration and fallback with a test stub. Real
playback has not yet been checked: the cloud proxy rejected CONNECT to BoxCast
with HTTP 403. Allowlist additions for `js.boxcast.com`, `api.boxcast.com`, and
`boxcast.tv` are saved in the environment draft and must be applied through
environment settings before checking the actual provider. Further media/CDN
destinations may be discovered after the provider page can be read. Do not bypass
the proxy or treat the mocked browser checks as proof of video playback.

The owner supplied these videos for extracting genuine still frames:

- https://boxcast.tv/view/weekly-live-stream-qgqhnqxinatj3lull60m
- https://boxcast.tv/view/sunday-live-stream-pdmthcd5aivtojdn08ps

No video or stills have been downloaded because the proxy also blocks the video
pages. Once access works, use FFmpeg to extract representative wide frames and
optimize them for the web. Use subdued backgrounds with readable foreground text;
do not substitute generated pictures for actual stills.

There are no first-party mailing-list, contact-submission, analytics, or donation
services. The supplied third-party BoxCast player may provide its own interactive
features and process visitor data under the provider's policies.

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

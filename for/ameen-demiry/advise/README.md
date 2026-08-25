# Mentor Review Packet

Six self-contained HTML pages. Every font and image is embedded, so each file works offline, opens by double-click, and can be emailed as an attachment.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Hub: Where does this leak? |
| `ladder.html` | 1 of 3: The ladder, rung by rung |
| `review-offer.html` | 2 of 3: What the $2,500 actually buys |
| `intake.html` | 3 of 3: The intake, question by question |
| `starter-package.html` | Client-facing review page, linked from page 2 |
| `intake-form.html` | The intake form itself, linked from page 3 |

Keep all six in the same folder. The links between them are relative filenames.

## Uploading to GitHub

Yes, you can do this yourself. Nothing needs a build step.

1. Create a new repository. Make it **private** unless you want the packet publicly readable.
2. Upload the six files at the repository root. Drag and drop works: on the repo page, Add file, Upload files.
3. To serve it as a website, go to Settings, Pages, and set Source to Deploy from a branch, branch `main`, folder `/ (root)`. Save.
4. A minute or two later the hub is live at `https://<your-username>.github.io/<repo-name>/`. The other pages sit at `/ladder.html`, `/review-offer.html`, and so on.

Two things to know before you turn Pages on. **GitHub Pages is always public**, even from a private repository on a free plan. There is no password and no way to unlist it beyond nobody knowing the URL. Every page carries a `noindex, nofollow` tag so search engines will not list it, but the URL is guessable if the repo name is obvious. Pick something opaque rather than `mentor-packet`.

If you would rather not publish at all, skip step 3. A private repo with the files in it still lets you share a single page by opening it and using the raw link, or you can just email the files.

The other options, if Pages feels like too much exposure: attach `index.html` and the pages it links to directly in an email, or drop the folder in Google Drive or Dropbox and share a link-only folder. Both keep the packet unlisted in a way Pages cannot.

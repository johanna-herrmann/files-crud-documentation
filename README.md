# files-crud Documentation

Documentation for files-crud, powered by [docute](https://docute.egoist.dev/)

## serve locally
```bash
npm run serve
```

## Deployment
To deploy to AWS Amplify:
* Say Amplify, you want to host a webapp
* Connect the branches `main` and `dev`.
* Edit the `Build and test settings` as follows:
  * change value of `frontend`->`artifacts`->`baseDirectory` to `web/` and remove `phases` and `cache`
* Under `Domain Management`, connect the live domain with the `main` branch and the dev domain with the `dev` branch.
* Under `Rewrites and Redirects` configure Amplify, as follows (order matters!):
  | `#` |    Source address         | Target address  | Type                       | Country code |
  | --- | ------------------------- | --------------- | -------------------------- | ------------ |
  |  1  | /index.html	              | /	              | 302 (Redirect - Temporary) | - (empty)    |
  |  2  | /de/index.html	          | /de/	          | 302 (Redirect - Temporary) | - (empty)    |
  |  3  | </\^\\/de\\/[\^.]*$/>     | /de/            | 200 (Rewrite)	             | - (empty)    |
  |  4  | </\^\\/(?!de\\/)[\^.]*$/> | /               | 200 (Rewrite)	             | - (empty)    |
  |  5  | /docs/de/<*>	            | /docs/de/404.md | 404 (Rewrite)              | - (empty)    |
  |  6  | /docs/<*>	                | /docs/404.md    | 404 (Rewrite)              | - (empty)    |

  Purpose of the rewrites/redirects:
  1. Redirect explicit `/index.html` request to `/`
  2. Redirect explicit `/de/index.html` request to `/de/`
  3. Rewrite all `/de/...` URIs without dots to `/de/`
  4. Rewrite all remaining `/...` URIs without dots to `/`
  5. Redirect all 404 on `/docs/de/...` to `/docs/de/404.md`
  6. Redirect all remaining 404 on `/docs/...` to `/docs/404.md`

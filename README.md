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
* Under `Rewrites and Redirects` configure Amplify, as follows (order matters):
  | Source address   | Target address | Type                       | Country code |
  | ---------------- | -------------- | -------------------------- | ------------ |
  | /index.html	     | /	            | 302 (Redirect - Temporary) | - (empty)    |
  | </\^\\/[\^.]+$/> | /              |	200 (Rewrite)	             | - (empty)    |
  | /<*>	           | /docs/404.md   | 404 (Redirect)             | - (empty)    |

  Purpose of the three rewrites/redirects:
  * Redirect explicit `index.html` requests to implicit `/`
  * Rewrite all URIs without dots to `/`
  * Redirect all 404 to `/docs/404.md`


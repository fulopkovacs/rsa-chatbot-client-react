# RSA Chatbot Front End

This chatbot was developed for research purposes. Corresponding API:
[https://github.com/fulopkovacs/rsa-chatbot-backend](https://github.com/fulopkovacs/rsa-chatbot-backend)

## Setup

Run the dev server:

```sh
yarn run
```

## Deployment

Unfortunately we have to build and commit the `dist` folder to enable static
site deployments on Digital Ocean.

Luckily, we configured GitHub Actions to build the project and commit the `dist`
directory automatically when we're pushing to something to `main`, or targeting
`main` in a pull request.

This setup will, however, lead to a huge number of `Update "dist"`-commits done
by the GH CI-bot and the local environment of the developers will keep getting
outdated.

# MotoLinks Web Dashboard

This repository contains a simple React/Vite website for MotoLinks. It provides public pages required for Google Play Console compliance, including Privacy Policy, Data Deletion, Terms of Service, and Contact pages.

## Building locally

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Build for production:

```
npm run build
```

Deploy the contents of the `dist` directory to Cloudflare Pages. Make sure to include the `public/_redirects` file so that direct route access works correctly.

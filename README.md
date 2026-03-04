# DevOpsDays Santiago Web Page

[![Quality Check and RC Tag](https://github.com/os-santiago/devopsdays-santiago-webpage/actions/workflows/quality-and-rc.yml/badge.svg)](https://github.com/os-santiago/devopsdays-santiago-webpage/actions/workflows/quality-and-rc.yml)

## Project info

**URL**: https://devopsdayschile.cl/

## How can I edit this code?

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

First confirm you have a release candidate tag well generated from your changes, it mean that the Quality Check and RC Tag workflow finished succefully. Finally start the Manual Release workflow to take the current release candidate and turn it into a stable release, it will finally deploy the changes in the prod environment.

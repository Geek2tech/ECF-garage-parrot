# Garage Vincent Parrot Front End

Used Framework : Nuxt 3

Used packages and dependencies : 
```bash
"@nuxtjs/tailwindcss": "^6.8.0"

"@pinia/nuxt": "^0.5.1"

"nuxt": "^3.8.0"

"vue": "^3.3.4"

"vue-router": "^4.2.5"

"@nuxt/ui": "^2.9.0"

"lucide-vue-next": "^0.288.0"

"pinia": "^2.1.7"
````


Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Local installation

First clone the repo

while the repos was cloned , go to FrontEnd directory and run the installation of dependencies


```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```
For my part during the development I used npm

## Setup .env file

To make the FrontEnd functional you need to create an .env file with : 
```bash
# BACKEND
APP_APIKEY="insert the API key to provide access to the BackEnd"
APP_BACKEND_URL="Insert the BackEnd url , if your want to use local dev BackEnd ( see readme in BackEnd to setup ) use : http://localhost:8081"
# APP
APP_GARAGE_MAIL="Insert the email who retrieve notification"
```
## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```


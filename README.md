# ReactAuth Console

A Vite + React app that authenticates against the public users API and shows a protected user profile, product list, and product detail views.

## Features

- Email + password sign-in (email maps to username for the auth call)
- Protected routes with redirect-to-login behavior
- Current user profile view only
- Product catalog with pagination
- Product detail page with full data

## Project structure

```
src/
	app/            Auth provider and shared app state
	components/     Reusable UI components
	layouts/        App shell layout
	pages/          Route-level pages
		auth/
		dashboard/
		products/
	routes/         Route configuration and guards
	services/       API clients and data fetching
	styles/         Global styles and theme
	utils/          Helpers and validation
```

## Setup

1) Install dependencies

```
npm install
```

2) Create a local environment file

Copy `.env.example` to `.env` and adjust values as needed.

3) Start the dev server

```
npm run dev
```

## Environment variables

Client-side variables (must start with `VITE_`):

```
VITE_API_BASE_URL=https://dummyjson.com
VITE_AUTH_STORAGE_KEY=reactauth.session
VITE_PRODUCTS_PAGE_SIZE=12
```

Server-only placeholders (not used by this frontend):

```
JWT_SECRET=replace-with-strong-secret
DATABASE_URL=postgresql://user:password@localhost:5432/app
```

## Usage notes

- The login form accepts email + password and looks up the matching username before calling the auth endpoint.
- Protected routes redirect to the login screen when no token is stored.

## Production build

```
npm run build
```

```
npm run preview
```

## Deployment (Vercel)

- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: mirror the values from `.env.example`

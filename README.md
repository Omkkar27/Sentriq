# sentriq

sentriq is a small authentication app built with Next.js. It provides a clean account flow for signing up, logging in, viewing a profile, and signing out. User records are stored in MongoDB, passwords are hashed with bcrypt, and authenticated sessions are maintained with an HTTP-only JWT cookie.

## Features

- Username, email, and password sign-up
- Password hashing with `bcryptjs`
- JWT-based login sessions
- HTTP-only `token` cookie
- Protected profile routes through Next.js proxy middleware
- MongoDB user storage with Mongoose
- Email verification token generation through Mailtrap SMTP
- Responsive Tailwind CSS interface
- Toast feedback for login, signup, and logout actions

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- MongoDB and Mongoose
- Axios
- JSON Web Tokens
- Nodemailer and Mailtrap

## Requirements

- Node.js 20 or newer
- npm
- A MongoDB database
- A Mailtrap SMTP API token for verification emails

## Getting started

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root. Use your own credentials and keep this file out of version control:

   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
   TOKEN_SECRET=replace-with-a-long-random-secret
   DOMAIN=http://localhost:3000
   MAILTRAP_API_TOKEN=your-mailtrap-api-token
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

```bash
npm run dev      # Start the development server
npm run lint     # Run ESLint
npm run build    # Create a production build
npm run start    # Start the production server
```

## Application routes

| Route | Purpose | Access |
| --- | --- | --- |
| `/` | sentriq landing screen | Authenticated |
| `/login` | Sign in to an existing account | Public |
| `/signup` | Create a new account | Public |
| `/verifyemail` | Email verification screen | Public |
| `/profile` | View the current profile and fetch user details | Authenticated |
| `/profile/[id]` | View a profile identifier | Authenticated |

When a user logs in successfully, the server sets a JWT in the `token` HTTP-only cookie. The proxy redirects unauthenticated users to `/login` and redirects authenticated users away from the public authentication pages.

## API endpoints

### `POST /api/users/signup`

Creates a user and sends a verification email.

```json
{
  "username": "jane",
  "email": "jane@example.com",
  "password": "your-password"
}
```

### `POST /api/users/login`

Checks the credentials and sets the session cookie.

```json
{
  "email": "jane@example.com",
  "password": "your-password"
}
```

### `GET /api/users/me`

Returns the current user without the stored password. A valid `token` cookie is required.

### `GET /api/users/logout`

Expires the current `token` cookie and ends the session.

### `POST /api/users/verifytoken`

Accepts an active verification token and marks the matching user as verified.

```json
{
  "token": "verification-token"
}
```

## Project structure

```text
src/
├── app/
│   ├── api/users/       # Authentication API routes
│   ├── login/           # Login page
│   ├── signup/          # Signup page
│   ├── profile/         # Profile pages
│   ├── verifyemail/     # Email verification page
│   ├── globals.css      # Global styles and Tailwind import
│   ├── layout.tsx       # Root layout and metadata
│   └── page.tsx         # Main sentriq screen
├── dbConfig/            # MongoDB connection
├── helpers/             # Mail and token helpers
├── models/              # Mongoose user model
└── proxy.ts             # Route protection and redirects
```

## Security notes

- Never commit `.env` or expose MongoDB, JWT, or Mailtrap credentials.
- Use a long, unpredictable value for `TOKEN_SECRET` in production.
- Set `DOMAIN` to the deployed HTTPS URL before sending verification emails.
- Configure secure cookie options before deploying to production.
- Restrict MongoDB network access to the environments that need it.

## Production build

Run the production checks locally before deployment:

```bash
npm run lint
npm run build
npm run start
```

The application can be deployed to any Node-compatible host that supports Next.js and has access to the configured MongoDB and Mailtrap services.

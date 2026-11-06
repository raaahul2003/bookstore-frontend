# Bookstore Frontend

A responsive online bookstore frontend built with React and Vite. Users can browse and search for books, view book details, and access account, selling, and purchasing features.

## Related repository

- [Bookstore Backend](https://github.com/raaahul2003/Bookstore-Server)

## Tech stack

- React
- Vite
- React Router
- Tailwind CSS
- Axios

## Getting started

### Prerequisites

- Node.js (LTS recommended)
- npm
- The [Bookstore backend](https://github.com/raaahul2003/Bookstore-Server) running locally or deployed

### Install and run

```bash
git clone https://github.com/raaahul2003/bookstore-frontend.git
cd bookstore-frontend
npm install
npm run dev
```

Open the local URL shown in your terminal.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Backend connection

The frontend currently sends API requests to `http://localhost:3000`. To use a deployed backend, update the API base URL in `src/api/axiosinstance.js`.

Do not put private keys, passwords, or other secrets in frontend code.

## Project structure

```text
src/
├── admin/       # Admin pages and components
├── api/         # Axios configuration and API service
├── components/  # Shared UI components
├── context/     # React context providers
├── hooks/       # Custom React hooks
├── pages/       # Shared pages
├── services/    # API functions
└── user/        # User-facing pages and components
```

## Production build

```bash
npm run build
```

The generated files are placed in the `dist/` folder.

## License

No license has been specified yet.

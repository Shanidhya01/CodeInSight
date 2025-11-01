# CodeInSight

CodeInSight is a full-stack code-review application and developer productivity toolkit. It includes:

- Backend: Express + MongoDB API that generates and stores AI-powered code reviews.
- Frontend: React + Vite single-page app with Firebase auth and an editor UI.
- VS Code Extension: a lightweight extension scaffold that can be used to integrate the reviewer inside VS Code.

This README explains how to run the project locally, what environment variables are required, and where to look when things go wrong.

---

## Repository layout

```
CodeInsight/
├─ Backend/            # Express API (reviews)
├─ Frontend/           # React + Vite frontend
└─ codeinsight/        # VS Code extension source
```

## Features

- Submit source files from the browser to generate AI review comments.
- Store reviews in MongoDB and browse review history.
- VS Code extension scaffold to run or extend editor integration.

## Requirements

- Node.js (16+ recommended)
- npm or pnpm
- MongoDB (local or cloud), connection string
- (Optional) OpenRouter / OpenAI API key for generating real AI reviews
- (Frontend) Firebase project for authentication (optional but recommended)

---

## Local setup — Backend

1. Open a terminal and install dependencies:

```powershell
cd "d:\DEV\PROJECT\CodeInsight\Backend"
npm install
```

2. Create a `.env` file (copy `.env.example` if present) and set these variables:

```text
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.example.mongodb.net/codeinsight
PORT=5000
OPENROUTER_API_KEY=sk-...       # optional - required for real AI reviews
```

3. Start the server in development mode:

```powershell
npm run dev
```

The backend will listen on the `PORT` (default 5000) and expose the reviews API under `/api/review`.

If you want to quickly populate sample data (books/reviews, if provided by the app), check for any `test-*.js` helper scripts in the backend folder and run them with `node`.

---

## Local setup — Frontend

1. Install dependencies and start the dev server:

```powershell
cd "d:\DEV\PROJECT\CodeInsight\Frontend"
npm install
npm run dev
```

2. Create a `.env` file in the `Frontend` folder and set at least:

```text
VITE_API_URL=http://localhost:5000
# Optional Firebase settings if you use authentication
VITE_API_KEY=...
VITE_AUTH_DOMAIN=...
VITE_PROJECT_ID=...
VITE_STORAGE_BUCKET=...
VITE_MESSAGING_SENDER_ID=...
VITE_APP_ID=...
```

3. Open the app in your browser (Vite will print the URL, typically `http://localhost:5173`).

Notes:
- The frontend expects the backend to be running and accessible at `VITE_API_URL`.
- If you see network errors like `ERR_CONNECTION_REFUSED` for `/api/review` or `/api/books`, confirm the backend is running and the `VITE_API_URL` matches the backend origin.

---

## VS Code extension (codeinsight folder)

The `codeinsight/` folder contains a sample VS Code extension scaffold. To run tests or package the extension:

```powershell
cd "d:\DEV\PROJECT\CodeInsight\codeinsight"
npm install
# Run tests (uses vscode-test)
npm test

# To package the extension for publishing you can use `vsce package` (install `vsce` globally)
# vsce package
```

The extension's main entry point is `extension.js` and the package manifest is `package.json` within that folder.

---

## API overview

- POST `/api/review` — submit code for review (body: `{ filename, code, userId?, userEmail? }`)
- GET `/api/review` — list reviews (may accept query params for filtering)
- GET `/api/review/:id` — get a single review
- DELETE `/api/review/:id` — delete a review

Adjust the requests from the frontend in `Frontend/src/utils/api.js` if you change API paths.

---

## Troubleshooting

- Backend 500 on review POST: check `OPENROUTER_API_KEY` and MongoDB connection. If you don't have an AI key, the server may return an error when trying to call the remote API.
- Frontend: `The requested module ... does not provide an export named 'getReviews'`: ensure imports match the exports in `Frontend/src/utils/api.js` (we provide `getReviews` / `getUserReviews` aliases).
- Navbar errors using `useLocation()` outside Router: ensure the React tree in `Frontend/src/main.jsx` wraps the app with `<BrowserRouter>` (it does by default in this repo).
- CORS issues: backend `server.js` may restrict origins; for local dev make sure `http://localhost:5173` (Vite) is allowed in the CORS config.

If you encounter problems, check the browser console and backend logs. The codebase includes helpful console outputs in several places; follow them to pinpoint failures.

---

## Contributing

1. Fork the repo and create a feature branch.
2. Make your changes and add tests where possible.
3. Open a pull request describing your change.

Please follow existing code style (Prettier / ESLint rules are present in some subfolders).

---

## License

This project is open-source under the terms of the LICENSE file in the repository root.

---

If you'd like, I can also generate smaller READMEs inside the `Backend/`, `Frontend/`, and `codeinsight/` folders with step-by-step instructions specific to each subproject. Would you like that?

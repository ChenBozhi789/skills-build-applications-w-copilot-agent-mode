# OctoFit Tracker Frontend

Set `VITE_CODESPACE_NAME` in `.env.local` when running in GitHub Codespaces so the React app can call the forwarded backend API.

```text
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is unset, the app falls back to `http://localhost:8000`.

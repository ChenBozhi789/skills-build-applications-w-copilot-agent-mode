import 'dotenv/config';

const codespaceName = process.env.CODESPACE_NAME;

function buildCodespacesUrl(port: number) {
  if (!codespaceName) {
    return undefined;
  }

  return `https://${codespaceName}-${port}.app.github.dev`;
}

export const config = {
  port: Number(process.env.PORT ?? 8000),
  frontendPort: 5173,
  mongoPort: 27017,
  mongoUri: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db',
  apiBaseUrl: process.env.API_BASE_URL ?? buildCodespacesUrl(8000) ?? 'http://localhost:8000',
  frontendUrl:
    process.env.FRONTEND_URL ?? buildCodespacesUrl(5173) ?? 'http://localhost:5173',
};

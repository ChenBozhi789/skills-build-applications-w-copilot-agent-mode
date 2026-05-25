const codespaceName = process.env.CODESPACE_NAME;
const codespacesDomain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN;

function buildCodespacesUrl(port: number) {
  if (!codespaceName) {
    return undefined;
  }

  const domain = codespacesDomain ?? 'app.github.dev';
  return `https://${codespaceName}-${port}.${domain}`;
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

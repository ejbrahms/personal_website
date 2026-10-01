import { defineConfig } from 'vite';
import { execSync } from 'node:child_process';

const REPO_URL = 'https://github.com/ejbrahms/personal_website';

// Vercel exposes the commit SHA as an env var (and may build without .git);
// locally, fall back to asking git.
function commitSha() {
  const fromEnv = process.env.VERCEL_GIT_COMMIT_SHA;
  if (fromEnv) return fromEnv;
  try {
    return execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return '';
  }
}

// Replaces %COMMIT_SHORT% / %COMMIT_URL% in index.html with the current commit.
function commitVersion() {
  const sha = commitSha();
  const short = sha ? sha.slice(0, 7) : 'dev';
  const url = sha ? `${REPO_URL}/commit/${sha}` : REPO_URL;
  return {
    name: 'commit-version',
    transformIndexHtml: (html) => html.replaceAll('%COMMIT_SHORT%', short).replaceAll('%COMMIT_URL%', url),
  };
}

export default defineConfig({
  plugins: [commitVersion()],
});

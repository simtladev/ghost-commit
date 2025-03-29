import dotenv from "dotenv";

dotenv.config();

export const config = {
  githubToken: process.env.GITHUB_TOKEN,
  githubUsername: process.env.GITHUB_USERNAME,
  repoName: process.env.REPO_NAME || "auto-commit-repo",
  filePath: process.env.FILE_PATH || "commit.txt",
  commitTitle: process.env.TITLE || "Auto Commit",
  commitDescription:
    process.env.DESCRIPTION || "Automated commit from Node.js script",
};

import { Octokit } from "@octokit/rest";
import { config } from "../config/config.js";

const octokit = new Octokit({ auth: config.githubToken });

export const checkRepoExists = async () => {
  try {
    await octokit.repos.get({
      owner: config.githubUsername,
      repo: config.repoName,
    });
    return true;
  } catch (err) {
    if (err.status === 404) return false;
    throw err;
  }
};

export const createRepo = async () => {
  await octokit.repos.createForAuthenticatedUser({
    name: config.repoName,
    description: "Repository created automatically by auto commit script.",
    private: false,
  });
};

export const getFileSha = async () => {
  try {
    const { data } = await octokit.repos.getContent({
      owner: config.githubUsername,
      repo: config.repoName,
      path: config.filePath,
    });
    return data.sha;
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
};

export const commitFile = async (sha) => {
  const content = `Commit made at ${new Date().toString()}\nTitle: ${
    config.commitTitle
  }\nDescription: ${config.commitDescription}`;
  const contentEncoded = Buffer.from(content).toString("base64");

  await octokit.repos.createOrUpdateFileContents({
    owner: config.githubUsername,
    repo: config.repoName,
    path: config.filePath,
    message: `${config.commitTitle} - ${new Date().toISOString()}`,
    content: contentEncoded,
    sha: sha,
  });
};

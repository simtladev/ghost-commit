import {
  checkRepoExists,
  createRepo,
  getFileSha,
  commitFile,
} from "./lib/github.js";

async function main() {
  try {
    const repoExists = await checkRepoExists();

    if (!repoExists) {
      console.log(`Repository does not exist, creating...`);
      await createRepo();
      console.log(`Repository created successfully.`);
    } else {
      console.log(`Repository exists.`);
    }

    const sha = await getFileSha();
    if (sha) {
      console.log(`File exists, will update.`);
    } else {
      console.log(`File does not exist, will create.`);
    }

    await commitFile(sha);
  } catch (error) {
    console.error("Error", error);
  }
}

main();

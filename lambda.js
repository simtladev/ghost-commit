import {
  checkRepoExists,
  createRepo,
  getFileSha,
  commitFile,
} from "./lib/github.js";

export const handler = async (event) => {
  try {
    console.log("Lambda Triggered", JSON.stringify(event, null, 2));

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

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Ghost Commit executed successfully!" }),
    };
  } catch (error) {
    console.error("Error", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error executing Ghost Commit",
        error: error.message,
      }),
    };
  }
};

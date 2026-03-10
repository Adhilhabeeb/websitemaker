import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { randomUUID } from "crypto";
import dotenv from "dotenv";
dotenv.config()
export async function publishToVercel(html) {
  return new Promise((resolve, reject) => {

    const projectId = randomUUID();
    const dir = path.join(process.cwd(), "deployments", projectId);

    fs.mkdirSync(dir, { recursive: true });

    // create index.html
    fs.writeFileSync(path.join(dir, "index.html"), html);
console.log(process.env.VERCEL_TOKEN,"is envvverceltken"
); // should print without quotes
    // run vercel deploy
    exec(
      `cd ${dir} && vercel deploy --prod --yes --token=${process.env.VERCEL_TOKEN}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(stderr);
          return;
        }

        // Vercel CLI prints the deployed URL
        const urlMatch = stdout.match(/https:\/\/[^\s]+/);

        if (urlMatch) {
          resolve(urlMatch[0]);
        } else {
          reject("Deployment URL not found");
        }
      }
    );
  });
}
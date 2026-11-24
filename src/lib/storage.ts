import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { neon } from "@neondatabase/serverless";

type SubmissionType = "quote" | "vendor";

let tableCreation: Promise<void> | undefined;
let missingProductionStorageWarningLogged = false;

export async function saveSubmission(type: SubmissionType, data: unknown): Promise<boolean> {
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl) {
    const sql = neon(databaseUrl);
    if (!tableCreation) {
      tableCreation = sql`
        CREATE TABLE IF NOT EXISTS submissions (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          type text NOT NULL,
          received_at timestamptz NOT NULL DEFAULT now(),
          data jsonb NOT NULL,
          status text NOT NULL DEFAULT 'new'
        )
      `.then(() => undefined).catch((error: unknown) => {
        tableCreation = undefined;
        throw error;
      });
    }
    await tableCreation;
    await sql`
      INSERT INTO submissions (type, data)
      VALUES (${type}, ${JSON.stringify(data)}::jsonb)
    `;
    return true;
  }

  const configuredPath = process.env.CONTACT_SUBMISSIONS_PATH;
  if (configuredPath) {
    if (!path.isAbsolute(configuredPath)) {
      throw new Error("CONTACT_SUBMISSIONS_PATH must be an absolute path");
    }
    await appendJsonLine(path.resolve(configuredPath), type, data);
    return true;
  }

  if (process.env.NODE_ENV !== "production") {
    const developmentPath = path.join(process.cwd(), "data", "submissions.jsonl");
    await appendJsonLine(developmentPath, type, data);
    return true;
  }

  if (!missingProductionStorageWarningLogged) {
    console.warn("No durable submission storage is configured; submissions will rely on team email delivery.");
    missingProductionStorageWarningLogged = true;
  }
  return false;
}

async function appendJsonLine(filePath: string, type: SubmissionType, data: unknown) {
  await mkdir(path.dirname(filePath), { recursive: true });
  // JSONL is suitable for local development or a mounted durable volume; production should use a database.
  await appendFile(filePath, `${JSON.stringify({ type, receivedAt: new Date().toISOString(), data })}\n`, "utf8");
}

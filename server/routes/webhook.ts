import { Router, Request, Response } from "express";
import crypto from "crypto";
import * as db from "../db";

const router = Router();

/**
 * Verify GitHub webhook signature
 * https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks
 */
function verifyGitHubSignature(req: Request): boolean {
  const signature = req.headers["x-hub-signature-256"] as string;
  if (!signature) return false;

  const secret = process.env.GITHUB_WEBHOOK_SECRET || "";
  if (!secret) {
    console.warn("GITHUB_WEBHOOK_SECRET not configured");
    return false;
  }

  const payload = JSON.stringify(req.body);
  const hash = "sha256=" + crypto.createHmac("sha256", secret).update(payload).digest("hex");

  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(signature));
}

/**
 * Parse episode from GitHub push event
 * Expects files in content/episodes/ directory with frontmatter
 */
async function parseEpisodeFromPush(payload: any): Promise<any | null> {
  const commits = payload.commits || [];
  if (commits.length === 0) return null;

  // Look for added or modified files in content/episodes/
  for (const commit of commits) {
    const files = [...(commit.added || []), ...(commit.modified || [])];
    for (const file of files) {
      if (file.startsWith("content/episodes/") && file.endsWith(".md")) {
        // File path format: content/episodes/title-en.md or content/episodes/title-ar.md
        const filename = file.split("/").pop() || "";
        const match = filename.match(/^(.+)-(en|ar)\.md$/);
        if (!match) continue;

        const [, slug, lang] = match;
        return { slug, lang, file };
      }
    }
  }

  return null;
}

/**
 * POST /api/webhooks/github
 * Receives GitHub push events and auto-publishes episodes
 */
router.post("/github", async (req: Request, res: Response) => {
  try {
    // Verify webhook signature
    if (!verifyGitHubSignature(req)) {
      console.warn("Invalid GitHub webhook signature");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const event = req.headers["x-github-event"] as string;
    if (event !== "push") {
      return res.status(200).json({ message: "Event ignored" });
    }

    const episodeInfo = await parseEpisodeFromPush(req.body);
    if (!episodeInfo) {
      return res.status(200).json({ message: "No episode files found" });
    }

    console.log(`Processing episode: ${episodeInfo.slug} (${episodeInfo.lang})`);

    // In production, fetch file content from GitHub API or parse from webhook payload
    // For now, just log the event
    console.log(`Episode ${episodeInfo.slug} ready for publishing`);

    return res.status(200).json({
      success: true,
      message: "Webhook processed successfully",
      episode: episodeInfo.slug,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

import { clerkClient, getAuth } from "@clerk/express";
import type { Request, RequestHandler } from "express";

function configuredAdminEmails(): Set<string> {
  return new Set(
    (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

export async function getRequestUserAccess(req: Request): Promise<{
  userId: string | null;
  emails: string[];
  isAdmin: boolean;
}> {
  const { userId } = getAuth(req);
  if (!userId) {
    return { userId: null, emails: [], isAdmin: false };
  }

  const user = await clerkClient.users.getUser(userId);
  const emails = user.emailAddresses.map(({ emailAddress }) =>
    emailAddress.trim().toLowerCase(),
  );
  const admins = configuredAdminEmails();

  return {
    userId,
    emails,
    isAdmin: emails.some((email) => admins.has(email)),
  };
}

export const requireAdmin: RequestHandler = async (req, res, next) => {
  try {
    const access = await getRequestUserAccess(req);
    if (!access.userId) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }
    if (!access.isAdmin) {
      res.status(403).json({ error: "Store owner access required" });
      return;
    }
    next();
  } catch (error) {
    req.log.error({ err: error }, "Unable to verify store owner access");
    res.status(500).json({ error: "Unable to verify store owner access" });
  }
};
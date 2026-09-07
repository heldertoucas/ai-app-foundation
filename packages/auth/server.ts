import "server-only";

import * as clerkServer from "@clerk/nextjs/server";

export * from "@clerk/nextjs/server";

const mockUser = {
  id: "user_local_dev",
  firstName: "Local",
  lastName: "Developer",
  fullName: "Local Developer",
  imageUrl: "https://avatar.vercel.sh/local",
  emailAddresses: [{ emailAddress: "dev@local.test" }],
};

export const auth = async () => {
  if (!process.env.CLERK_SECRET_KEY) {
    return {
      userId: "user_local_dev",
      orgId: "org_local_dev",
      orgRole: "admin",
      orgSlug: "local-dev",
      sessionClaims: null,
      redirectToSignIn: () => null,
      getToken: async () => "mock-jwt-token",
    } as any;
  }
  return clerkServer.auth();
};

export const currentUser = async () => {
  if (!process.env.CLERK_SECRET_KEY) {
    return mockUser as any;
  }
  return clerkServer.currentUser();
};

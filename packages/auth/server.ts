import "server-only";

import {
  auth as clerkAuth,
  currentUser as clerkCurrentUser,
} from "@clerk/nextjs/server";

export * from "@clerk/nextjs/server";

const mockUser = {
  id: "user_local_dev",
  firstName: "Local",
  lastName: "Developer",
  fullName: "Local Developer",
  imageUrl: "https://avatar.vercel.sh/local",
  emailAddresses: [{ emailAddress: "dev@local.test" }],
};

export const auth = (async () => {
  if (!process.env.CLERK_SECRET_KEY) {
    return Promise.resolve({
      userId: "user_local_dev",
      orgId: "org_local_dev",
      orgRole: "admin",
      orgSlug: "local-dev",
      sessionClaims: null,
      redirectToSignIn: () => null,
      getToken: async () => Promise.resolve("mock-jwt-token"),
    } as unknown as Awaited<ReturnType<typeof clerkAuth>>);
  }
  return await clerkAuth();
}) as unknown as typeof clerkAuth;

export const currentUser = (async () => {
  if (!process.env.CLERK_SECRET_KEY) {
    return Promise.resolve(
      mockUser as unknown as Awaited<ReturnType<typeof clerkCurrentUser>>
    );
  }
  return await clerkCurrentUser();
}) as unknown as typeof clerkCurrentUser;

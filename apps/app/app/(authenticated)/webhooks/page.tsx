import { webhooks } from "@repo/webhooks";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Webhooks",
  description: "Send webhooks to your users.",
};

const WebhooksPage = async () => {
  let response = null;
  try {
    response = await webhooks.getAppPortal();
  } catch (_e) {
    // Svix not configured in local environment
    response = null;
  }

  if (!response?.url) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
        <h2 className="text-xl font-semibold">Webhooks Portal</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-md">
          Webhooks require an active <code>SVIX_TOKEN</code>. In local development, webhooks are disabled by default.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden">
      <iframe
        allow="clipboard-write"
        className="h-full w-full border-none"
        loading="lazy"
        src={response.url}
        title="Webhooks"
      />
    </div>
  );
};

export default WebhooksPage;

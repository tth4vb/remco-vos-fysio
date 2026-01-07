import { createClient, SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id").trim();
export const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || "production").trim();
export const apiVersion = (process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01").trim();

// Lazy client initialization to avoid build-time issues
let _client: SanityClient | null = null;

function getClient(): SanityClient {
  if (_client) {
    return _client;
  }

  // Only create client if projectId looks valid (trim to handle env vars with newlines)
  const pid = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "").trim();
  if (!pid || pid === "your-project-id" || !/^[a-z0-9-]+$/.test(pid)) {
    throw new Error("Invalid or missing Sanity project ID");
  }

  _client = createClient({
    projectId: pid,
    dataset: (process.env.NEXT_PUBLIC_SANITY_DATASET || "production").trim(),
    apiVersion,
    useCdn: false, // Disabled for immediate content updates
  });

  return _client;
}

// Export a proxy that lazily creates the client
export const client = {
  fetch: async <T>(query: string, params: Record<string, unknown> = {}): Promise<T> => {
    const sanityClient = getClient();
    return sanityClient.fetch<T>(query, params);
  },
};

// Image URL builder - also lazy
let _builder: ReturnType<typeof imageUrlBuilder> | null = null;

export function urlFor(source: SanityImageSource) {
  if (!_builder) {
    _builder = imageUrlBuilder(getClient());
  }
  return _builder.image(source);
}

// Type-safe query helper
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<T> {
  const sanityClient = getClient();
  return sanityClient.fetch<T>(query, params, {
    next: {
      revalidate: 10, // Revalidate every 10 seconds for faster updates
      tags,
    },
  });
}

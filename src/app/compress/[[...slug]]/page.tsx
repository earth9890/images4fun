import { CompressPageClient } from "./compress-page-client";

export function generateStaticParams() {
  return [{ slug: [] }, { slug: ["compare"] }];
}

export default async function CompressPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const showCompare = slug?.[0] === "compare";

  return <CompressPageClient initialCompare={showCompare} />;
}

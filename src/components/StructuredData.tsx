import { siteUrl } from "@/lib/site";
import type { Service } from "@/data/services";

export type BreadcrumbItem = {
  name: string;
  pathname: string;
};

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const serialized = JSON.stringify(data).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialized }} />;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: new URL(item.pathname, siteUrl).toString(),
        })),
      }}
    />
  );
}

export function ServiceListJsonLd({ services }: { services: Service[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Electrical services",
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            url: new URL(`/services#${service.slug}`, siteUrl).toString(),
          },
        })),
      }}
    />
  );
}

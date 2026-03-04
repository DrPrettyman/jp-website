const siteTitle = 'Joshua Prettyman'

export function generateMeta({ title, description, path, type = 'website' }) {
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const url = path ? `https://joshua.prettyman.me${path}` : 'https://joshua.prettyman.me'

  return [
    { title: fullTitle },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:type", content: type },
    { property: "og:site_name", content: siteTitle },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
  ]
}

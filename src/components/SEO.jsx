import { Helmet } from 'react-helmet-async'

const SEO = ({
  title,
  description,
  path,
  type = 'website',
}) => {
  const siteTitle = 'Joshua Prettyman'
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const url = path ? `https://joshua.prettyman.me${path}` : 'https://joshua.prettyman.me'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}

export default SEO

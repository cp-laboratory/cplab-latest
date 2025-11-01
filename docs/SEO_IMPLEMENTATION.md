# SEO Implementation for CPLab

## Overview
This document describes the SEO implementation for the CPLab website using Payload CMS SEO plugin and Next.js 15.

## What Was Implemented

### 1. ✅ Payload CMS SEO Plugin
Installed and configured `@payloadcms/plugin-seo` which provides:
- SEO meta fields (title, description, image) for content
- Auto-generation functions for metadata
- Visual preview of search engine results
- Character counters for optimal meta length
- Real-time preview updates

### 2. ✅ New Collections with SEO Support

#### News Collection (`/collections/News.ts`)
- **Fields**: title, slug, excerpt, content, featuredImage, author, publishedDate, status
- **Access Control**: Public read, only professors can create/edit/delete
- **SEO Enabled**: Yes (via plugin)
- **Purpose**: News articles and lab updates

#### Publications Collection (`/collections/Publications.ts`)
- **Fields**: title, slug, abstract, authors, journal, year, DOI, pdfUrl, externalUrl, featuredImage, citations
- **Access Control**: Public read, only professors can create/edit/delete
- **SEO Enabled**: Yes (via plugin)
- **Purpose**: Research publications and papers

### 3. ✅ Dynamic XML Sitemap (`/app/sitemap.ts`)
Automatically generates sitemap.xml with:
- All static pages (home, team, publications, news, contact)
- All published news articles
- All publications
- Proper lastModified dates
- Priority and changeFrequency hints for search engines

**Access at**: `http://localhost:3000/sitemap.xml`

### 4. ✅ Robots.txt (`/app/robots.ts`)
Automatically generates robots.txt with:
- Allows all search engines to crawl public pages
- Blocks crawling of `/admin/` and `/api/` routes
- References sitemap location

**Access at**: `http://localhost:3000/robots.txt`

### 5. ✅ Utility Functions
- **`getServerSideURL()`** (`/lib/utilities/getURL.ts`): Smart URL detection for development, Vercel, and production

## SEO Plugin Configuration

### Collections with SEO
- `news` - News articles
- `publications` - Research publications

### Auto-Generation Functions

#### Title Generation
```typescript
generateTitle: ({ doc }) => `CPLab - ${doc?.title || 'Untitled'}`
```
Automatically appends "CPLab" to page titles.

#### Description Generation
```typescript
generateDescription: ({ doc }) => doc?.excerpt || doc?.abstract || ''
```
Uses excerpt for news, abstract for publications.

#### URL Generation
```typescript
generateURL: ({ doc, collectionSlug }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  return `${baseUrl}/${collectionSlug}/${doc?.slug}`
}
```
Generates proper URLs for preview.

## How to Use

### Creating SEO-Optimized Content

#### For News Articles:
1. Go to `/admin` → News → Create New
2. Fill in required fields (title, slug, excerpt, content)
3. Scroll to the **SEO** tab (added by plugin)
4. Click **Auto-generate** to populate meta fields
5. Review and customize:
   - **Meta Title**: Defaults to "CPLab - [Article Title]"
   - **Meta Description**: Defaults to excerpt
   - **Meta Image**: Upload or select featured image
6. See live preview of Google search result
7. Publish when ready

#### For Publications:
1. Go to `/admin` → Publications → Create New
2. Fill in required fields (title, slug, abstract, authors, journal, year)
3. Scroll to the **SEO** tab
4. Click **Auto-generate** to populate meta fields
5. Review and customize:
   - **Meta Title**: Defaults to "CPLab - [Publication Title]"
   - **Meta Description**: Defaults to abstract
   - **Meta Image**: Upload graphical abstract or cover
6. See live preview of Google search result
7. Save when ready

### Meta Field Guidelines

#### Title
- **Length**: 50-60 characters (shown in green/yellow/red)
- **Best Practice**: Include primary keyword near the beginning
- **Example**: "CPLab - Novel Machine Learning Approach for Data Analysis"

#### Description
- **Length**: 150-160 characters (shown in green/yellow/red)
- **Best Practice**: Compelling summary with call-to-action
- **Example**: "Discover our latest research on machine learning algorithms for complex data analysis. Published in Nature Machine Intelligence 2025."

#### Image
- **Recommended Size**: 1200x630 pixels
- **Format**: JPG or PNG
- **Best Practice**: Use high-quality images with clear visuals

## Sitemap Details

### Static Pages
All main pages are included with appropriate priorities:
- Home `/` - Priority: 1.0, Updates: Weekly
- Team `/team` - Priority: 0.8, Updates: Monthly
- Publications `/publications` - Priority: 0.9, Updates: Weekly
- News `/news` - Priority: 0.9, Updates: Daily
- Contact `/contact` - Priority: 0.7, Updates: Yearly

### Dynamic Pages
- News articles: `/news/[slug]` - Priority: 0.7, Updates: Monthly
- Publications: `/publications/[slug]` - Priority: 0.8, Updates: Yearly

### Sitemap Features
- ✅ Automatically updates when content changes
- ✅ Only includes published news (draft articles excluded)
- ✅ Includes proper lastModified dates from Payload
- ✅ Includes changeFrequency hints for search engines
- ✅ Includes priority values to guide crawlers

## Robots.txt Configuration

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: http://localhost:3000/sitemap.xml
```

### What This Means
- ✅ All search engines can crawl the site
- ✅ Public pages are crawlable
- ❌ Admin panel is blocked from indexing
- ❌ API routes are blocked from indexing
- 📍 Sitemap location is advertised

## Testing Your SEO

### 1. Test Sitemap
Visit: `http://localhost:3000/sitemap.xml`

You should see XML with all your pages listed.

### 2. Test Robots.txt
Visit: `http://localhost:3000/robots.txt`

You should see the robots configuration.

### 3. Test Meta Tags
1. Create a news article with SEO metadata
2. View the page source on the front-end
3. Look for `<meta>` tags in the `<head>` section

### 4. Google Search Console
1. Deploy your site to production
2. Add your site to [Google Search Console](https://search.google.com/search-console)
3. Submit your sitemap: `https://yourdomain.com/sitemap.xml`
4. Monitor crawl status and search performance

### 5. SEO Tools
Test your pages with:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Front-End Implementation

To use the SEO metadata on your front-end pages, you'll need to fetch it from Payload and inject it into your page's `<head>`.

### Example: News Article Page

```typescript
// app/news/[slug]/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'
import { Metadata } from 'next'

export async function generateMetadata({ params }): Promise<Metadata> {
  const payload = await getPayload({ config })
  
  const article = await payload.find({
    collection: 'news',
    where: {
      slug: {
        equals: params.slug,
      },
    },
  })
  
  const item = article.docs[0]
  
  if (!item) {
    return {
      title: 'Article Not Found',
    }
  }
  
  return {
    title: item.meta?.title || item.title,
    description: item.meta?.description || item.excerpt,
    openGraph: {
      title: item.meta?.title || item.title,
      description: item.meta?.description || item.excerpt,
      images: item.meta?.image ? [item.meta.image.url] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: item.meta?.title || item.title,
      description: item.meta?.description || item.excerpt,
      images: item.meta?.image ? [item.meta.image.url] : [],
    },
  }
}

export default async function NewsArticle({ params }) {
  // Your page component
}
```

## Environment Variables

Make sure these are set in your `.env`:

```bash
NEXT_PUBLIC_SERVER_URL=http://localhost:3000  # Development
# or
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com  # Production
```

## Production Deployment

### Before Deploying:
1. ✅ Update `NEXT_PUBLIC_SERVER_URL` to your production domain
2. ✅ Test sitemap.xml and robots.txt locally
3. ✅ Create sample news and publications with SEO metadata
4. ✅ Test meta tags are rendering correctly

### After Deploying:
1. Submit sitemap to Google Search Console
2. Submit sitemap to Bing Webmaster Tools
3. Test with Google Rich Results
4. Monitor crawl errors
5. Set up Google Analytics (optional)

## Additional SEO Enhancements

### Consider Adding:
1. **Schema.org Markup**: Add structured data for articles, organizations
2. **Open Graph Tags**: Already supported via Next.js Metadata API
3. **Twitter Cards**: Already supported via Next.js Metadata API
4. **Canonical URLs**: Prevent duplicate content issues
5. **Breadcrumbs**: Improve navigation and SEO
6. **Image Alt Tags**: Already required in media collection
7. **Page Speed Optimization**: Use Next.js Image component
8. **Mobile Responsiveness**: Already handled by your Tailwind setup

### Plugin Extensions
You can add custom fields to the SEO meta group:

```typescript
seoPlugin({
  fields: ({ defaultFields }) => [
    ...defaultFields,
    {
      name: 'keywords',
      type: 'text',
      admin: {
        description: 'Comma-separated keywords',
      },
    },
    {
      name: 'ogType',
      type: 'select',
      options: [
        { label: 'Article', value: 'article' },
        { label: 'Website', value: 'website' },
      ],
    },
  ],
})
```

## Troubleshooting

### Sitemap not generating?
- Check that collections have documents with slugs
- Verify `NEXT_PUBLIC_SERVER_URL` is set
- Check server logs for errors

### Robots.txt not working?
- Ensure no other robots.txt exists in `public/`
- Clear browser cache
- Verify in production (some features may not work in dev)

### SEO fields not showing?
- Verify plugin is in `plugins` array
- Check collection slug is in `collections` array
- Restart dev server after config changes

### Auto-generate not working?
- Verify `generateTitle`, `generateDescription` functions are defined
- Check that `doc` has required fields (title, excerpt, abstract)
- Look for console errors

## Files Modified/Created

### New Files:
- ✅ `/collections/News.ts` - News collection
- ✅ `/collections/Publications.ts` - Publications collection
- ✅ `/app/sitemap.ts` - Dynamic sitemap generator
- ✅ `/app/robots.ts` - Robots.txt generator
- ✅ `/lib/utilities/getURL.ts` - URL utility function
- ✅ `/SEO_IMPLEMENTATION.md` - This documentation

### Modified Files:
- ✅ `/payload.config.ts` - Added SEO plugin and new collections
- ✅ `package.json` - Added `@payloadcms/plugin-seo` dependency

## Resources

- [Payload SEO Plugin Docs](https://payloadcms.com/docs/plugins/seo)
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js Sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org](https://schema.org/)

## Next Steps

1. ✅ Create sample news articles and publications
2. ✅ Add SEO metadata to each piece of content
3. ✅ Test sitemap.xml and robots.txt
4. 📝 Implement front-end meta tag rendering
5. 📝 Add Open Graph and Twitter Card support
6. 📝 Submit sitemap to search engines after deployment
7. 📝 Set up Google Analytics
8. 📝 Monitor search performance

---

Your CPLab website is now SEO-ready! 🚀

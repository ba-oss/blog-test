import type { MetadataRoute } from 'next'
import { client } from '~/sanity/lib/client'
import { POSTS_QUERY } from '~/sanity/lib/queries'
import { POSTS_QUERYResult } from '~/sanity/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch<POSTS_QUERYResult>(POSTS_QUERY)

  return [
    {
      url: 'https://sanity-nextjs-blogs.vercel.app/',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...posts.map((post) => {
      return {
        url: `https://sanity-nextjs-blogs.vercel.app/posts/${post.slug?.current}`,
        lastModified: post._createdAt,
        changeFrequency: 'monthly' as const,
        priority: 1,
      }
    }),
  ]
}

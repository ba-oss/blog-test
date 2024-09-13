import Image from 'next/image'
import Link from 'next/link'
import { client } from '~/sanity/lib/client'
import { POSTS_QUERY } from '~/sanity/lib/queries'
import { POSTS_QUERYResult } from '~/sanity/types'

export default async function Example() {
  const posts = await client.fetch<POSTS_QUERYResult>(POSTS_QUERY)

  return (
    <div className="bg-white">
      <div className="">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Dive into Vercel product updates, company news, and educational
            content on how developers and startups can leverage the cloud.
          </p>
          <div className="mt-10 divide-y border-t border-gray-200 sm:mt-16">
            {posts.map((post) => (
              <article
                key={post._id}
                className="relative isolate flex flex-col gap-8 py-8 sm:py-12 lg:flex-row"
              >
                {post.mainImage && (
                  <Link
                    href={`/posts/${post.slug?.current}`}
                    className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-56 lg:shrink-0"
                  >
                    <Image
                      width={600}
                      height={400}
                      alt=""
                      src={post.mainImage}
                      className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </Link>
                )}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post._createdAt} className="text-gray-500">
                      {new Intl.DateTimeFormat('en', {
                        dateStyle: 'medium',
                      }).format(new Date(post._createdAt))}
                    </time>
                  </div>
                  <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <Link href={`/posts/${post.slug?.current}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                  </div>
                  <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                    <div className="relative flex items-center gap-x-4">
                      <Image
                        width={48}
                        height={48}
                        alt=""
                        src={post.author?.image ?? ''}
                        className="rounded-full bg-gray-50"
                      />
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <span>
                            <span className="absolute inset-0" />
                            {post.author?.name}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
// revalidate posts list each hour
export const revalidate = 3600

export async function generateMetadata() {
  const meta = {
    title: 'Blog',
    description:
      'Dive into Vercel product updates, company news, and educational content on how developers and startups can leverage the cloud.',
  }
  return {
    ...meta,
    openGraph: meta,
  }
}

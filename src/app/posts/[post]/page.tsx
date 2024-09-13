import { ArrowLeftIcon } from '@sanity/icons'
import { PortableText } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '~/sanity/lib/client'
import { POST_QUERY, POSTS_QUERY } from '~/sanity/lib/queries'
import { POST_QUERYResult, POSTS_QUERYResult } from '~/sanity/types'

export async function generateStaticParams() {
  const posts = await client.fetch<POSTS_QUERYResult>(POSTS_QUERY)

  return posts.map((post) => ({
    slug: post.slug?.current,
  }))
}

export default async function Page({ params }: { params: { post: string } }) {
  const post = await client.fetch<POST_QUERYResult>(POST_QUERY, {
    slug: params.post,
  })

  if (!post || !post.body) notFound()

  return (
    <article className="prose mx-auto max-w-5xl">
      <div className="">
        <Link
          href="/"
          className="inline-flex items-center gap-3 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 no-underline shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
          Back to home
        </Link>
      </div>
      <header className="mt-8 flex flex-col">
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {post.title}
        </h1>
        <time
          dateTime="2022-09-05"
          className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
          <span className="ml-3">
            {new Intl.DateTimeFormat('en', { dateStyle: 'full' }).format(
              new Date(post._createdAt),
            )}
          </span>
        </time>
      </header>
      <aside className="w-full">
        {post.mainImage && (
          <Image
            alt={post.title ?? ''}
            className="w-full rounded-xl"
            src={post.mainImage}
            width={1024}
            height={600}
            quality={100}
          />
        )}
      </aside>
      <PortableText value={post.body} />
    </article>
  )
}

// revalidate post details each day
export const revalidate =24 *  3600 

export async function generateMetadata({
  params,
}: {
  params: { post: string }
}) {
  const post = await client.fetch<POST_QUERYResult>(POST_QUERY, {
    slug: params.post,
  })

  return {
    title: post?.title,

    openGraph: {
      title: post?.title,
      images: [post?.mainImage],
    },
  }
}

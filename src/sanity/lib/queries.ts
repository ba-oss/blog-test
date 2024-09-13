import { defineQuery } from 'next-sanity'

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug, _createdAt, body, 
	"author": author->{
    name,
    slug,
    "image": image.asset->url
  },
	"mainImage": mainImage.asset->url
}`)

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id, title, slug, _createdAt, body, 
	"author": author->{
    name,
    slug,
    "image": image.asset->url
  },
	"mainImage": mainImage.asset->url
}`)

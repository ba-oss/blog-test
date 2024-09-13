import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!

export default defineConfig({
  projectId,
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: schema.types,
  },
})

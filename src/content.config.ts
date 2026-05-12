import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      order: z.number().optional(),
      image: image().optional(),
      tags: z.array(z.string()).optional(),
      authors: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
      sources: z.array(z.object({
        title: z.string(),
        url: z.string().url().optional(),
        citation: z.string().optional(),
      })).optional(),
      // AI-First Semantic Metadata
      semanticTags: z.array(z.string()).optional(),
      keywords: z.array(z.string()).optional(),
      concepts: z.array(z.string()).optional(),
      entities: z.array(z.object({
        type: z.string(),
        name: z.string(),
        description: z.string().optional(),
        url: z.string().optional(),
      })).optional(),
      summary: z.string().optional(),
      mainArguments: z.array(z.string()).optional(),
      assumptions: z.array(z.string()).optional(),
      implications: z.array(z.string()).optional(),
      retrievalTags: z.array(z.string()).optional(),
      
      // Semantic Knowledge Graph Integration
      canonicalTopics: z.array(z.string()).optional(),
      relatedConcepts: z.array(z.string()).optional(),
      researchDomains: z.array(z.string()).optional(),
      relatedArticles: z.array(z.object({
        articleId: z.string(),
        relationship: z.string(),
        reason: z.string(),
      })).optional(),
      forecastContinuations: z.array(z.object({
        topic: z.string(),
        rationale: z.string(),
      })).optional(),
    }),
})

const authors = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    pronouns: z.string().optional(),
    avatar: z.string().url().or(z.string().startsWith('/')),
    bio: z.string().optional(),
    mail: z.string().email().optional(),
    website: z.string().url().optional(),
    twitter: z.string().url().optional(),
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    discord: z.string().url().optional(),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      image: image(),
      link: z.string().url(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
    }),
})

const about = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/about' }),
  schema: z.object({
    title: z.string(),
  }),
})

const home = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/home' }),
  schema: z.object({
    title: z.string(),
  }),
})

export const collections = { blog, authors, projects, about, home }

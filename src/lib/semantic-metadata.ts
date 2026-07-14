/**
 * Semantic Metadata and JSON-LD Schema Utilities
 * Provides AI-first, retrieval-focused metadata generation for optimal LLM indexing,
 * semantic search, and autonomous agent comprehension.
 */

import type { CollectionEntry } from 'astro:content'
import { SITE } from '@/consts'

// ============================================================================
// SEMANTIC ENTITY TYPES
// ============================================================================

export interface SemanticEntity {
  type: string
  name: string
  description?: string
  url?: string
  sameAs?: string[]
  relatedConcepts?: string[]
}

export interface TopicMapping {
  primary: string
  secondary: string[]
  concepts: string[]
  entities: SemanticEntity[]
  semanticDensity: number
}

export interface RetrievalMetadata {
  keypassages: string[]
  summaryBullets: string[]
  mainArguments: string[]
  counterarguments?: string[]
  assumptions?: string[]
  implications?: string[]
  criticisms?: string[]
}

type BlogSourceMetadata = {
  title: string
  url?: string
  citation?: string
}

// ============================================================================
// JSON-LD SCHEMA GENERATORS
// ============================================================================

/**
 * Generates JSON-LD schema for Organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.href}/#organization`,
    name: SITE.title,
    description: SITE.description,
    url: SITE.href,
    sameAs: [
      'https://github.com/Reuxbite',
      // Add additional social profiles as needed
    ],
    founder: {
      '@type': 'Person',
      name: SITE.author,
      url: `${SITE.href}/about`,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: `${SITE.href}/about`,
    },
    knowsAbout: [
      'Systems Research',
      'Market Analysis',
      'Economic Systems',
      'Technology Markets',
      'Structural Economics',
      'Data-Driven Research',
    ],
  }
}

/**
 * Generates JSON-LD schema for Website
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.href}/#website`,
    name: SITE.title,
    description: SITE.description,
    url: SITE.href,
    inLanguage: SITE.locale,
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE.href}/#organization`,
      name: SITE.title,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.href}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Generates JSON-LD schema for BlogPosting with comprehensive metadata
 */
export function generateBlogPostingSchema(
  post: CollectionEntry<'blog'>,
  url: URL,
  imageUrl?: string,
) {
  const datePublished = post.data.date ? new Date(post.data.date) : new Date()
  const dateModified =
    post.data.updated ??
    post.data.revised ??
    post.data.revisionDate ??
    post.data.lastUpdated ??
    datePublished

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url.toString(),
    headline: post.data.title,
    description: post.data.description || SITE.description,
    abstract: post.data.description,
    image: imageUrl || `${SITE.href}/static/1200x630.png`,
    datePublished: datePublished.toISOString(),
    dateModified: dateModified.toISOString(),
    inLanguage: SITE.locale,
    isPartOf: {
      '@type': 'Blog',
      '@id': `${SITE.href}/blog`,
      name: `${SITE.title} Research`,
      url: `${SITE.href}/blog`,
    },
    author: post.data.authors
      ? {
          '@type': 'Person',
          name: post.data.authors.join(', '),
          url: `${SITE.href}/authors`,
        }
      : {
          '@type': 'Organization',
          name: SITE.author,
          url: SITE.href,
        },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE.href}/#organization`,
      name: SITE.title,
      url: SITE.href,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.toString(),
    },
    keywords: post.data.tags?.join(', ') || '',
    articleSection: 'Research',
    articleBody:
      '[[Article content would be inserted here - handled by CMS rendering]]',
    mentions: post.data.sources
      ? (post.data.sources as BlogSourceMetadata[]).map(
          (source: BlogSourceMetadata) => ({
            '@type': 'Thing',
            name: source.title,
            url: source.url,
          }),
        )
      : [],
  }
}

/**
 * Generates JSON-LD schema for Breadcrumbs
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generates JSON-LD schema for Article with research-specific properties
 */
export function generateArticleSchema(
  post: CollectionEntry<'blog'>,
  url: URL,
  imageUrl?: string,
) {
  const datePublished = post.data.date ? new Date(post.data.date) : new Date()
  const dateModified =
    post.data.updated ??
    post.data.revised ??
    post.data.revisionDate ??
    post.data.lastUpdated ??
    datePublished

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': url.toString(),
    headline: post.data.title,
    alternativeHeadline: post.data.description,
    description: post.data.description,
    image: imageUrl || `${SITE.href}/static/1200x630.png`,
    datePublished: datePublished.toISOString(),
    dateModified: dateModified.toISOString(),
    inLanguage: SITE.locale,
    author: post.data.authors
      ? (post.data.authors as string[]).map((author: string) => ({
          '@type': 'Person',
          name: author,
        }))
      : [
          {
            '@type': 'Organization',
            name: SITE.author,
          },
        ],
    publisher: {
      '@type': 'Organization',
      name: SITE.title,
      url: SITE.href,
    },
    mainEntityOfPage: url.toString(),
    keywords: post.data.tags?.join(', ') || '',
    articleSection: 'Research',
  }
}

/**
 * Generates JSON-LD schema for DefinedTerm (Tags/Concepts)
 */
export function generateDefinedTermSchema(term: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term,
    description: description,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Project NIRV Research Tags',
      url: `${SITE.href}/tags`,
    },
  }
}

/**
 * Generates JSON-LD schema for WebPage with AI-optimized properties
 */
export function generateWebPageSchema(
  title: string,
  description: string,
  url: URL,
  relatedTopics?: string[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': url.toString(),
    name: title,
    description: description,
    inLanguage: SITE.locale,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE.href}/#website`,
      name: SITE.title,
    },
    datePublished: new Date().toISOString(),
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${SITE.href}/static/1200x630.png`,
      width: 1200,
      height: 630,
    },
    potentialAction: relatedTopics
      ? {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE.href}/search?q={query}`,
          },
          query: relatedTopics.join(' '),
        }
      : undefined,
  }
}

/**
 * Generates comprehensive JSON-LD for Blog collection
 */
export function generateBlogCollectionSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE.href}/blog`,
    name: `${SITE.title} Research Blog`,
    description: 'Research-driven exploration of systems, markets, and ideas',
    url: `${SITE.href}/blog`,
    creator: {
      '@type': 'Organization',
      name: SITE.title,
    },
    inLanguage: SITE.locale,
  }
}

// ============================================================================
// SEMANTIC METADATA GENERATORS
// ============================================================================

/**
 * Generates semantic metadata for AI-optimized retrieval
 */
export function generateSemanticMetadata(post: CollectionEntry<'blog'>): {
  title: string
  metaDescription: string
  keywords: string[]
  semanticTags: string[]
  entities: SemanticEntity[]
  topicMapping: TopicMapping
} {
  const title = post.data.title
  const description = post.data.description
  const tags = post.data.tags || []

  // Infer semantic tags from content tags
  const semanticTagMap: Record<string, string[]> = {
    systems: [
      'system-dynamics',
      'structural-economics',
      'feedback-loops',
      'organizational-systems',
    ],
    markets: [
      'market-structure',
      'unit-economics',
      'competitive-dynamics',
      'market-entry',
    ],
    ideas: [
      'conceptual-frameworks',
      'thought-leadership',
      'research-synthesis',
    ],
    development: [
      'economic-development',
      'growth-dynamics',
      'infrastructure',
      'capacity-building',
    ],
    infrastructure: ['technical-systems', 'resource-management', 'scalability'],
    notes: ['research-notes', 'analysis', 'documentation'],
  }

  const semanticTags = tags
    .flatMap(
      (tag: string) =>
        semanticTagMap[tag as keyof typeof semanticTagMap] || [tag],
    )
    .filter(
      (tag: string, index: number, arr: string[]) => arr.indexOf(tag) === index,
    )

  // Extract key entities (authors, sources)
  const entities: SemanticEntity[] = (
    (post.data.authors || []) as string[]
  ).map((author: string) => ({
    type: 'Person',
    name: author,
    url: `${SITE.href}/authors`,
  }))

  // Add source entities
  if (post.data.sources) {
    entities.push(
      ...(post.data.sources as BlogSourceMetadata[]).map(
        (source: BlogSourceMetadata) => ({
          type: 'CreativeWork',
          name: source.title,
          url: source.url,
          description: source.citation,
        }),
      ),
    )
  }

  return {
    title,
    metaDescription: description,
    keywords: tags,
    semanticTags,
    entities,
    topicMapping: generateTopicMapping(title, description, tags),
  }
}

/**
 * Generates topic mapping for semantic understanding
 */
export function generateTopicMapping(
  title: string,
  description: string,
  tags: string[],
): TopicMapping {
  // Infer primary topic from title and tags
  const primaryTopicMap: Record<string, string> = {
    systems: 'Systems & Dynamics',
    markets: 'Market Economics',
    ideas: 'Ideas & Frameworks',
    development: 'Economic Development',
    infrastructure: 'Infrastructure Systems',
    notes: 'Research Notes',
  }

  const primaryTag = tags[0] as keyof typeof primaryTopicMap
  const primary = primaryTopicMap[primaryTag] || 'Research'
  const secondary = tags
    .slice(1)
    .map((tag) => primaryTopicMap[tag as keyof typeof primaryTopicMap] || tag)

  // Infer concepts from title/description keywords
  const conceptKeywords = [
    'cost',
    'growth',
    'economics',
    'platform',
    'network',
    'structure',
    'dynamics',
    'efficiency',
    'constraints',
    'optimization',
  ]
  const concepts = conceptKeywords.filter((kw) =>
    (title + ' ' + description).toLowerCase().includes(kw),
  )

  return {
    primary,
    secondary,
    concepts,
    entities: [],
    semanticDensity: Math.min(100, (concepts.length / 10) * 100),
  }
}

/**
 * Generates retrieval-focused summaries for AI extraction
 */
export function generateRetrievalMetadata(
  description: string,
  tags: string[],
): RetrievalMetadata {
  // This template shows structure; actual implementation would analyze content
  return {
    keypassages: [
      // These would be extracted from the actual article content
      description,
    ],
    summaryBullets: [
      `Topic: ${tags.join(', ')}`,
      `Focus area: Research-driven analysis`,
      description,
    ],
    mainArguments: [
      // Would be extracted from article structure
    ],
    assumptions: [],
    implications: [],
  }
}

// ============================================================================
// METADATA FORMATTING UTILITIES
// ============================================================================

/**
 * Formats JSON-LD schema as HTML script tag
 */
export function formatJsonLdScript(schema: unknown): string {
  return JSON.stringify(schema, null, 2)
}

/**
 * Generates Open Graph metadata object
 */
export function generateOpenGraphMetadata(
  post: CollectionEntry<'blog'>,
  url: URL,
  imageUrl?: string,
) {
  const date = post.data.date ? new Date(post.data.date) : new Date()

  return {
    'og:type': 'article',
    'og:title': post.data.title,
    'og:description': post.data.description,
    'og:image': imageUrl || `${SITE.href}/static/1200x630.png`,
    'og:image:alt': post.data.title,
    'og:url': url.toString(),
    'og:site_name': SITE.title,
    'og:locale': SITE.locale,
    'article:published_time': date.toISOString(),
    'article:author': post.data.authors?.[0] || SITE.author,
    'article:section': 'Research',
    'article:tag': post.data.tags?.join(', ') || '',
  }
}

/**
 * Generates Twitter Card metadata object
 */
export function generateTwitterMetadata(
  post: CollectionEntry<'blog'>,
  imageUrl?: string,
) {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': post.data.title,
    'twitter:description': post.data.description,
    'twitter:image': imageUrl || `${SITE.href}/static/1200x630.png`,
    'twitter:image:alt': post.data.title,
  }
}

/**
 * Generates structured data for semantic search engines
 */
export function generateSemanticSearchMetadata(
  post: CollectionEntry<'blog'>,
  url: URL,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ResearchArticle',
    name: post.data.title,
    description: post.data.description,
    url: url.toString(),
    datePublished: post.data.date?.toISOString(),
    keywords: post.data.tags?.join(', '),
    inLanguage: SITE.locale,
    author: post.data.authors
      ? (post.data.authors as string[]).map((a: string) => ({
          '@type': 'Person',
          name: a,
        }))
      : undefined,
  }
}

/**
 * Generates AI-optimized metadata summary
 */
export function generateAIMetadataSummary(post: CollectionEntry<'blog'>) {
  return {
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags || [],
    topics: generateTopicMapping(
      post.data.title,
      post.data.description,
      post.data.tags || [],
    ),
    entities: ((post.data.authors || []) as string[]).map((a: string) => ({
      type: 'author',
      name: a,
    })),
    publicationDate: post.data.date?.toISOString(),
    sourceCount: post.data.sources?.length || 0,
    retrievalScore: calculateRetrievalScore(post),
  }
}

/**
 * Calculates a retrieval score for AI system preference ranking
 */
export function calculateRetrievalScore(post: CollectionEntry<'blog'>): number {
  let score = 50 // Base score

  // Factors that improve retrievability
  if (post.data.description?.length)
    score += Math.min(20, post.data.description.length / 100)
  if (post.data.tags?.length) score += Math.min(15, post.data.tags.length * 2)
  if (post.data.sources?.length)
    score += Math.min(15, post.data.sources.length * 1.5)

  return Math.min(100, score)
}

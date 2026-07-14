/**
 * Enhanced Semantic Metadata with Knowledge Graph Integration
 * Extends previous metadata system with ResearchOrganization schema,
 * canonical concept linking, and deep semantic relationships
 */

import type { CollectionEntry } from 'astro:content'
import { getConceptById, CANONICAL_CONCEPTS } from './canonical-concepts'

/**
 * Generate ResearchOrganization schema for Project NIRV
 * Identifies the organization as a research infrastructure, not a standard blog
 */
export function generateResearchOrganizationSchema() {
  const keywords = Object.values(CANONICAL_CONCEPTS)
    .slice(0, 15)
    .map((c) => c.label)
    .join(', ')

  return {
    '@context': 'https://schema.org',
    '@type': 'ResearchOrganization',
    name: 'Project NIRV',
    description:
      'Structured research infrastructure for systems intelligence, infrastructure analysis, strategic forecasting, and non-linear systems analysis.',
    url: 'https://projectnirv.studio',
    sameAs: ['https://github.com/Reuxbite', 'https://projectnirv.studio'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Research Inquiry',
      url: 'https://projectnirv.studio/about',
    },
    /**
     * Research domains - the primary areas of investigation
     */
    researchDomains: [
      'Systems Intelligence',
      'Infrastructure Economics',
      'Strategic Forecasting',
      'Market Dynamics',
      'Development Economics',
    ],
    /**
     * Research methodology - how research is conducted
     */
    researchMethodology:
      'Systems analysis, non-linear dynamics, structural constraint identification, data-driven forecasting',
    /**
     * Knowledge graph definition - canonical topics covered
     */
    keywords: keywords,
    /**
     * Scholarly articles published
     */
    foundingDate: '2024-01-01',
    publishingPrinciples:
      'Data-backed analysis, structural reasoning, non-linear forecasting, verified sources, explicit assumptions',
  }
}

/**
 * Enhanced article semantic relationships
 * Links articles into a knowledge graph
 */
export interface SemanticArticleRelationships {
  // Canonical topics this article defines or explores
  canonicalTopics: string[] // Concept IDs

  // Related concepts mentioned but not central
  relatedConcepts: string[] // Concept IDs

  // Parent research domains
  researchDomains: string[]

  // Articles with closely related analysis
  relatedArticles: Array<{
    articleId: string
    relationship:
      | 'explores-same-concept'
      | 'complements'
      | 'provides-context'
      | 'contradicts'
    reason: string
  }>

  // Forecast continuations - follow-up research needed
  forecastContinuations: Array<{
    topic: string
    rationale: string
  }>

  // Entity relationships
  entities: {
    primary: string[] // Main focus entities
    secondary: string[] // Supporting entities
  }

  // Source quality metadata
  sources: Array<{
    title: string
    url: string
    credibility:
      | 'peer-reviewed'
      | 'industry-data'
      | 'field-expert'
      | 'published-research'
    weight: number // 0-1 importance to article
  }>
}

/**
 * Build semantic relationships for an article
 */
export function buildArticleSemanticRelationships(
  articleId: string,
  post: CollectionEntry<'blog'>,
): SemanticArticleRelationships {
  // Map article IDs to canonical topics they explore
  const articleToConceptsMap: Record<string, string[]> = {
    'the-chicken-and-egg-problem': [
      'platform-dynamics',
      'network-effects',
      'systems-intelligence',
      'emergent-systems',
      'structural-market-analysis',
    ],
    'water-growth-constraint': [
      'water-infrastructure',
      'resource-systems',
      'development-economics',
      'macroeconomic-systems',
      'strategic-forecasting',
    ],
    'why-indian-edtech-collapsed': [
      'macroeconomic-fragility',
      'strategic-forecasting',
      'platform-dynamics',
      'development-economics',
      'non-linear-analysis',
    ],
  }

  const canonicalTopics = articleToConceptsMap[articleId] || []

  return {
    canonicalTopics,
    relatedConcepts: post.data.semanticTags || [],
    researchDomains: [
      'Systems Intelligence',
      'Strategic Forecasting',
      'Infrastructure Analysis',
      'Market Dynamics',
    ],
    relatedArticles: buildRelatedArticles(articleId, canonicalTopics),
    forecastContinuations: buildForecastContinuations(articleId),
    entities: {
      primary: post.data.entities?.map((e: { name: string }) => e.name) || [],
      secondary: [],
    },
    sources: buildSourceMetadata(post.data.sources || []),
  }
}

/**
 * Build related articles based on shared concepts
 */
function buildRelatedArticles(
  currentArticleId: string,
  canonicalTopics: string[],
): SemanticArticleRelationships['relatedArticles'] {
  const articleConceptMap: Record<string, string[]> = {
    'the-chicken-and-egg-problem': [
      'platform-dynamics',
      'network-effects',
      'systems-intelligence',
      'emergent-systems',
      'structural-market-analysis',
    ],
    'water-growth-constraint': [
      'water-infrastructure',
      'resource-systems',
      'development-economics',
      'macroeconomic-systems',
      'strategic-forecasting',
    ],
    'why-indian-edtech-collapsed': [
      'macroeconomic-fragility',
      'strategic-forecasting',
      'platform-dynamics',
      'development-economics',
      'non-linear-analysis',
    ],
  }

  const related: SemanticArticleRelationships['relatedArticles'] = []

  Object.entries(articleConceptMap).forEach(([articleId, concepts]) => {
    if (articleId === currentArticleId) return

    const sharedConcepts = canonicalTopics.filter((c) => concepts.includes(c))

    if (sharedConcepts.length > 0) {
      related.push({
        articleId,
        relationship: 'explores-same-concept',
        reason: `Both articles explore ${sharedConcepts.map((c) => getConceptById(c)?.label).join(', ')}`,
      })
    }
  })

  return related
}

/**
 * Identify follow-up research needed
 */
function buildForecastContinuations(
  articleId: string,
): Array<{ topic: string; rationale: string }> {
  const continuations: Record<
    string,
    Array<{ topic: string; rationale: string }>
  > = {
    'the-chicken-and-egg-problem': [
      {
        topic: 'Platform subsidy sustainability and profitability timelines',
        rationale:
          'Article raises questions about long-term viability of current subsidy models',
      },
      {
        topic:
          'Regulatory impact on platform expansion and bootstrap strategies',
        rationale: 'Regulatory constraints are increasing competitive barriers',
      },
    ],
    'water-growth-constraint': [
      {
        topic: 'Groundwater recovery and alternative water sourcing economics',
        rationale: 'Understanding technological solutions to water constraints',
      },
      {
        topic: 'Policy response to agricultural water depletion',
        rationale:
          'Policy shifts will dramatically impact agricultural economics',
      },
    ],
    'why-indian-edtech-collapsed': [
      {
        topic: 'EdTech recovery patterns post-demand normalization',
        rationale: 'Understanding which models survive demand gravity resets',
      },
      {
        topic: 'Policy role in EdTech sector stabilization',
        rationale: 'Government interventions may create new equilibrium',
      },
    ],
  }

  return continuations[articleId] || []
}

/**
 * Build source quality metadata
 */
function buildSourceMetadata(
  sources: Array<{ title: string; url?: string }>,
): Array<{
  title: string
  url: string
  credibility:
    | 'peer-reviewed'
    | 'industry-data'
    | 'field-expert'
    | 'published-research'
  weight: number
}> {
  return sources.map((source) => ({
    title: source.title,
    url: source.url || '',
    credibility: categorizeSourceCredibility(source.title) as
      | 'peer-reviewed'
      | 'industry-data'
      | 'field-expert'
      | 'published-research',
    weight: 0.8,
  }))
}

/**
 * Categorize source credibility
 */
function categorizeSourceCredibility(
  sourceTitle: string,
): 'peer-reviewed' | 'industry-data' | 'field-expert' | 'published-research' {
  const lowerTitle = sourceTitle.toLowerCase()

  if (
    lowerTitle.includes('nber') ||
    lowerTitle.includes('nih') ||
    lowerTitle.includes('arxiv') ||
    lowerTitle.includes('doi.org')
  ) {
    return 'peer-reviewed'
  }

  if (
    lowerTitle.includes('a16z') ||
    lowerTitle.includes('mckinsey') ||
    lowerTitle.includes('gartner') ||
    lowerTitle.includes('statista')
  ) {
    return 'industry-data'
  }

  if (lowerTitle.includes('research') || lowerTitle.includes('study')) {
    return 'published-research'
  }

  return 'field-expert'
}

/**
 * Generate BreadcrumbSchema with canonical concepts
 */
export function generateConceptBreadcrumbSchema(
  conceptId: string,
  baseUrl: string,
): object {
  const concept = getConceptById(conceptId)

  if (!concept) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Project NIRV',
          item: baseUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Concepts',
          item: `${baseUrl}/concepts`,
        },
      ],
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Project NIRV',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Concepts',
        item: `${baseUrl}/concepts`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: concept.label,
        item: `${baseUrl}/concepts/${concept.slug}`,
      },
    ],
  }
}

/**
 * Generate DefinedTerm schema for canonical concepts
 */
export function generateConceptDefinedTermSchema(
  conceptId: string,
  baseUrl: string,
): object {
  const concept = getConceptById(conceptId)

  if (!concept) {
    return {}
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: concept.label,
    description: concept.description,
    url: `${baseUrl}/concepts/${concept.slug}`,
    identifier: concept.id,
    inDefinedTermSet: 'ProjectNIRVCanonicalConcepts',
    definedTermCategory: 'Research Topic',
    ...(concept.aliases && {
      alternateName: concept.aliases,
    }),
    sameAs: concept.relatedConcepts.map(
      (id) => `${baseUrl}/concepts/${getConceptById(id)?.slug || id}`,
    ),
    relatedLink: concept.canonicalArticles.map((id) => `${baseUrl}/blog/${id}`),
    // For knowledge graph integration
    ...(concept.parentConcepts.length > 0 && {
      isPartOf: concept.parentConcepts.map(
        (id) => `${baseUrl}/concepts/${getConceptById(id)?.slug || id}`,
      ),
    }),
    ...(concept.childConcepts.length > 0 && {
      hasPart: concept.childConcepts.map(
        (id) => `${baseUrl}/concepts/${getConceptById(id)?.slug || id}`,
      ),
    }),
  }
}

/**
 * Enhanced article schema with concept linkage
 */
export function enhanceArticleSchemaWithConcepts(
  baseArticleSchema: object,
  relationships: SemanticArticleRelationships,
  baseUrl: string,
): object {
  return {
    ...baseArticleSchema,
    // Add canonical topics
    ...(relationships.canonicalTopics.length > 0 && {
      discusses: relationships.canonicalTopics.map((conceptId) => {
        const concept = getConceptById(conceptId)
        return {
          '@type': 'DefinedTerm',
          name: concept?.label || conceptId,
          url: `${baseUrl}/concepts/${concept?.slug || conceptId}`,
        }
      }),
    }),
    // Add related concepts
    ...(relationships.relatedConcepts.length > 0 && {
      mentions: relationships.relatedConcepts.map((concept) => ({
        '@type': 'Thing',
        name: concept,
      })),
    }),
    // Add research domains
    ...(relationships.researchDomains.length > 0 && {
      inLanguage: 'en',
      genre: relationships.researchDomains,
    }),
    // Add source quality
    ...(relationships.sources.length > 0 && {
      citeAs: relationships.sources.map((source) => ({
        '@type': 'Thing',
        name: source.title,
        url: source.url,
        accessibilityFeature: source.credibility,
      })),
    }),
  }
}

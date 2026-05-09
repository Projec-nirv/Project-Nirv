/**
 * Semantic HTML Enhancement Utilities
 * Improves article structure for AI chunk extraction, passage retrieval,
 * and semantic understanding by LLMs and search systems.
 */

/**
 * Generates semantic article structure metadata
 * Helps AI systems understand content organization and relationships
 */
export interface SemanticArticleStructure {
  sections: SemanticSection[]
  keyPassages: string[]
  entityMentions: EntityMention[]
  argumentStructure: ArgumentStructure
  readabilityMetrics: ReadabilityMetrics
}

export interface SemanticSection {
  id: string
  heading: string
  level: number
  semanticRole: 'introduction' | 'methodology' | 'findings' | 'analysis' | 'conclusion' | 'references'
  estimatedReadingTime: number
  keyTerms: string[]
  relatedSections?: string[]
}

export interface EntityMention {
  entity: string
  type: 'person' | 'organization' | 'location' | 'concept' | 'metric'
  mentions: number
  firstMentionSection: string
  context?: string[]
}

export interface ArgumentStructure {
  mainThesis: string
  supportingArguments: Argument[]
  counterarguments?: Argument[]
  implications: string[]
}

export interface Argument {
  statement: string
  evidence: string[]
  supportingSections: string[]
}

export interface ReadabilityMetrics {
  estimatedReadingTime: number
  headingDensity: number
  paragraphLength: number
  technicalTermDensity: number
  citationDensity: number
}

/**
 * Generates schema.org markup for article sections
 * Improves semantic understanding and search indexing
 */
export function generateSectionMarkup(section: SemanticSection) {
  const roleMapping: Record<SemanticSection['semanticRole'], string> = {
    introduction: 'introduction',
    methodology: 'procedure',
    findings: 'result',
    analysis: 'discussion',
    conclusion: 'conclusion',
    references: 'references',
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    hasPart: {
      '@type': 'ArticleSection',
      name: section.heading,
      position: section.level,
      wordCount: Math.round((section.estimatedReadingTime * 200) / 60), // Rough estimate
      description: `${roleMapping[section.semanticRole]} section of article`,
    },
  }
}

/**
 * Creates microdata annotations for passage extraction
 * Enables better AI chunking and retrieval of key passages
 */
export function generatePassageMicrodata(
  passage: string,
  type: 'key-finding' | 'evidence' | 'data-point' | 'methodology' | 'implication',
  context?: {
    section?: string
    relatedEntities?: string[]
    importance?: number
  },
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Passage',
    text: passage,
    position: context?.importance || 1,
    inLanguage: 'en',
    articleSection: context?.section,
    keywords: context?.relatedEntities,
    passageType: type,
  }
}

/**
 * Generates entity metadata for AI mention extraction
 */
export function generateEntityMicrodata(
  entity: EntityMention,
) {
  const typeMapping: Record<EntityMention['type'], string> = {
    person: 'Person',
    organization: 'Organization',
    location: 'Place',
    concept: 'Thing',
    metric: 'QuantitativeValue',
  }

  return {
    '@context': 'https://schema.org',
    '@type': typeMapping[entity.type],
    name: entity.entity,
    mentions: entity.mentions,
    context: entity.context,
  }
}

/**
 * Creates semantic heading structure for navigation and understanding
 */
export interface SemanticHeading {
  level: number
  text: string
  id: string
  role?: 'main' | 'section' | 'subsection'
  relatedTopics?: string[]
  estimatedSectionWords?: number
}

export function generateHeadingMarkup(heading: SemanticHeading) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Thing',
    name: heading.text,
    description: `${heading.role || 'section'} heading at level ${heading.level}`,
    identifier: heading.id,
    inLanguage: 'en',
  }
}

/**
 * Generates citation metadata for source attribution
 * Improves AI ability to trace information to sources
 */
export function generateCitationMetadata(
  source: {
    title: string
    author?: string
    url?: string
    date?: string
    citation?: string
  },
  context?: {
    mentionedIn?: string[]
    claimsSupported?: string[]
    credibility?: number
  },
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    name: source.title,
    author: source.author,
    url: source.url,
    datePublished: source.date,
    citation: source.citation,
    mentionedIn: context?.mentionedIn,
    claimsSupported: context?.claimsSupported,
  }
}

/**
 * Generates table markup for better AI interpretation of data
 */
export function generateTableSemantics(
  table: {
    caption: string
    headers: string[]
    rows: string[][]
    units?: string[]
    dataType?: 'numeric' | 'categorical' | 'temporal'
  },
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Table',
    name: table.caption,
    columns: table.headers.length,
    rows: table.rows.length,
    dataType: table.dataType,
    unitOfMeasure: table.units,
    tableData: {
      headers: table.headers,
      data: table.rows,
    },
  }
}

/**
 * Generates semantic emphasis markup
 * Highlights important terms for AI attention
 */
export function generateSemanticEmphasis(
  term: string,
  type: 'definition' | 'emphasis' | 'technical-term' | 'key-metric' | 'named-entity',
  metadata?: {
    definition?: string
    firstMention?: boolean
    relatedConcepts?: string[]
  },
) {
  const typeMapping: Record<typeof type, string> = {
    definition: 'dfn', // <dfn>
    emphasis: 'strong', // <strong>
    'technical-term': 'abbr', // <abbr>
    'key-metric': 'mark', // <mark>
    'named-entity': 'span', // <span> with data attributes
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term,
    termCode: type,
    definition: metadata?.definition,
    isDefinition: metadata?.firstMention || false,
    relatedTerms: metadata?.relatedConcepts,
  }
}

/**
 * Generates metadata for code examples and technical content
 */
export function generateCodeBlockSemantics(
  code: {
    content: string
    language: string
    description?: string
    purpose?: string
  },
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Code',
    codeRepository: 'https://github.com',
    description: code.description,
    programmingLanguage: code.language,
    text: code.content,
    purpose: code.purpose,
  }
}

/**
 * Generates structured heading hierarchy for TOC and navigation
 */
export function generateHeadingHierarchy(headings: SemanticHeading[]) {
  const hierarchy: Record<number, SemanticHeading[]> = {
    1: [],
    2: [],
    3: [],
    4: [],
  }

  headings.forEach((h) => {
    if (hierarchy[h.level]) {
      hierarchy[h.level].push(h)
    }
  })

  return hierarchy
}

/**
 * Generates breadcrumb trail for semantic navigation
 */
export function generateBreadcrumbTrail(
  breadcrumbs: Array<{ name: string; url: string; level: number }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: b.url,
      level: b.level,
    })),
  }
}

/**
 * Generates accessibility markup for semantic content
 */
export function generateAccessibilityMarkup(
  content: {
    mainHeading: string
    sections: { heading: string; content: string }[]
    summary: string
  },
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebContent',
    headline: content.mainHeading,
    text: content.summary,
    hasPart: content.sections.map((s) => ({
      '@type': 'SectionBreak',
      name: s.heading,
      text: s.content,
    })),
  }
}

/**
 * Utility to calculate article semantic density
 * Higher density = better for AI retrieval
 */
export function calculateSemanticDensity(metadata: {
  headingsCount: number
  tablesCount: number
  citationsCount: number
  dataPointsCount: number
  keyTermsCount: number
  totalParagraphs: number
  totalWords: number
}): number {
  // Weighted scoring for semantic richness
  const headingScore = (metadata.headingsCount / (metadata.totalParagraphs / 3)) * 20
  const tableScore = (metadata.tablesCount / (metadata.totalParagraphs / 10)) * 20
  const citationScore = (metadata.citationsCount / (metadata.totalParagraphs / 2)) * 20
  const dataScore = (metadata.dataPointsCount / (metadata.totalParagraphs / 5)) * 20
  const termScore = (metadata.keyTermsCount / (metadata.totalWords / 100)) * 20

  return Math.min(100, (headingScore + tableScore + citationScore + dataScore + termScore) / 5)
}

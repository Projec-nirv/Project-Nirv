/**
 * Canonical Concepts System
 * Defines the core semantic concepts that form the foundation of Project NIRV research
 * Each concept has stable URLs, relationships, and structured metadata for AI systems
 */

export interface CanonicalConcept {
  id: string
  slug: string
  label: string
  shortDescription: string
  description: string
  aliases: string[]
  relatedConcepts: string[] // IDs of related concepts
  parentConcepts: string[] // Broader concepts
  childConcepts: string[] // More specific concepts
  researchThemes: string[]
  canonicalArticles: string[] // Article IDs that define/explore this concept
  relatedArticles: string[] // Articles that mention but don't focus on this
  entities: {
    primary: string[] // Main entities involved
    secondary: string[] // Supporting entities
  }
  keywords: string[]
  semanticDensity: number // 0-100 score of how central to NIRV research
  retrievalImportance: number // 0-100 for RAG prioritization
  jsonldType: string
}

export const CANONICAL_CONCEPTS: Record<string, CanonicalConcept> = {
  'systems-intelligence': {
    id: 'systems-intelligence',
    slug: 'systems-intelligence',
    label: 'Systems Intelligence',
    shortDescription:
      'The capacity to understand complex systems through feedback loops, non-linear dynamics, and emergent behavior.',
    description:
      'Systems intelligence represents the analytical framework for understanding how complex systems operate, evolve, and respond to inputs. It encompasses system dynamics, organizational behavior, network effects, and the study of how constraints and incentives shape outcomes at scale.',
    aliases: [
      'systems thinking',
      'systems analysis',
      'complexity science',
      'system dynamics',
      'structural analysis',
    ],
    relatedConcepts: [
      'non-linear-analysis',
      'emergent-systems',
      'structural-constraints',
      'feedback-dynamics',
    ],
    parentConcepts: [],
    childConcepts: [
      'platform-dynamics',
      'organizational-systems',
      'network-effects',
    ],
    researchThemes: [
      'Understanding how incentives shape outcomes',
      'Analyzing feedback loops and their stability',
      'Mapping organizational structures and information flow',
      'Studying network effects and critical mass',
    ],
    canonicalArticles: ['the-chicken-and-egg-problem'],
    relatedArticles: ['why-indian-edtech-collapsed'],
    entities: {
      primary: ['platforms', 'organizations', 'markets'],
      secondary: ['incentive structures', 'organizational hierarchies'],
    },
    keywords: [
      'systems thinking',
      'feedback loops',
      'system dynamics',
      'complex systems',
      'emergence',
      'organizational structure',
      'incentive alignment',
    ],
    semanticDensity: 95,
    retrievalImportance: 95,
    jsonldType: 'DefinedTerm',
  },

  'non-linear-analysis': {
    id: 'non-linear-analysis',
    slug: 'non-linear-analysis',
    label: 'Non-Linear Analysis',
    shortDescription:
      'Analytical approach that recognizes systems do not scale proportionally and that threshold effects create discontinuous change.',
    description:
      'Non-linear analysis examines how systems behave differently at different scales and how thresholds create phase transitions. It rejects linear extrapolation and focuses on understanding where systems break, accelerate, or reverse direction.',
    aliases: [
      'nonlinear dynamics',
      'threshold effects',
      'phase transitions',
      'discontinuous change',
    ],
    relatedConcepts: [
      'systems-intelligence',
      'strategic-forecasting',
      'macroeconomic-fragility',
      'emergent-systems',
    ],
    parentConcepts: [],
    childConcepts: [
      'scaling-constraints',
      'gravity-effects',
      'bifurcation-points',
    ],
    researchThemes: [
      'Identifying threshold effects in markets and systems',
      'Understanding acceleration and deceleration patterns',
      'Analyzing phase transitions and regime changes',
      'Forecasting discontinuous change',
    ],
    canonicalArticles: [
      'water-growth-constraint',
      'why-indian-edtech-collapsed',
    ],
    relatedArticles: [],
    entities: {
      primary: ['markets', 'economies', 'infrastructure systems'],
      secondary: ['scaling patterns', 'growth constraints'],
    },
    keywords: [
      'nonlinear',
      'threshold effects',
      'phase transition',
      'acceleration',
      'deceleration',
      'tipping points',
      'discontinuous',
    ],
    semanticDensity: 92,
    retrievalImportance: 90,
    jsonldType: 'DefinedTerm',
  },

  'strategic-forecasting': {
    id: 'strategic-forecasting',
    slug: 'strategic-forecasting',
    label: 'Strategic Forecasting',
    shortDescription:
      'The practice of identifying structural patterns and constraints to anticipate how systems and markets will evolve.',
    description:
      'Strategic forecasting integrates systems intelligence, non-linear analysis, and infrastructure understanding to anticipate market changes, technology disruptions, and policy shifts. It emphasizes structural constraints over prediction and focuses on identifying where systems are likely to move.',
    aliases: [
      'scenario planning',
      'strategic foresight',
      'trend analysis',
      'systems forecasting',
      'structural prediction',
    ],
    relatedConcepts: [
      'systems-intelligence',
      'non-linear-analysis',
      'infrastructure-evolution',
      'macroeconomic-fragility',
    ],
    parentConcepts: [],
    childConcepts: [
      'demand-gravity',
      'cost-gravity',
      'infrastructure-constraints',
    ],
    researchThemes: [
      'Identifying structural trends in markets',
      'Forecasting infrastructure limits',
      'Understanding technology adoption curves',
      'Anticipating policy and regulatory change',
    ],
    canonicalArticles: ['why-indian-edtech-collapsed'],
    relatedArticles: ['the-chicken-and-egg-problem', 'water-growth-constraint'],
    entities: {
      primary: ['markets', 'technology sectors', 'policy environments'],
      secondary: ['growth patterns', 'structural constraints'],
    },
    keywords: [
      'forecasting',
      'foresight',
      'scenario',
      'trend',
      'prediction',
      'structural change',
      'strategic',
    ],
    semanticDensity: 88,
    retrievalImportance: 85,
    jsonldType: 'DefinedTerm',
  },

  'infrastructure-evolution': {
    id: 'infrastructure-evolution',
    slug: 'infrastructure-evolution',
    label: 'Infrastructure Evolution',
    shortDescription:
      'The study of how physical, technological, and organizational infrastructure shapes economic capacity and growth trajectories.',
    description:
      'Infrastructure evolution examines how foundational systems (water, energy, telecommunications, transportation, cloud) develop, constrain growth, and create path dependencies. It integrates technical constraints, economic dynamics, and policy factors.',
    aliases: [
      'infrastructure dynamics',
      'infrastructure constraints',
      'infrastructure systems',
      'technological infrastructure',
      'physical infrastructure',
    ],
    relatedConcepts: [
      'resource-systems',
      'water-infrastructure',
      'distributed-systems',
      'macroeconomic-systems',
    ],
    parentConcepts: [],
    childConcepts: ['cloud-infrastructure', 'water-systems', 'energy-systems'],
    researchThemes: [
      'Understanding infrastructure constraints on growth',
      'Analyzing technology adoption patterns',
      'Studying infrastructure lock-in and path dependency',
      'Forecasting infrastructure limits',
    ],
    canonicalArticles: ['water-growth-constraint'],
    relatedArticles: [],
    entities: {
      primary: [
        'infrastructure systems',
        'technology platforms',
        'water systems',
      ],
      secondary: ['physical constraints', 'technological limits'],
    },
    keywords: [
      'infrastructure',
      'constraints',
      'physical',
      'technology',
      'systems',
      'capacity',
      'limit',
    ],
    semanticDensity: 90,
    retrievalImportance: 88,
    jsonldType: 'DefinedTerm',
  },

  'emergent-systems': {
    id: 'emergent-systems',
    slug: 'emergent-systems',
    label: 'Emergent Systems',
    shortDescription:
      'Complex systems that exhibit properties not predictable from their component parts, arising from interaction and feedback.',
    description:
      'Emergent systems are structures that arise from decentralized interactions without central control. They exhibit properties that cannot be understood by analyzing parts in isolation. This includes markets, organizational networks, platform ecosystems, and technology adoption patterns.',
    aliases: [
      'emergence',
      'self-organizing systems',
      'complex adaptive systems',
      'distributed systems',
      'collective behavior',
    ],
    relatedConcepts: [
      'systems-intelligence',
      'network-effects',
      'platform-dynamics',
    ],
    parentConcepts: ['systems-intelligence'],
    childConcepts: [
      'network-topology',
      'coordination-mechanisms',
      'information-cascades',
    ],
    researchThemes: [
      'Understanding how collective behavior emerges',
      'Analyzing self-organization in markets',
      'Studying information flow in networks',
      'Forecasting emergent properties',
    ],
    canonicalArticles: ['the-chicken-and-egg-problem'],
    relatedArticles: ['why-indian-edtech-collapsed'],
    entities: {
      primary: ['markets', 'networks', 'platforms'],
      secondary: ['participants', 'information flows'],
    },
    keywords: [
      'emergence',
      'emergent',
      'self-organizing',
      'complex',
      'adaptive',
      'distributed',
      'collective',
    ],
    semanticDensity: 85,
    retrievalImportance: 82,
    jsonldType: 'DefinedTerm',
  },

  'macroeconomic-systems': {
    id: 'macroeconomic-systems',
    slug: 'macroeconomic-systems',
    label: 'Macroeconomic Systems',
    shortDescription:
      'Large-scale economic systems including growth dynamics, sector evolution, resource constraints, and structural fragility.',
    description:
      'Macroeconomic systems research studies how economies as wholes operate, constrain, and change. This includes understanding growth limits, sectoral dynamics, resource dependencies, fiscal sustainability, and the structural factors that determine economic trajectories.',
    aliases: [
      'macroeconomics',
      'economic systems',
      'economic growth',
      'sectoral analysis',
      'development economics',
    ],
    relatedConcepts: [
      'macroeconomic-fragility',
      'development-economics',
      'resource-systems',
      'structural-market-analysis',
    ],
    parentConcepts: [],
    childConcepts: [
      'growth-dynamics',
      'sectoral-structure',
      'resource-constraints',
      'inflation-dynamics',
    ],
    researchThemes: [
      'Understanding growth constraints in developing economies',
      'Analyzing sectoral transitions',
      'Studying structural economic limits',
      'Forecasting macroeconomic inflection points',
    ],
    canonicalArticles: [
      'water-growth-constraint',
      'why-indian-edtech-collapsed',
    ],
    relatedArticles: [],
    entities: {
      primary: ['economies', 'sectors', 'regions'],
      secondary: ['growth patterns', 'resource flows'],
    },
    keywords: [
      'macroeconomics',
      'economic growth',
      'sectoral',
      'development',
      'economy',
      'growth',
      'structural',
    ],
    semanticDensity: 87,
    retrievalImportance: 85,
    jsonldType: 'DefinedTerm',
  },

  'distributed-systems': {
    id: 'distributed-systems',
    slug: 'distributed-systems',
    label: 'Distributed Systems',
    shortDescription:
      'Technological and organizational systems where computation, data, or decision-making is decentralized across multiple nodes.',
    description:
      'Distributed systems encompass both technical architectures (microservices, cloud infrastructure, peer-to-peer networks) and organizational structures (decentralized decision-making, distributed teams). Understanding their economics, constraints, and emergent properties is crucial for modern infrastructure analysis.',
    aliases: [
      'decentralized systems',
      'microservices',
      'cloud architecture',
      'peer-to-peer networks',
      'distributed computing',
    ],
    relatedConcepts: [
      'infrastructure-evolution',
      'cloud-infrastructure',
      'organizational-systems',
    ],
    parentConcepts: ['infrastructure-evolution'],
    childConcepts: [
      'microservices-economics',
      'cloud-cost-dynamics',
      'distributed-coordination',
    ],
    researchThemes: [
      'Understanding distributed system economics',
      'Analyzing coordination costs in distribution',
      'Studying complexity and overhead in microservices',
      'Understanding cloud infrastructure constraints',
    ],
    canonicalArticles: [],
    relatedArticles: [],
    entities: {
      primary: ['cloud platforms', 'technology architectures', 'organizations'],
      secondary: ['cost structures', 'coordination mechanisms'],
    },
    keywords: [
      'distributed',
      'microservices',
      'cloud',
      'decentralized',
      'architecture',
      'coordination',
      'infrastructure',
    ],
    semanticDensity: 86,
    retrievalImportance: 84,
    jsonldType: 'DefinedTerm',
  },

  'structural-market-analysis': {
    id: 'structural-market-analysis',
    slug: 'structural-market-analysis',
    label: 'Structural Market Analysis',
    shortDescription:
      'Analysis of competitive dynamics, winner-take-all patterns, and structural constraints that determine market evolution.',
    description:
      'Structural market analysis examines how market structure (concentration, entry barriers, network effects) shapes competitive dynamics and determines which firms succeed or fail. It focuses on the underlying structural factors that create winner-take-all outcomes and strategic inflection points.',
    aliases: [
      'market structure',
      'competitive dynamics',
      'structural economics',
      'industrial organization',
      'market concentration',
    ],
    relatedConcepts: [
      'platform-dynamics',
      'network-effects',
      'strategic-forecasting',
      'macroeconomic-systems',
    ],
    parentConcepts: [],
    childConcepts: [
      'winner-take-all-dynamics',
      'entry-barriers',
      'platform-concentration',
      'pricing-power',
    ],
    researchThemes: [
      'Understanding winner-take-all dynamics',
      'Analyzing entry barriers and competitive moats',
      'Studying market concentration trends',
      'Forecasting competitive outcomes',
    ],
    canonicalArticles: [
      'the-chicken-and-egg-problem',
      'why-indian-edtech-collapsed',
    ],
    relatedArticles: [],
    entities: {
      primary: ['markets', 'firms', 'platforms'],
      secondary: ['competitors', 'customers', 'suppliers'],
    },
    keywords: [
      'market structure',
      'competition',
      'winner-take-all',
      'concentration',
      'barriers',
      'industrial',
      'competitive',
    ],
    semanticDensity: 88,
    retrievalImportance: 86,
    jsonldType: 'DefinedTerm',
  },

  'resource-systems': {
    id: 'resource-systems',
    slug: 'resource-systems',
    label: 'Resource Systems',
    shortDescription:
      'Natural and economic systems that manage scarce resources (water, energy, minerals) and their role as constraints on growth.',
    description:
      'Resource systems research analyzes how finite or limited resources (water, energy, agricultural land, minerals) constrain economic activity. It integrates hydrological systems, energy economics, and agricultural dynamics to understand how resource availability determines growth trajectories.',
    aliases: [
      'natural resources',
      'resource constraints',
      'resource economics',
      'resource scarcity',
      'environmental constraints',
    ],
    relatedConcepts: [
      'water-infrastructure',
      'macroeconomic-systems',
      'development-economics',
    ],
    parentConcepts: [],
    childConcepts: ['water-systems', 'energy-systems', 'agricultural-systems'],
    researchThemes: [
      'Understanding water constraints on growth',
      'Analyzing energy availability and costs',
      'Studying resource-driven macroeconomic limits',
      'Forecasting resource scarcity impacts',
    ],
    canonicalArticles: ['water-growth-constraint'],
    relatedArticles: [],
    entities: {
      primary: ['water systems', 'energy systems', 'agricultural sectors'],
      secondary: ['groundwater', 'precipitation', 'population'],
    },
    keywords: [
      'resources',
      'water',
      'energy',
      'scarcity',
      'constraints',
      'natural',
      'environmental',
    ],
    semanticDensity: 84,
    retrievalImportance: 82,
    jsonldType: 'DefinedTerm',
  },

  'development-economics': {
    id: 'development-economics',
    slug: 'development-economics',
    label: 'Development Economics',
    shortDescription:
      'Study of economic growth, poverty, development challenges, and the structural factors that determine development trajectories.',
    description:
      'Development economics research examines why some regions and sectors develop rapidly while others stagnate. It integrates infrastructure constraints, human capital, policy, and structural factors to understand development dynamics, particularly in emerging markets.',
    aliases: [
      'economic development',
      'development studies',
      'emerging markets',
      'poverty dynamics',
      'development policy',
    ],
    relatedConcepts: [
      'macroeconomic-systems',
      'resource-systems',
      'infrastructure-evolution',
      'strategic-forecasting',
    ],
    parentConcepts: ['macroeconomic-systems'],
    childConcepts: [
      'sectoral-development',
      'poverty-dynamics',
      'institutional-development',
    ],
    researchThemes: [
      'Understanding development constraints in emerging economies',
      'Analyzing sectoral development patterns',
      'Studying policy impacts on development',
      'Forecasting development trajectories',
    ],
    canonicalArticles: [
      'water-growth-constraint',
      'why-indian-edtech-collapsed',
    ],
    relatedArticles: [],
    entities: {
      primary: ['emerging markets', 'sectors', 'regions'],
      secondary: ['demographics', 'infrastructure', 'policy'],
    },
    keywords: [
      'development',
      'economic',
      'emerging',
      'growth',
      'developing',
      'poverty',
      'economy',
    ],
    semanticDensity: 89,
    retrievalImportance: 87,
    jsonldType: 'DefinedTerm',
  },

  'water-infrastructure': {
    id: 'water-infrastructure',
    slug: 'water-infrastructure',
    label: 'Water Infrastructure',
    shortDescription:
      'Systems for capturing, storing, distributing, and managing water resources as determinants of agricultural and economic capacity.',
    description:
      'Water infrastructure integrates hydrology, engineering, and economics to understand how water availability constrains economic activity. This includes groundwater depletion, irrigation systems, water pricing, and the nexus between water and agricultural productivity.',
    aliases: [
      'water systems',
      'water management',
      'irrigation',
      'groundwater',
      'water economics',
    ],
    relatedConcepts: [
      'resource-systems',
      'infrastructure-evolution',
      'development-economics',
    ],
    parentConcepts: ['resource-systems', 'infrastructure-evolution'],
    childConcepts: [
      'groundwater-depletion',
      'irrigation-efficiency',
      'water-pricing',
    ],
    researchThemes: [
      'Understanding groundwater depletion dynamics',
      'Analyzing water-driven agricultural constraints',
      'Studying water economics and pricing',
      'Forecasting water scarcity impacts on development',
    ],
    canonicalArticles: ['water-growth-constraint'],
    relatedArticles: [],
    entities: {
      primary: ['regions', 'agricultural sectors', 'groundwater systems'],
      secondary: ['precipitation patterns', 'irrigation systems'],
    },
    keywords: [
      'water',
      'infrastructure',
      'groundwater',
      'irrigation',
      'agriculture',
      'scarcity',
      'management',
    ],
    semanticDensity: 82,
    retrievalImportance: 80,
    jsonldType: 'DefinedTerm',
  },

  'macroeconomic-fragility': {
    id: 'macroeconomic-fragility',
    slug: 'macroeconomic-fragility',
    label: 'Macroeconomic Fragility',
    shortDescription:
      'Analysis of structural vulnerabilities, unsustainable dynamics, and inflection points where systems become unstable.',
    description:
      'Macroeconomic fragility research identifies where economic systems are structurally vulnerable to disruption. This includes analyzing unsustainable trends, hidden dependencies, policy constraints, and the conditions under which systems transition to new regimes.',
    aliases: [
      'economic fragility',
      'systemic risk',
      'macroeconomic vulnerability',
      'structural instability',
      'recession dynamics',
    ],
    relatedConcepts: [
      'non-linear-analysis',
      'macroeconomic-systems',
      'strategic-forecasting',
      'structural-market-analysis',
    ],
    parentConcepts: ['macroeconomic-systems'],
    childConcepts: [
      'fiscal-sustainability',
      'inflation-dynamics',
      'structural-unemployment',
    ],
    researchThemes: [
      'Identifying hidden vulnerabilities in economic systems',
      'Analyzing unsustainable trends',
      'Forecasting macroeconomic regime changes',
      'Understanding systemic risk amplification',
    ],
    canonicalArticles: ['why-indian-edtech-collapsed'],
    relatedArticles: ['water-growth-constraint'],
    entities: {
      primary: ['economies', 'sectors', 'markets'],
      secondary: ['policy regimes', 'structural factors'],
    },
    keywords: [
      'fragility',
      'vulnerability',
      'risk',
      'instability',
      'recession',
      'crisis',
      'sustainability',
    ],
    semanticDensity: 85,
    retrievalImportance: 83,
    jsonldType: 'DefinedTerm',
  },

  'platform-dynamics': {
    id: 'platform-dynamics',
    slug: 'platform-dynamics',
    label: 'Platform Dynamics',
    shortDescription:
      'Study of two-sided and multi-sided platforms, network effects, cold-start problems, and winner-take-all competitive patterns.',
    description:
      'Platform dynamics research examines how platforms (marketplaces, social networks, infrastructure platforms) operate differently from traditional firms. It focuses on network effects, cold-start challenges, cross-side externalities, and the structural factors that create winner-take-all outcomes.',
    aliases: [
      'platform economics',
      'platform strategy',
      'two-sided markets',
      'platform business models',
      'network economics',
    ],
    relatedConcepts: [
      'systems-intelligence',
      'network-effects',
      'structural-market-analysis',
      'emergent-systems',
    ],
    parentConcepts: ['systems-intelligence'],
    childConcepts: [
      'cold-start-problem',
      'network-effects',
      'platform-concentration',
    ],
    researchThemes: [
      'Understanding platform cold-start dynamics',
      'Analyzing cross-side network effects',
      'Studying platform scaling and profitability',
      'Forecasting platform consolidation',
    ],
    canonicalArticles: ['the-chicken-and-egg-problem'],
    relatedArticles: ['why-indian-edtech-collapsed'],
    entities: {
      primary: ['platforms', 'marketplaces', 'networks'],
      secondary: ['supply side', 'demand side'],
    },
    keywords: [
      'platform',
      'dynamics',
      'two-sided',
      'network effects',
      'cold-start',
      'marketplace',
      'economics',
    ],
    semanticDensity: 91,
    retrievalImportance: 89,
    jsonldType: 'DefinedTerm',
  },

  'network-effects': {
    id: 'network-effects',
    slug: 'network-effects',
    label: 'Network Effects',
    shortDescription:
      'Situations where the value of a system increases as more participants join, creating positive feedback loops.',
    description:
      'Network effects occur when the value of a good or service increases with the number of users. They can be direct (more users directly increases value), indirect (more users attract complementary products), or cross-side (one user type makes the product more valuable to other user types). Network effects create powerful competitive advantages and winner-take-all dynamics.',
    aliases: [
      'network externalities',
      'positive externalities',
      'coordination benefits',
      'user externalities',
      'feedback loops',
    ],
    relatedConcepts: [
      'platform-dynamics',
      'systems-intelligence',
      'emergent-systems',
      'structural-market-analysis',
    ],
    parentConcepts: ['systems-intelligence', 'platform-dynamics'],
    childConcepts: [
      'direct-network-effects',
      'indirect-network-effects',
      'cross-side-effects',
    ],
    researchThemes: [
      'Understanding how network effects create competitive advantages',
      'Analyzing critical mass and inflection points',
      'Studying cross-side externalities in platforms',
      'Forecasting network effect dynamics',
    ],
    canonicalArticles: ['the-chicken-and-egg-problem'],
    relatedArticles: [],
    entities: {
      primary: ['networks', 'platforms', 'user bases'],
      secondary: ['participants', 'users', 'complementors'],
    },
    keywords: [
      'network effects',
      'externalities',
      'network',
      'positive feedback',
      'scale',
      'users',
      'critical mass',
    ],
    semanticDensity: 88,
    retrievalImportance: 86,
    jsonldType: 'DefinedTerm',
  },

  'feedback-dynamics': {
    id: 'feedback-dynamics',
    slug: 'feedback-dynamics',
    label: 'Feedback Dynamics',
    shortDescription:
      'Causal loops where outputs circle back to affect inputs, creating reinforcement or dampening patterns.',
    description:
      'Feedback dynamics are the foundation of systems intelligence. Positive feedback loops amplify initial changes, creating accelerating growth or decline. Negative feedback loops dampen changes, creating stability. Understanding feedback dominates system behavior understanding.',
    aliases: [
      'feedback loops',
      'causal loops',
      'positive feedback',
      'negative feedback',
      'reinforcement',
    ],
    relatedConcepts: [
      'systems-intelligence',
      'emergent-systems',
      'non-linear-analysis',
    ],
    parentConcepts: ['systems-intelligence'],
    childConcepts: ['positive-feedback', 'negative-feedback', 'loop-dominance'],
    researchThemes: [
      'Identifying reinforcing and balancing loops',
      'Analyzing loop dominance over time',
      'Understanding when feedback shifts dominance',
      'Forecasting system behavior from loops',
    ],
    canonicalArticles: [],
    relatedArticles: [
      'the-chicken-and-egg-problem',
      'why-indian-edtech-collapsed',
    ],
    entities: {
      primary: ['systems', 'organizations', 'markets'],
      secondary: ['variables', 'causal relationships'],
    },
    keywords: [
      'feedback',
      'loop',
      'positive',
      'negative',
      'causal',
      'dynamics',
      'reinforcement',
    ],
    semanticDensity: 83,
    retrievalImportance: 80,
    jsonldType: 'DefinedTerm',
  },

  'structural-constraints': {
    id: 'structural-constraints',
    slug: 'structural-constraints',
    label: 'Structural Constraints',
    shortDescription:
      'Fundamental limits imposed by system design, infrastructure, physics, or policy that prevent certain outcomes regardless of effort.',
    description:
      'Structural constraints are limits that arise from the fundamental architecture of a system. Unlike operational inefficiency, structural constraints cannot be overcome through better management or effort. They require system redesign or policy change. Examples include growth limits from infrastructure, cost floors from architecture, or equilibrium points from incentive structures.',
    aliases: [
      'constraints',
      'fundamental limits',
      'ceiling effects',
      'structural limits',
      'binding constraints',
      'hard limits',
    ],
    relatedConcepts: [
      'systems-intelligence',
      'infrastructure-evolution',
      'resource-systems',
      'non-linear-analysis',
    ],
    parentConcepts: ['systems-intelligence'],
    childConcepts: [
      'infrastructure-constraints',
      'cost-constraints',
      'growth-constraints',
      'organizational-constraints',
    ],
    researchThemes: [
      'Identifying where constraints become binding',
      'Distinguishing structural from operational limits',
      'Analyzing constraint shifting and relief',
      'Forecasting where next constraints emerge',
    ],
    canonicalArticles: ['water-growth-constraint'],
    relatedArticles: ['why-indian-edtech-collapsed'],
    entities: {
      primary: ['systems', 'infrastructure', 'organizations'],
      secondary: ['resources', 'policies', 'technologies'],
    },
    keywords: [
      'constraint',
      'limit',
      'ceiling',
      'maximum',
      'structural',
      'fundamental',
      'binding',
    ],
    semanticDensity: 87,
    retrievalImportance: 85,
    jsonldType: 'DefinedTerm',
  },
}

/**
 * Get a concept by ID
 */
export function getConceptById(id: string): CanonicalConcept | undefined {
  return CANONICAL_CONCEPTS[id]
}

/**
 * Get a concept by slug
 */
export function getConceptBySlug(slug: string): CanonicalConcept | undefined {
  return Object.values(CANONICAL_CONCEPTS).find(
    (concept) => concept.slug === slug,
  )
}

/**
 * Get all related concepts (direct and transitive)
 */
export function getRelatedConcepts(
  conceptId: string,
  depth: number = 1,
): Set<string> {
  const related = new Set<string>()
  const concept = CANONICAL_CONCEPTS[conceptId]

  if (!concept) return related

  concept.relatedConcepts.forEach((id) => {
    related.add(id)
    if (depth > 1) {
      getRelatedConcepts(id, depth - 1).forEach((id) => related.add(id))
    }
  })

  return related
}

/**
 * Get concept hierarchy (parents and children)
 */
export function getConceptHierarchy(conceptId: string): {
  parents: CanonicalConcept[]
  children: CanonicalConcept[]
} {
  const concept = CANONICAL_CONCEPTS[conceptId]

  if (!concept) {
    return { parents: [], children: [] }
  }

  return {
    parents: concept.parentConcepts
      .map((id) => CANONICAL_CONCEPTS[id])
      .filter((c): c is CanonicalConcept => c !== undefined),
    children: concept.childConcepts
      .map((id) => CANONICAL_CONCEPTS[id])
      .filter((c): c is CanonicalConcept => c !== undefined),
  }
}

/**
 * Get articles related to a concept
 */
export function getConceptArticles(conceptId: string): {
  canonical: string[]
  related: string[]
} {
  const concept = CANONICAL_CONCEPTS[conceptId]

  if (!concept) {
    return { canonical: [], related: [] }
  }

  return {
    canonical: concept.canonicalArticles,
    related: concept.relatedArticles,
  }
}

/**
 * List all canonical concepts
 */
export function listAllConcepts(): CanonicalConcept[] {
  return Object.values(CANONICAL_CONCEPTS)
}

/**
 * Get concepts sorted by semantic density (importance to NIRV)
 */
export function getConceptsByDensity(): CanonicalConcept[] {
  return Object.values(CANONICAL_CONCEPTS).sort(
    (a, b) => b.semanticDensity - a.semanticDensity,
  )
}

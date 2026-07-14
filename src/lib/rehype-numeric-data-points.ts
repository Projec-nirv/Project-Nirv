import type { Element, Root, RootContent, Text } from 'hast'

const SKIPPED_TAGS = new Set([
  'a',
  'code',
  'kbd',
  'math',
  'pre',
  'script',
  'style',
])

const NUMBER_PATTERN =
  /(?<![\p{L}_])(?:[$₹€£]\s*)?(?:\d{1,3}(?:,\d{2,3})+|\d+)(?:\.\d+)?(?:\s*[–-]\s*(?:[$₹€£]\s*)?(?:\d{1,3}(?:,\d{2,3})+|\d+)(?:\.\d+)?)?(?:\s*(?:%|x|×|percentage points?|crores?|lakhs?|million|billion|trillion|cities|clusters|users?|properties|centres|states|years?|months?|days?|hours?|km³|km3|m³|m3|ARR|GOV|EBITDA|Cr|[KMBT](?![\p{L}])))?/giu

function isElement(node: RootContent): node is Element {
  return node.type === 'element'
}

function isText(node: RootContent): node is Text {
  return node.type === 'text'
}

function highlightNumericText(value: string): RootContent[] {
  const nodes: RootContent[] = []
  let lastIndex = 0

  for (const match of value.matchAll(NUMBER_PATTERN)) {
    const matchValue = match[0]
    const matchIndex = match.index ?? 0

    if (!matchValue.trim()) continue

    if (matchIndex > lastIndex) {
      nodes.push({ type: 'text', value: value.slice(lastIndex, matchIndex) })
    }

    nodes.push({
      type: 'element',
      tagName: 'span',
      properties: { className: ['numeric-data-point'] },
      children: [{ type: 'text', value: matchValue }],
    })

    lastIndex = matchIndex + matchValue.length
  }

  if (lastIndex === 0) {
    return [{ type: 'text', value }]
  }

  if (lastIndex < value.length) {
    nodes.push({ type: 'text', value: value.slice(lastIndex) })
  }

  return nodes
}

function visitChildren(node: Root | Element): void {
  if (!('children' in node)) return

  const nextChildren: RootContent[] = []

  for (const child of node.children) {
    if (isElement(child)) {
      if (!SKIPPED_TAGS.has(child.tagName)) {
        visitChildren(child)
      }

      nextChildren.push(child)
      continue
    }

    if (isText(child)) {
      nextChildren.push(...highlightNumericText(child.value))
      continue
    }

    nextChildren.push(child)
  }

  node.children = nextChildren
}

export function rehypeNumericDataPoints() {
  return (tree: Root) => {
    visitChildren(tree)
  }
}

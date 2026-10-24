export type SemanticNode = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const nodes = new Map<string, SemanticNode>();

export function registerSemanticNode(keyword: string, node: SemanticNode) {
  nodes.set(keyword, node);
}

export function unregisterSemanticNode(keyword: string) {
  nodes.delete(keyword);
}

export function getSemanticNodes(): SemanticNode[] {
  return Array.from(nodes.values());
}

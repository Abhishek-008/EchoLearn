import { Node, Edge } from 'reactflow';

type FlowchartSection = {
  section: string;
  topics: string[];
};

export async function generateFlowchartGraph(sections: FlowchartSection[]): Promise<{
  nodes: Node[];
  edges: Edge[];
}> {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const nodeMap: Record<string, string> = {}; // Maps "Section Name + Topic" → nodeId

  const colGap = 350;
  const rowGap = 120;

  // Assign unique section IDs (e.g., section-0, section-1)
  const sectionIdMap: Record<string, string> = {};
  sections.forEach((sec, i) => {
    sectionIdMap[sec.section] = `section-${i}`;
  });

  // Step 1: Build nodes with section-grouped IDs
  sections.forEach((section, colIdx) => {
    const sectionId = sectionIdMap[section.section];

    section.topics.forEach((topic, rowIdx) => {
      const nodeId = `${sectionId}-topic-${rowIdx}`;
      nodeMap[`${section.section}-${topic}`] = nodeId;

      nodes.push({
        id: nodeId,
        data: { label: topic },
        position: {
          x: colIdx * colGap,
          y: rowIdx * rowGap,
        },
        type: 'default',
      });

      // Add vertical edge (within same section)
      if (rowIdx > 0) {
        const prevId = `${sectionId}-topic-${rowIdx - 1}`;
        edges.push({
          id: `e-${prevId}-${nodeId}`,
          source: prevId,
          target: nodeId,
          type: 'smoothstep',
        });
      }
    });
  });

  // Step 2: Add logical cross-section links (one per section transition)
  for (let i = 0; i < sections.length - 1; i++) {
    const fromSec = sections[i];
    const toSec = sections[i + 1];

    const fromLastTopic = fromSec.topics[fromSec.topics.length - 1];
    const toFirstTopic = toSec.topics[0];

    const fromId = nodeMap[`${fromSec.section}-${fromLastTopic}`];
    const toId = nodeMap[`${toSec.section}-${toFirstTopic}`];

    if (fromId && toId) {
      edges.push({
        id: `e-${fromId}-${toId}`,
        source: fromId,
        target: toId,
        type: 'smoothstep',
      });
    }
  }

  return { nodes, edges };
}

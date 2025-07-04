import React from 'react';
import { useRouter } from 'next/navigation';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';

export default function FlowchartCanvas({
  nodes,
  edges,
}: {
  nodes: Node[];
  edges: Edge[];
}) {
  const router = useRouter();

  const enhancedNodes = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      label: (
        <button
          onClick={() => router.push(`/learn?topic=${encodeURIComponent(node.data.label)}`)}
          className="text-sm px-2 py-1 hover:underline hover:text-indigo-600 transition"
        >
          {node.data.label}
        </button>
      ),
    },
  }));

  return (
    <div
      style={{ height: '600px', width: '100%' }}
      className="bg-white rounded-xl border shadow-md overflow-hidden"
    >
      <ReactFlow
        nodes={enhancedNodes}
        edges={edges}
        fitView
        panOnScroll
        zoomOnScroll
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
          style: {
            stroke: '#4b5563',
            strokeWidth: 2,
          },
        }}
        nodeOrigin={[0.5, 0.5]}
      >
        <MiniMap
          nodeStrokeColor={() => '#4f46e5'}
          nodeColor={() => '#c7d2fe'}
          nodeBorderRadius={6}
        />
        <Controls showInteractive={false} />
        <Background gap={16} size={1} color="#e5e7eb" />
      </ReactFlow>
    </div>
  );
}

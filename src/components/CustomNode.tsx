// components/CustomNode.tsx
'use client';

import React from 'react';
import { Handle, Position } from 'reactflow';
import { useRouter } from 'next/navigation';
import { Tooltip } from 'react-tooltip';

export default function CustomNode({ data, id }: any) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/learn?topic=${encodeURIComponent(data.label)}`);
  };

  return (
    <div className="relative group cursor-pointer" onClick={handleClick}>
      <div className="bg-white border border-gray-300 rounded-md px-4 py-2 shadow hover:shadow-lg transition-all duration-200 text-sm text-gray-800">
        {data.label}
      </div>
      <Tooltip id={`tip-${id}`} place="top" content={`Click to learn about ${data.label}`} />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

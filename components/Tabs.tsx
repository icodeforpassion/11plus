'use client';

import { ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  initialId?: string;
}

export function Tabs({ items, initialId }: TabsProps) {
  const [active, setActive] = useState(initialId ?? items[0]?.id);

  if (!items.length) return null;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist">
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={active === item.id}
            className={twMerge(
              'rounded-full border border-transparent px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              active === item.id ? 'bg-primary text-white' : 'bg-white text-text hover:border-primary'
            )}
            onClick={() => setActive(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div key={item.id} role="tabpanel" hidden={active !== item.id} className="mt-4">
          {item.content}
        </div>
      ))}
    </div>
  );
}

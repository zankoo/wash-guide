'use client';

import { useId, useState, type ReactNode } from 'react';

/** 流程步骤的多种可选做法，内容由服务端渲染后传入 */
export function VariantTabs({ variants }: { variants: { label: string; content: ReactNode }[] }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  return (
    <>
      <div className="vtabs" role="tablist">
        {variants.map((v, i) => (
          <button
            key={v.label}
            type="button"
            role="tab"
            id={`${id}-t${i}`}
            aria-controls={`${id}-p`}
            aria-selected={i === selected}
            onClick={() => setSelected(i)}
          >
            {v.label}
          </button>
        ))}
      </div>
      <div className="vbox" role="tabpanel" id={`${id}-p`} aria-labelledby={`${id}-t${selected}`}>
        {variants[selected].content}
      </div>
    </>
  );
}

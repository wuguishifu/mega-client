import { Fragment } from 'react';

import { SidebarMenuBadge } from '../ui/sidebar';

export function ChordBadge({ children, wrapped = true }: { children: [string] | [string, string]; wrapped?: boolean }) {
  if (children.length === 1) {
    return <span className="border px-1 rounded-sm">{children[0]}</span>;
  }

  const Wrapper = wrapped ? SidebarMenuBadge : Fragment;

  return (
    <Wrapper>
      <div className="flex gap-1 items-center opacity-0 group-hover/menu-item:opacity-50">
        <div className="border w-4 rounded-sm flex justify-center">{children[0]}</div>
        <span>then</span>
        <div className="border w-4 rounded-sm flex justify-center">{children[1]}</div>
      </div>
    </Wrapper>
  );
}

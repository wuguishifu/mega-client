import React from 'react';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb';

type Breadcrumb = {
  url: string;
  title: string;
};

export function AppBreadcrumbs({ children }: { children: Breadcrumb[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {children.map(({ url, title }, i, items) => {
          return (
            <React.Fragment key={url}>
              <BreadcrumbItem>
                <BreadcrumbLink href={url}>{title}</BreadcrumbLink>
              </BreadcrumbItem>
              {i < items.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

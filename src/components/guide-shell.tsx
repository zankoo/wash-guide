import type { ReactNode } from 'react';
import { FilterBar } from './filter-bar';
import { Footer, Masthead } from './hero';
import { Sidebar } from './sidebar';
import { ViewTabs } from './view-tabs';

/** 共用界面，各路由在外层提供自己需要的目录数据。 */
export function GuideShell({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <Sidebar />
      <div className="main-col">
        <Masthead />
        <FilterBar />
        <div className="wrap"><main>{children}</main></div>
        <Footer />
      </div>
      <ViewTabs className="tabs bottom" />
    </div>
  );
}

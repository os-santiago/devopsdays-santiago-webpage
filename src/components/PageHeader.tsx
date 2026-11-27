import type { ReactNode } from "react";

const PageHeader = ({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) => (
  <div className="reveal mb-14 text-center">
    <p className="eyebrow">{eyebrow}</p>
    <h1 className="mb-4 mt-4 text-4xl font-extrabold md:text-6xl">{title}</h1>
    {children && <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{children}</p>}
  </div>
);

export default PageHeader;

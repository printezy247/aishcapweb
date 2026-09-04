import { Fragment } from "react";

export interface ProseSection {
  title: string;
  body: string[];
}

/** Renders an array of {title, body[]} sections as h2 + paragraphs. */
export function ProseSections({ sections }: { sections: ProseSection[] }) {
  return (
    <>
      {sections.map((s) => (
        <Fragment key={s.title}>
          <h2 className="text-section mt-10 first:mt-0">{s.title}</h2>
          {s.body.map((p, i) => (
            <p key={i} className="mt-4 text-platinum/90">
              {p}
            </p>
          ))}
        </Fragment>
      ))}
    </>
  );
}

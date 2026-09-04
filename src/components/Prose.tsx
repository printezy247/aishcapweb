import { Fragment } from "react";

export interface ProseSection {
  title: string;
  body: string[];
}

/** Renders an array of {title, body[]} sections as h2 + paragraphs. */
export function ProseSections({ sections, level = 2 }: { sections: ProseSection[]; level?: 2 | 3 }) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <>
      {sections.map((s) => (
        <Fragment key={s.title}>
          <Heading className={level === 2 ? "text-section mt-10 first:mt-0" : "mt-8 font-semibold"}>
            {s.title}
          </Heading>
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

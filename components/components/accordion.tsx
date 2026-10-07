import React from "react";
import { HiChevronDown } from "react-icons/hi";

type AccordionItem = {
  title: React.ReactNode;
  content: React.ReactNode;
};

// Un seul panneau ouvert à la fois. La hauteur s'anime via grid-template-rows
// (0fr → 1fr), ce qui évite de mesurer le contenu en JS.
export const Accordion = ({ items }: { items: AccordionItem[] }) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const id = React.useId();

  return (
    <div className="w-full py-2 px-4">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <h2>
              <button
                type="button"
                id={`${id}-title-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-panel-${i}`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between py-2 text-left font-medium text-gray-500 transition-colors hover:text-ternary"
              >
                <span>{item.title}</span>
                <HiChevronDown
                  aria-hidden
                  className={`h-6 w-6 shrink-0 transition-transform duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h2>
            <div
              id={`${id}-panel-${i}`}
              role="region"
              aria-labelledby={`${id}-title-${i}`}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              {/* inert : le contenu replié ne reçoit ni focus ni lecteur d'écran. */}
              <div
                className="overflow-hidden"
                ref={(el) => {
                  if (el) el.inert = !isOpen;
                }}
              >
                <div className="py-5">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

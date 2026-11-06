import { Link } from "@tanstack/react-router";

import assayValidation from "@/assets/assay-validation.png";
import costModel from "@/assets/cost-model.png";
import floorPlan from "@/assets/floor-plan.png";
import licensingPermits from "@/assets/licensing-permits.png";
import metaphase from "@/assets/metaphase-spread.jpg";
import binders from "@/assets/sop-binders.jpg";
import { ArrowBox } from "@/components/site/Cta";
import { EASE, FadeUp } from "@/components/site/motion";
import { homeServices } from "@/content/site";

type Visual = (typeof homeServices)[number]["visual"];

export function ServiceCards() {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {homeServices.map((s, i) => (
        <FadeUp key={s.title} delay={(i % 2) * 0.08}>
          <Link
            to="/services"
            className="group flex h-full flex-col rounded-[4px] bg-paper p-6 text-ink transition-transform duration-700 ease-out-expo hover:-translate-y-1 md:p-8"
          >
            <div className="grid gap-4 md:grid-cols-[8.5rem_1fr]">
              <span className="label-mono text-muted-foreground">
                S—0{i + 1}
                <br />
                {s.label}
              </span>
              <div>
                <h3 className="text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.08] tracking-[-0.04em]">{s.title}</h3>
                <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </div>

            <div className="my-8 flex-1">
              <ServiceVisual kind={s.visual} />
            </div>

            <div className="flex items-end justify-between gap-4">
              <ArrowBox />
              <ul className="flex flex-wrap justify-end gap-1.5">
                {s.tags.map((t) => (
                  <li key={t} className="label-mono inline-flex items-center gap-1.5 rounded-[3px] bg-mist px-2 py-1">
                    <span className="size-1.5 bg-mist-deep" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        </FadeUp>
      ))}
    </div>
  );
}

function ServiceVisual({ kind }: { kind: Visual }) {
  switch (kind) {
    case "cost":
      return (
        <Photo
          src={costModel}
          alt="3D render comparing Reference Laboratory costs with In-House Assay costs"
        />
      );
    case "flow":
      return (
        <Photo
          src={floorPlan}
          alt="3D render of laboratory floor plan with clean pre- and post-PCR workflow and reagent prep station"
        />
      );
    case "route":
      return (
        <Photo
          src={licensingPermits}
          alt="3D render of CLIA and CAP licensing dossier boxes with clinical sample test tubes"
        />
      );
    case "report":
      return (
        <Photo
          src={assayValidation}
          alt="3D render of assay validation bench with clinical instrument and New York State LDT submission package"
        />
      );
    case "binders":
      return <Photo src={binders} alt="A row of quality manuals and SOP binders with blue index tabs" />;
    case "spread":
      return <Photo src={metaphase} alt="A spread of metaphase chromosomes, the basis of a karyotype report" />;
  }
}

function Photo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="h-56 overflow-hidden rounded-[3px] bg-mist md:h-64">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
      />
    </div>
  );
}

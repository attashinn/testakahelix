import {
  ArrowClockwise,
  Calculator,
  CurrencyDollar,
  Sparkle,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

import { EASE } from "@/components/site/motion";
import { cn } from "@/lib/utils";

interface Preset {
  name: string;
  monthlyVolume: number;
  sendOutFee: number;
  reagentCost: number;
  laborCost: number;
  capitalInvestment: number;
}

const PRESETS: Preset[] = [
  {
    name: "SMA SMN1/SMN2 qPCR Screening",
    monthlyVolume: 420,
    sendOutFee: 350,
    reagentCost: 48,
    laborCost: 24,
    capitalInvestment: 65000,
  },
  {
    name: "54-Gene Myeloid Malignancy NGS Panel",
    monthlyVolume: 120,
    sendOutFee: 1450,
    reagentCost: 380,
    laborCost: 110,
    capitalInvestment: 185000,
  },
  {
    name: "NGS Transplant Donor Chimerism",
    monthlyVolume: 150,
    sendOutFee: 850,
    reagentCost: 195,
    laborCost: 65,
    capitalInvestment: 75000,
  },
  {
    name: "Prenatal & Constitutional FISH",
    monthlyVolume: 180,
    sendOutFee: 490,
    reagentCost: 85,
    laborCost: 45,
    capitalInvestment: 40000,
  },
];

export function SendOutCalculator() {
  const [selectedPreset, setSelectedPreset] = useState<string>(PRESETS[0]!.name);
  const [monthlyVolume, setMonthlyVolume] = useState<number>(PRESETS[0]!.monthlyVolume);
  const [sendOutFee, setSendOutFee] = useState<number>(PRESETS[0]!.sendOutFee);
  const [reagentCost, setReagentCost] = useState<number>(PRESETS[0]!.reagentCost);
  const [laborCost, setLaborCost] = useState<number>(PRESETS[0]!.laborCost);
  const [capitalInvestment, setCapitalInvestment] = useState<number>(PRESETS[0]!.capitalInvestment);

  const applyPreset = (preset: Preset) => {
    setSelectedPreset(preset.name);
    setMonthlyVolume(preset.monthlyVolume);
    setSendOutFee(preset.sendOutFee);
    setReagentCost(preset.reagentCost);
    setLaborCost(preset.laborCost);
    setCapitalInvestment(preset.capitalInvestment);
  };

  const calculations = useMemo(() => {
    const annualVolume = monthlyVolume * 12;
    const annualSendOutCost = annualVolume * sendOutFee;
    const inHouseCostPerTest = reagentCost + laborCost;
    const annualInHouseRunCost = annualVolume * inHouseCostPerTest;
    const grossAnnualSavings = annualSendOutCost - annualInHouseRunCost;
    const savingsPercent = Math.round((grossAnnualSavings / (annualSendOutCost || 1)) * 100);

    const monthlyGrossSavings = grossAnnualSavings / 12;
    const breakEvenMonths =
      monthlyGrossSavings > 0
        ? Math.max(1, Math.ceil(capitalInvestment / monthlyGrossSavings))
        : 999;

    const threeYearNetSavings = grossAnnualSavings * 3 - capitalInvestment;

    return {
      annualVolume,
      annualSendOutCost,
      inHouseCostPerTest,
      annualInHouseRunCost,
      grossAnnualSavings,
      savingsPercent,
      breakEvenMonths,
      threeYearNetSavings,
    };
  }, [monthlyVolume, sendOutFee, reagentCost, laborCost, capitalInvestment]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-border pb-6">
        <div>
          <span className="label-mono text-muted-foreground">Clinical Financial Engineering</span>
          <h1 className="mt-1 font-display text-2xl font-normal tracking-[-0.03em] text-foreground sm:text-3xl">
            Send-Out In-Housing Financial Model
          </h1>
          <p className="mt-1 text-[0.875rem] text-muted-foreground">
            Evaluating laboratory ROI, reference lab fee displacement, and capital equipment break-even timelines.
          </p>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar rounded-[3px] border border-border bg-paper p-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => applyPreset(p)}
              className={cn(
                "rounded-[3px] px-3 py-1 text-[0.75rem] font-medium transition-colors cursor-pointer shrink-0",
                selectedPreset === p.name
                  ? "bg-foreground text-paper"
                  : "text-muted-foreground hover:bg-mist hover:text-foreground",
              )}
            >
              {p.name.split(" ")[0]} Model
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Inputs (5 cols) */}
        <div className="rounded-[3px] border border-border bg-paper p-6 lg:col-span-5 space-y-6">
          <div className="border-b border-border pb-3">
            <span className="label-mono text-muted-foreground">Variables</span>
            <h2 className="mt-0.5 text-base font-medium text-foreground">
              Volume & Benchmark Economics
            </h2>
          </div>

          <div className="space-y-5 text-[0.8125rem]">
            <div>
              <div className="flex justify-between items-baseline">
                <label className="text-[0.75rem] font-mono uppercase text-muted-foreground">
                  Monthly Sample Volume
                </label>
                <span className="font-mono text-base font-semibold text-blue">
                  {monthlyVolume} tests/mo
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="1200"
                step="10"
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                className="mt-2.5 w-full accent-blue cursor-pointer"
              />
              <span className="font-mono text-[0.6875rem] text-muted-foreground">
                Annual volume: {calculations.annualVolume.toLocaleString()} samples
              </span>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <label className="text-[0.75rem] font-mono uppercase text-muted-foreground">
                  Current Reference Lab Price ($ / test)
                </label>
                <span className="font-mono text-base font-semibold text-foreground">
                  ${sendOutFee}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="2500"
                step="25"
                value={sendOutFee}
                onChange={(e) => setSendOutFee(Number(e.target.value))}
                className="mt-2.5 w-full accent-blue cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
              <div>
                <label className="block text-[0.6875rem] font-mono uppercase text-muted-foreground">
                  Reagents & Kits ($/test)
                </label>
                <input
                  type="number"
                  value={reagentCost}
                  onChange={(e) => setReagentCost(Number(e.target.value))}
                  className="mt-1.5 w-full rounded-[3px] border border-border px-3 py-1.5 font-mono text-sm focus:border-blue focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[0.6875rem] font-mono uppercase text-muted-foreground">
                  Labor & Overhead ($/test)
                </label>
                <input
                  type="number"
                  value={laborCost}
                  onChange={(e) => setLaborCost(Number(e.target.value))}
                  className="mt-1.5 w-full rounded-[3px] border border-border px-3 py-1.5 font-mono text-sm focus:border-blue focus:outline-hidden"
                />
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <label className="block text-[0.6875rem] font-mono uppercase text-muted-foreground">
                Capital Sourcing & Validation Dossier ($)
              </label>
              <input
                type="number"
                value={capitalInvestment}
                onChange={(e) => setCapitalInvestment(Number(e.target.value))}
                className="mt-1.5 w-full rounded-[3px] border border-border px-3 py-1.5 font-mono text-sm focus:border-blue focus:outline-hidden"
              />
              <span className="mt-1 block text-[0.6875rem] text-muted-foreground">
                Amortized instrument procurement, validation samples, and NYSDOH dossier.
              </span>
            </div>
          </div>
        </div>

        {/* Right Output Analysis (7 cols) */}
        <div className="rounded-[3px] border border-border bg-paper p-6 lg:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <span className="label-mono text-muted-foreground">Synthesis</span>
                <h2 className="mt-0.5 text-base font-medium text-foreground">
                  Hospital Operational Savings
                </h2>
              </div>
              <span className="rounded-[3px] border border-blue/20 bg-blue-soft px-2.5 py-0.5 font-mono text-[0.75rem] font-medium text-blue">
                {calculations.savingsPercent}% Cost Reduction
              </span>
            </div>

            {/* Metrics */}
            <div className="mt-6 grid grid-cols-2 gap-px bg-border rounded-[3px] overflow-hidden border border-border sm:grid-cols-3">
              <div className="bg-paper p-4">
                <span className="label-mono text-muted-foreground">Send-Out Spend</span>
                <div className="mt-2 font-mono text-xl font-light text-foreground">
                  ${calculations.annualSendOutCost.toLocaleString()}
                </div>
                <span className="font-mono text-[0.6875rem] text-muted-foreground">per year external</span>
              </div>

              <div className="bg-paper p-4">
                <span className="label-mono text-muted-foreground">In-House Cost</span>
                <div className="mt-2 font-mono text-xl font-light text-foreground">
                  ${calculations.annualInHouseRunCost.toLocaleString()}
                </div>
                <span className="font-mono text-[0.6875rem] text-muted-foreground">
                  ${calculations.inHouseCostPerTest}/test run cost
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-paper p-4">
                <span className="label-mono text-blue">Retained Annually</span>
                <div className="mt-2 font-mono text-xl font-medium text-blue">
                  ${calculations.grossAnnualSavings.toLocaleString()}
                </div>
                <span className="font-mono text-[0.6875rem] text-muted-foreground">net annual savings</span>
              </div>
            </div>

            {/* Break-Even Timeline */}
            <div className="mt-6 rounded-[3px] border border-border bg-mist/20 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-sans text-[0.875rem] font-medium text-foreground">
                    Break-Even Timeline
                  </span>
                  <p className="text-[0.75rem] text-muted-foreground">
                    Months to completely amortize instrumentation and validation package.
                  </p>
                </div>
                <span className="font-mono text-lg font-medium text-blue">
                  {calculations.breakEvenMonths} Months
                </span>
              </div>

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-mist">
                <div
                  className="h-full bg-blue transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    width: `${Math.min(100, Math.max(10, (12 / calculations.breakEvenMonths) * 50))}%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between border-t border-border pt-3 text-[0.8125rem]">
                <span className="text-muted-foreground">3-Year Cumulative Retained Margin:</span>
                <span className="font-mono font-medium text-foreground">
                  +${calculations.threeYearNetSavings.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[3px] border border-border bg-mist/40 p-3.5 font-mono text-[0.75rem] text-muted-foreground leading-relaxed">
            Case Benchmark: In Dr. Azad’s real-time SMA implementation, in-house test cost was reduced by 67% compared to reference laboratory billing, while reducing patient report turnaround time from 10 days to under 48 hours.
          </div>
        </div>
      </div>
    </div>
  );
}

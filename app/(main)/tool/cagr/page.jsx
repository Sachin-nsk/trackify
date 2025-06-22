"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const CAGRCalculator = () => {
  const [invested, setInvested] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [years, setYears] = useState("");
  const [cagr, setCagr] = useState(0);

  const handleFormattedInput = (value, setter) => {
    const clean = value.replace(/[^\d]/g, "");
    if (clean === "") {
      setter("");
    } else {
      const formatted = parseInt(clean, 10).toLocaleString("en-IN");
      setter(formatted);
    }
  };

  useEffect(() => {
    const P = parseFloat(invested.replace(/,/g, ""));
    const A = parseFloat(finalValue.replace(/,/g, ""));
    const T = parseFloat(years);

    if (!isNaN(P) && !isNaN(A) && !isNaN(T) && T > 0 && P > 0 && A > P) {
      const result = (Math.pow(A / P, 1 / T) - 1) * 100;
      setCagr(result);
    } else {
      setCagr(0);
    }
  }, [invested, finalValue, years]);

  return (
    <Card className="max-w-2xl mx-auto p-6 mt-10">
      <CardHeader>
        <CardTitle>CAGR Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="mb-1">Invested Amount (₹)</p>
          <Input
            type="text"
            value={invested}
            onChange={(e) =>
              handleFormattedInput(e.target.value, setInvested)
            }
            placeholder="e.g., 100000"
          />
        </div>

        <div>
          <p className="mb-1">Final Amount (₹)</p>
          <Input
            type="text"
            value={finalValue}
            onChange={(e) =>
              handleFormattedInput(e.target.value, setFinalValue)
            }
            placeholder="e.g., 200000"
          />
        </div>

        <div>
          <p className="mb-1">Time Period (in years)</p>
          <Input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="e.g., 5"
          />
        </div>

        <div className="pt-4">
          <p className="text-lg font-semibold">
            CAGR: {cagr > 0 ? `${cagr.toFixed(2)}%` : "—"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CAGRCalculator;

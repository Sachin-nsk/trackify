"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FDCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [frequency, setFrequency] = useState("yearly");

  const [maturityAmount, setMaturityAmount] = useState(0);
  const [interestEarned, setInterestEarned] = useState(0);

  const freqMap = {
    yearly: 1,
    halfyearly: 2,
    quarterly: 4,
    monthly: 12,
  };

  useEffect(() => {
    const P = parseFloat(principal.replace(/,/g, ""));
    const R = parseFloat(rate);
    const T = parseFloat(years);
    const N = freqMap[frequency];

    if (!isNaN(P) && !isNaN(R) && !isNaN(T)) {
      const A = P * Math.pow(1 + R / (100 * N), N * T);
      const interest = A - P;

      setMaturityAmount(A);
      setInterestEarned(interest);
    } else {
      setMaturityAmount(0);
      setInterestEarned(0);
    }
  }, [principal, rate, years, frequency]);

  const handleNumericInput = (val, setter) => {
    const clean = val.replace(/[^\d]/g, "");
    if (clean === "") {
      setter("");
    } else {
      const formatted = parseInt(clean, 10).toLocaleString("en-IN");
      setter(formatted);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 mt-10">
      <CardHeader>
        <CardTitle>FD Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="mb-1">Principal Amount (₹)</p>
          <Input
            type="text"
            value={principal}
            onChange={(e) => handleNumericInput(e.target.value, setPrincipal)}
            placeholder="e.g., 100000"
          />
        </div>

        <div>
          <p className="mb-1">Interest Rate (per year %)</p>
          <Input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="e.g., 7.5"
            min="0"
            step="0.1"
          />
        </div>

        <div>
          <p className="mb-1">Time Period (in years)</p>
          <Input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="e.g., 5"
            min="0"
          />
        </div>

        <div>
          <p className="mb-1">Compounding Frequency</p>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yearly">Yearly</SelectItem>
              <SelectItem value="halfyearly">Half-Yearly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-4 space-y-1">
          <p>Maturity Amount: ₹{maturityAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
          <p>Interest Earned: ₹{interestEarned.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FDCalculator;

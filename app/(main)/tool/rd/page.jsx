"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const RDCalculator = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000)
  const [interestRate, setInterestRate] = useState(7)
  const [years, setYears] = useState(5)

  const n = 12
  const r = interestRate / 100
  const t = years

  // Formula
  const maturity =
    monthlyDeposit *
    ((Math.pow(1 + r / n, n * t) - 1) / (1 - Math.pow(1 + r / n, -1)))

  const totalInvested = monthlyDeposit * 12 * t
  const returns = maturity - totalInvested
  const absoluteReturn = (returns / totalInvested) * 100

  return (
    <Card className="max-w-xl mx-auto mt-10 p-4">
      <CardHeader>
        <CardTitle>RD Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">

        {/* Monthly Deposit */}
        <div>
          <p className="mb-1 font-medium">Monthly Deposit (₹)</p>
          <Input
            type="number"
            value={monthlyDeposit}
            onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
          />
        </div>

        {/* Interest Rate */}
        <div>
          <p className="mb-1 font-medium">Interest Rate (Yearly %)</p>
          <Input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
        </div>

        {/* Time Period in Years with Increment/Decrement */}
        <div className="flex items-center gap-3">
          <p className="font-medium">Time Period (Years): {years}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setYears((y) => Math.max(0, y - 1))}
          >
            -
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setYears((y) => Math.min(60, y + 1))}
          >
            +
          </Button>
        </div>

        {/* Result */}
        <div className="mt-6 space-y-2">
          <p className="text-sm">Invested Amount: ₹{totalInvested.toFixed(2)}</p>
          <p className="text-sm">Maturity Amount: ₹{maturity.toFixed(2)}</p>
          <p className="text-sm">Returns Earned: ₹{returns.toFixed(2)}</p>
          <p className="text-sm">Absolute Returns: {absoluteReturn.toFixed(2)}%</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default RDCalculator

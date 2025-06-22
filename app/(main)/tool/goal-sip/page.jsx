"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const GoalSIPCalculator = () => {
  const [goalAmount, setGoalAmount] = useState(1000000)
  const [interestRate, setInterestRate] = useState(12)
  const [years, setYears] = useState(10)

  const n = years * 12
  const r = interestRate / 100 / 12

  const monthlySIP = (goalAmount * r) / (Math.pow(1 + r, n) - 1)

  const totalInvested = monthlySIP * n
  const returnsEarned = goalAmount - totalInvested
  const absoluteReturn = (returnsEarned / totalInvested) * 100

  return (
    <Card className="max-w-xl mx-auto mt-10 p-4">
      <CardHeader>
        <CardTitle>Goal SIP Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">

        {/* Goal Amount */}
        <div>
          <p className="mb-1 font-medium">Target Goal Amount (₹)</p>
          <Input
            type="number"
            value={goalAmount}
            onChange={(e) => setGoalAmount(Number(e.target.value))}
          />
        </div>

        {/* Expected Interest Rate */}
        <div>
          <p className="mb-1 font-medium">Expected Annual Return (%)</p>
          <Input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
        </div>

        {/* Time Period */}
        <div className="flex items-center gap-3">
          <p className="font-medium">Time Period (Years): {years}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setYears((y) => Math.max(1, y - 1))}
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

        {/* Results */}
        <div className="mt-6 space-y-2">
          <p className="text-sm">Required Monthly SIP: ₹{monthlySIP.toFixed(2)}</p>
          <p className="text-sm">Total Invested: ₹{totalInvested.toFixed(2)}</p>
          <p className="text-sm">Returns Earned: ₹{returnsEarned.toFixed(2)}</p>
          <p className="text-sm">Absolute Return: {absoluteReturn.toFixed(2)}%</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default GoalSIPCalculator

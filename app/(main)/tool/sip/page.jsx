"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const SIPCalculator = () => {
  const [method, setMethod] = useState("sip")
  const [monthlyAmount, setMonthlyAmount] = useState(5000)
  const [stepUpPercent, setStepUpPercent] = useState(10)
  const [returns, setReturns] = useState(12)
  const [years, setYears] = useState(10)

  const months = years * 12
  const rate = returns / 100 / 12

  let invested = 0
  let futureValue = 0

  if (method === "sip") {
    invested = monthlyAmount * months
    futureValue =
      monthlyAmount * ((Math.pow(1 + rate, months) - 1) * (1 + rate)) / rate
  } else {
    for (let i = 0; i < years; i++) {
      const amt = monthlyAmount * Math.pow(1 + stepUpPercent / 100, i)
      invested += amt * 12
      futureValue += amt * ((Math.pow(1 + rate, 12) - 1) * (1 + rate)) / rate * Math.pow(1 + rate, (years - i - 1) * 12)
    }
  }

  const returnsEarned = futureValue - invested
  const absoluteReturn = (returnsEarned / invested) * 100

  return (
    <Card className="max-w-xl mx-auto mt-10 p-4">
      <CardHeader>
        <CardTitle>SIP Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">

        {/* Investment Method Select */}
        <div>
          <p className="mb-1 font-medium">Investment Method</p>
          <Select value={method} onValueChange={setMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Select Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sip">SIP</SelectItem>
              <SelectItem value="stepup">Step-up SIP</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Monthly SIP Amount */}
        <div>
          <p className="mb-1 font-medium">Monthly SIP Amount (₹)</p>
          <Input
            type="number"
            value={monthlyAmount}
            onChange={(e) => setMonthlyAmount(Number(e.target.value))}
          />
        </div>

        {/* Step-up Percentage */}
        {method === "stepup" && (
          <div>
            <p className="mb-1 font-medium">Step-up % per year</p>
            <Input
              type="number"
              value={stepUpPercent}
              onChange={(e) => setStepUpPercent(Number(e.target.value))}
            />
          </div>
        )}

        {/* Expected Returns */}
        <div>
          <p className="mb-1 font-medium">Expected Returns (Yearly %)</p>
          <Input
            type="number"
            value={returns}
            onChange={(e) => setReturns(Number(e.target.value))}
          />
        </div>

        {/* Years Input (as range-like with buttons) */}
        <div className="flex items-center gap-3">
          <p className="font-medium">Time Period (Years): {years}</p>
          <Button variant="outline" size="sm" onClick={() => setYears((y) => Math.max(0, y - 1))}>-</Button>
          <Button variant="outline" size="sm" onClick={() => setYears((y) => Math.min(60, y + 1))}>+</Button>
        </div>

        {/* Result */}
        <div className="mt-6 space-y-2">
          <p className="text-sm">Invested Amount: ₹{invested.toFixed(2)}</p>
          <p className="text-sm">Total Value: ₹{futureValue.toFixed(2)}</p>
          <p className="text-sm">Returns Earned: ₹{returnsEarned.toFixed(2)}</p>
          <p className="text-sm">Absolute Returns: {absoluteReturn.toFixed(2)}%</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default SIPCalculator

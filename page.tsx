"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Report {
  id: string
  customerName: string
  items: string[]
  total: number
  date: string
  status: string
}

const sampleReports: Report[] = [
  {
    id: "1",
    customerName: "Ayu",
    items: ["Jaket - Express", "Gorden - Regular"],
    total: 50000,
    date: "26/01/2023",
    status: "Selesai"
  },
  {
    id: "2",
    customerName: "Budi",
    items: ["Jaket - Kilat"],
    total: 20000,
    date: "25/01/2023",
    status: "Selesai"
  }
]

export default function Laporan() {
  const router = useRouter()
  const [showPrintOptions, setShowPrintOptions] = useState(false)
  const [reports] = useState<Report[]>(sampleReports)

  const totalIncome = reports.reduce((sum, report) => sum + report.total, 0)

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => router.back()} className="mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold">Laporan</h1>
            </div>
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-blue-600"
              onClick={() => setShowPrintOptions(true)}
            >
              Cetak Laporan
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Card className="mb-6">
          <div className="p-4">
            <div className="text-sm text-gray-500">Total Pendapatan</div>
            <div className="text-2xl font-bold text-blue-500">
              Rp {totalIncome.toLocaleString()}
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{report.customerName}</div>
                  <div className="text-sm text-gray-500">{report.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-blue-500">
                    Rp {report.total.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-500">{report.status}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {report.items.join(", ")}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={showPrintOptions} onOpenChange={setShowPrintOptions}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pilih Mode Cetak</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="h-32 flex flex-col items-center justify-center space-y-2"
              onClick={() => setShowPrintOptions(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div className="text-sm font-medium">Cetak Nota Konsumen</div>
            </Button>
            <Button 
              variant="outline" 
              className="h-32 flex flex-col items-center justify-center space-y-2"
              onClick={() => setShowPrintOptions(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div className="text-sm font-medium">Cetak Nota Pertinggal</div>
            </Button>
          </div>
          <div className="flex justify-end">
            <Button 
              variant="ghost" 
              onClick={() => setShowPrintOptions(false)}
            >
              Selesai
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}

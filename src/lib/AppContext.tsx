"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface Service {
  id: string
  name: string
  price: number
  duration: string
  icon: string
  steps: string[]
}

interface TransactionItem {
  serviceId: string
  quantity: number
  parfum: string
}

interface Transaction {
  id: string
  customerName: string
  items: TransactionItem[]
  total: number
  date: string
}

interface AppContextType {
  services: Service[]
  transactions: Transaction[]
  addTransaction: (transaction: Transaction) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [services] = useState<Service[]>([
    {
      id: "gorden",
      name: "Gorden",
      price: 25000,
      duration: "3 Hari",
      icon: "🪟",
      steps: ["Cuci", "Kering", "Setrika"]
    },
    {
      id: "jaket",
      name: "Jaket",
      price: 15000,
      duration: "1 Hari",
      icon: "🧥",
      steps: ["Cuci", "Kering", "Setrika"]
    }
  ])

  const [transactions, setTransactions] = useState<Transaction[]>([])

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction])
  }

  return (
    <AppContext.Provider value={{ services, transactions, addTransaction }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

"use client"

import type React from "react"

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = useSession()
  const supabase = useSupabaseClient()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!session) {
      router.push("/login")
    }
  }, [session, router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (!session) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <nav>
          <Link href="/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Dashboard
          </Link>
          <Link href="/profile" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Perfil
          </Link>
          <Link href="/history" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Historial
          </Link>
          <Link href="/deposit" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Depositar
          </Link>
          <button
            onClick={handleSignOut}
            className="block w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Cerrar Sesión
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
          <h1 className="text-xl font-bold">Game Recharge</h1>
          <div>Saldo: $100</div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">{children}</main>
      </div>
    </div>
  )
}


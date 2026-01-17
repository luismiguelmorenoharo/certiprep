'use client'

import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.replace('/login')
      } else {
        setLoading(false)
      }
    }

    checkSession()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  if (loading) {
    return <p>Chargement...</p>
  }

  return (
    <main style={{ padding: '48px', maxWidth: '700px' }}>
      <h1>Bienvenue sur CertiPrep</h1>

      <p style={{ marginTop: '16px' }}>
        CertiPrep vous aide à préparer le TEF grâce à des exercices inspirés
        d’épreuves réelles, avec un retour structuré pour progresser efficacement.
      </p>

      <div style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
        <button onClick={() => router.push('/dashboard/start')}>
          Commencer la préparation
        </button>

        <button onClick={handleLogout}>
          Se déconnecter
        </button>
      </div>
    </main>
  )
}

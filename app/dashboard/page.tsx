'use client'

import { useEffect, useState } from 'react'
import ProtectedRoute from '@/lib/protectedRoute'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const [email, setEmail] = useState<string>('')

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()

      if (!error && data.user) {
        setEmail(data.user.email ?? '')
      }
    }

    fetchUser()
  }, [])

  return (
    <ProtectedRoute>
      <div style={{ padding: 40 }}>
        <h1>Welcome, {email || 'Usuario'}</h1>

        <button
          onClick={async () => {
            await supabase.auth.signOut()
            window.location.href = '/login'
          }}
        >
          Logout
        </button>
      </div>
    </ProtectedRoute>
  )
}

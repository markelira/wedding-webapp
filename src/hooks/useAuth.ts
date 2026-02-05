'use client'

import { useState, useEffect } from 'react'
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)

      if (user) {
        // Check if user is admin
        const adminDoc = await getDoc(doc(db, 'admins', user.uid))
        setIsAdmin(adminDoc.exists())
      } else {
        setIsAdmin(false)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
    setIsAdmin(false)
  }

  return { user, isAdmin, loading, login, logout }
}

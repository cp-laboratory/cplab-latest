"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

interface Notification {
  id: string
  title: string
  body: string
  image?: string
  icon: string
  link?: string
  sentAt: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  isSubscribed: boolean
  isCheckingSubscription: boolean
  isLoading: boolean
  fetchNotifications: () => Promise<void>
  checkSubscriptionStatus: () => Promise<void>
  subscribeToPush: () => Promise<void>
  unsubscribeFromPush: () => Promise<void>
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => Promise<void>
  deleteAllNotifications: () => Promise<void>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch(`/api/push/notifications?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
      })
      const data = await response.json()
      
      if (data.notifications && Array.isArray(data.notifications)) {
        setNotifications(data.notifications)
        
        const readNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]')
        const unread = data.notifications.filter((n: Notification) => !readNotifications.includes(n.id))
        setUnreadCount(unread.length)
      } else {
        setNotifications([])
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
      setNotifications([])
    }
  }, [])

  const checkSubscriptionStatus = useCallback(async () => {
    setIsCheckingSubscription(true)
    try {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        const registration = await navigator.serviceWorker.ready
        const subscription = await registration.pushManager.getSubscription()
        setIsSubscribed(!!subscription)
      } else {
        setIsSubscribed(false)
      }
    } catch (error) {
      console.error('Error checking subscription:', error)
      setIsSubscribed(false)
    } finally {
      setIsCheckingSubscription(false)
    }
  }, [])

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  const subscribeToPush = useCallback(async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      alert('Push notifications are not supported in your browser')
      return
    }

    setIsLoading(true)
    try {
      const permission = await Notification.requestPermission()
      
      if (permission !== 'granted') {
        alert('Notification permission denied')
        setIsLoading(false)
        return
      }

      const registration = await navigator.serviceWorker.ready

      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      if (!vapidPublicKey) {
        alert('VAPID public key not configured')
        console.error('NEXT_PUBLIC_VAPID_PUBLIC_KEY is not set')
        setIsLoading(false)
        return
      }

      const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      })

      const response = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save subscription')
      }

      setIsSubscribed(true)
      alert('Successfully subscribed to notifications!')
    } catch (error) {
      console.error('Error subscribing to push:', error)
      alert('Failed to subscribe to notifications')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const unsubscribeFromPush = useCallback(async () => {
    setIsLoading(true)
    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()

      if (subscription) {
        const endpoint = subscription.endpoint
        await subscription.unsubscribe()

        await fetch('/api/push/unsubscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ endpoint }),
        })
      }

      setIsSubscribed(false)
      alert('Successfully unsubscribed from notifications')
    } catch (error) {
      console.error('Error unsubscribing:', error)
      alert('Failed to unsubscribe')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const markAsRead = useCallback((id: string) => {
    const readNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]')
    if (!readNotifications.includes(id)) {
      readNotifications.push(id)
      localStorage.setItem('readNotifications', JSON.stringify(readNotifications))
      const unread = notifications.filter((n) => !readNotifications.includes(n.id))
      setUnreadCount(unread.length)
    }
  }, [notifications])

  const markAllAsRead = useCallback(() => {
    const allIds = notifications.map((n) => n.id)
    localStorage.setItem('readNotifications', JSON.stringify(allIds))
    setUnreadCount(0)
  }, [notifications])

  const deleteNotification = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/push/notifications/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setNotifications(prev => prev.filter(n => n.id !== id))
        const readNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]')
        const newReadNotifications = readNotifications.filter((readId: string) => readId !== id)
        localStorage.setItem('readNotifications', JSON.stringify(newReadNotifications))
      }
    } catch (error) {
      console.error('Error deleting notification:', error)
    }
  }, [])

  const deleteAllNotifications = useCallback(async () => {
    try {
      const response = await fetch('/api/push/notifications', {
        method: 'DELETE',
      })

      if (response.ok) {
        setNotifications([])
        setUnreadCount(0)
        localStorage.removeItem('readNotifications')
      }
    } catch (error) {
      console.error('Error deleting all notifications:', error)
    }
  }, [])

  // Initial fetch on mount
  useEffect(() => {
    checkSubscriptionStatus()
    fetchNotifications()
  }, [checkSubscriptionStatus, fetchNotifications])

  // Refresh notifications every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications()
    }, 5 * 60 * 1000) // 5 minutes in milliseconds

    return () => clearInterval(interval)
  }, [fetchNotifications])

  const value = {
    notifications,
    unreadCount,
    isSubscribed,
    isCheckingSubscription,
    isLoading,
    fetchNotifications,
    checkSubscriptionStatus,
    subscribeToPush,
    unsubscribeFromPush,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

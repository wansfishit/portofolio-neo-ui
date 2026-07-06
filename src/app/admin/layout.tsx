import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Panel — Erwansyah Portfolio',
  description: 'Admin panel for managing portfolio content',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div data-accent="yellow" data-theme="dark">
      {children}
    </div>
  )
}

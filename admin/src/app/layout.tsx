import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import { AuthProvider } from '@/contexts/AuthContext'

export const metadata: Metadata = {
    title: 'Blog Admin',
    description: 'Admin panel for blog',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="h-screen bg-gray-50">
                <AuthProvider>
                    <Sidebar />
                    <div className="lg:ml-64">
                        <main className="flex-1">
                            {children}
                        </main>
                    </div>
                </AuthProvider>
            </body>
        </html>
    )
}
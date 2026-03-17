import { AdminProvider } from '@/components/admin-provider'

export const metadata = {
  title: 'Painel Administrativo | Sapore Artesanal',
  description: 'Gerencie pedidos e cardápio da pizzaria',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProvider>
      {children}
    </AdminProvider>
  )
}

import { Users } from '@/app/(admin)/admin/Users'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Admin'
}

export default function AdminPage() {
	return <Users />
}

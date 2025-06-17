import { ManagerContent } from '@/app/(admin)/manager/ManagerContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Manager content'
}

export default function ManagerPage() {
	return <ManagerContent />
}

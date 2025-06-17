import { PremiumContent } from '@/app/(admin)/premium/PremiumContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Premium'
}

export default function PremiumPage() {
	return <PremiumContent />
}

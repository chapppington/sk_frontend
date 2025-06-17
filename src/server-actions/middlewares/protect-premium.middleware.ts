'use server'

import { type NextRequest, NextResponse } from 'next/server'

import { PUBLIC_PAGES } from '@/config/pages/public.config'
import { getTokensFromRequest } from './utils/get-tokens-from-request'
import { jwtVerifyServer } from './utils/jwt-verify'
import { redirectToLoginOrNotFound } from './utils/redirect-to-login-or-404'

export async function protectPremiumPages(request: NextRequest) {
	const tokens = await getTokensFromRequest(request)
	if (!tokens) return redirectToLoginOrNotFound(request)

	const verifiedData = await jwtVerifyServer(tokens.accessToken)
	if (!verifiedData) return redirectToLoginOrNotFound(request)

	if (!verifiedData?.isPremium)
		return NextResponse.redirect(new URL(PUBLIC_PAGES.PLANS, request.url))

	return NextResponse.next()
}

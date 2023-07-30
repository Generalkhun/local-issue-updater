
import { getIssuesDataFromGGSheet } from '@/app/utils/apiHelper'
import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    // add data to sheet
    const issues = await getIssuesDataFromGGSheet()
    return NextResponse.json({ issues })
}
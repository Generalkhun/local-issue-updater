
import { getIssuesDataFromGGSheet } from '@/app/utils/apiHelper'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    // add data to sheet
    const issues = await getIssuesDataFromGGSheet()
    console.log("🚀 ~ file: route.ts:8 ~ GET ~ issues:", issues)
    return NextResponse.json({ issues })
}

import { deleteGoogleSheetIssueData, getIssuesDataFromGGSheet, saveFormToGGSheet } from '@/app/utils/apiHelper'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const formData = await req.json()
    // get issues first to determine the range to delete
    const issues = await getIssuesDataFromGGSheet()
    const rowToDelete = issues.findIndex((issue) => (issue as any).id === formData.id) + 2; // find index start from 0, then plus another 1 for the sheet header ;D
    // delete the row
    const res = await deleteGoogleSheetIssueData(rowToDelete);
    // insert updated data
    await saveFormToGGSheet(formData, rowToDelete)
    return NextResponse.json({ res })
}
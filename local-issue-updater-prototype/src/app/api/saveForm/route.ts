import { saveFormToGGSheet } from '@/app/utils/apiHelper';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req:NextRequest) {
    const formData = await req.json()
    // add data to sheet
    await saveFormToGGSheet(formData)
    return NextResponse.json({ message: 'Saved the form to gg sheet!' })
}
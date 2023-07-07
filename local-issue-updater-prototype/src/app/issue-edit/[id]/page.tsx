'use client'
import IssueForm from '@/component/IssueForm'
import React from 'react'
interface Props {
    params: {
        id: string
    }
}
const Page = ({params}: Props) => {
    return <div>
        <IssueForm/>
    </div>
}

export default Page
'use client'
import IssueForm from '@/component/IssueForm'
import React from 'react'
interface Props {
    params: {
        id: string
    }
}
const Page = ({ params }: Props) => {
    const id = params.id
    const onSaveEditForm = () => {
        console.log('save edit form')
    }
    return <div>
        <h1>แก้ไขข้อมูล ปัญหารหัส: {id}</h1>
        <IssueForm onSaveForm={onSaveEditForm} id={id} />
    </div>
}

export default Page
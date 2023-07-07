'use client'
import IssueForm from '@/component/IssueForm'
import { useRouter } from 'next/navigation'
import React from 'react'
interface Props {
    params: {
        id: string
    }
}
const Page = ({ params }: Props) => {
    const id = params.id
    const router = useRouter()
    const onSaveEditForm = () => {
        console.log('save edit form')
        router.push('/admin-cms-page')
    }
    return <div>
        <h1>แก้ไขข้อมูล ปัญหารหัส: {id}</h1>
        <IssueForm onFormDataChange={() => console.log('hi')} onSaveForm={onSaveEditForm} id={id} />
    </div>
}

export default Page
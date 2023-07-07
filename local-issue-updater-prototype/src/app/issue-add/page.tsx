'use client'
import IssueForm from '@/component/IssueForm'
import React, { useEffect, useState } from 'react'
import { guidGenerator } from '../utils/uiHelper'
interface Props {
  params: {
    id: string
  }
}
const Page = ({ params }: Props) => {
  const id = params.id
  const [generatedIssueId, setGeneratedIssueId] = useState<string>('')
  useEffect(() => {
    if(generatedIssueId) {
      return;
    }
    const newRandomId = guidGenerator();
    setGeneratedIssueId(newRandomId);
  })

  const onSaveAddForm = () => {
    console.log('save add form')
  }
  return <div>
    <h1>เพิ่มปัญหาใหม่ (id: {generatedIssueId})</h1>
    <IssueForm onSaveForm={onSaveAddForm} id={id} />
  </div>
}

export default Page
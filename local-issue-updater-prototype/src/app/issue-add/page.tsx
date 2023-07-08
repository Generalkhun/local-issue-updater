'use client'
import IssueForm from '@/component/IssueForm'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { guidGenerator } from '../utils/uiHelper'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { GoogleSheetDataContext } from '@/contextProvider/googleSheetContextProvider'
interface Props {
  params: {
    id: string
  }
}
const Page = ({ params }: Props) => {
  const router = useRouter()
  const id = params.id
  const [generatedIssueId, setGeneratedIssueId] = useState<string>('')
  const {initializeIssuesSheetData} = useContext(GoogleSheetDataContext)
  const [formData, setFormData] = useState<any>({})
  useEffect(() => {
    if (generatedIssueId) {
      return;
    }
    const newRandomId = guidGenerator();
    setGeneratedIssueId(newRandomId);
  })
  const onFormDataChange = useCallback((updatedFormData: Record<any, any>) => {
    setFormData((prev: any) => ({
      ...prev,
      ...updatedFormData,
    }))
  }, [setFormData])

  const onClickCancel = () => {
    router.push('/admin-cms-page')
  }

  const onSaveAddForm = () => {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1)
    const completedSaveForm = {
      id: generatedIssueId,
      ...formData,
      datetimeReport: localISOTime,
      latestDatetimeUpdate: localISOTime,
    }
    axios
      .post("/api/saveForm", completedSaveForm)
      .then(_ => {
        router.push('/admin-cms-page')
        axios
          .get("/api/getIssuesData")
          .then(res => {
            initializeIssuesSheetData(res.data.issues)
          })
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  return <div>
    <div>
      <button onClick={onClickCancel}>ยกเลิก</button>
      <h1>เพิ่มปัญหาใหม่ (id: {generatedIssueId})</h1>
    </div>
    <IssueForm onFormDataChange={onFormDataChange} onSaveForm={onSaveAddForm} id={id} />
  </div>
}

export default Page
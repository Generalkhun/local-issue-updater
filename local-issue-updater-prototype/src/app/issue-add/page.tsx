'use client'
import IssueForm from '@/component/IssueForm'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { getlocalISOTime, guidGenerator, saveImgToGGDrive } from '../utils/uiHelper'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { GoogleSheetDataContext } from '@/contextProvider/googleSheetContextProvider'
import useInputImageAreaForm from '@/hooks/useInputImageAreaForm'

const Page = () => {
  const router = useRouter()
  const [generatedIssueId, setGeneratedIssueId] = useState<string>('')
  const { initializeIssuesSheetData } = useContext(GoogleSheetDataContext)
  const [formData, setFormData] = useState<any>({})
  const {
    areaImages,
    handleAreaImageChange,
    handleDeleteAreaImage,
  } = useInputImageAreaForm()
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
    const localISOTime = getlocalISOTime()
    const completedSaveForm = {
      id: generatedIssueId,
      ...formData,
      datetimeReport: localISOTime,
      latestDatetimeUpdate: localISOTime,
    }
    /**
     * @todo implement saving image to gg drive correctly. Right now not able to pass the right Blob file with path
     */
    // save img(s) to drive
    // Object.keys(areaImages).forEach((area:string) => {
    //   areaImages[area].forEach((file:File,idx) => {
    //     saveImgToGGDrive(file, `${generatedIssueId}:${area}:${idx}`);
    //   })
    // })
    // save form data to google sheet
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
        console.error(err.message);
      });
  }
  return <div>
    <div>
      <button onClick={onClickCancel}>ยกเลิก</button>
      <h1>เพิ่มปัญหาใหม่ (id: {generatedIssueId})</h1>
    </div>
    <IssueForm
      areaImages={areaImages}
      handleAreaImageChange={handleAreaImageChange}
      handleDeleteAreaImage={handleDeleteAreaImage}
      onFormDataChange={onFormDataChange}
      onSaveForm={onSaveAddForm} />
  </div>
}

export default Page
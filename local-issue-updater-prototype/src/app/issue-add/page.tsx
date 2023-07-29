'use client'
import IssueForm from '@/component/IssueForm'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { getGGDriveImgURLViewWithId, getlocalISOTime, guidGenerator, saveImgToGGDrive } from '../utils/uiHelper'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { GoogleSheetDataContext } from '@/contextProvider/googleSheetContextProvider'
import useInputImageAreaForm from '@/hooks/useInputImageAreaForm'
import { isEmpty } from 'lodash'
import { ImgsInfo, IssueItem } from '@/types'

const Page = () => {
  const router = useRouter()
  const [generatedIssueId, setGeneratedIssueId] = useState<string>('')
  const { initializeIssuesSheetData } = useContext(GoogleSheetDataContext)
  const [formData, setFormData] = useState<any>({})
  const [isSaving, setIsSaving] = useState<boolean>(false)
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

  const onSaveAddForm = async () => {
    setIsSaving(true);
    const localISOTime = getlocalISOTime()
    // save img(s) to drive
    let imgInfoPromises: any = [];
    if (areaImages.length) {
      // make this wait until this code is complete befor saving data to ggsheet
      Object.keys(areaImages).forEach((area: string) => {
        areaImages[area].forEach((file: File, idx) => {
          const imgInfoPromise = saveImgToGGDrive(file, `${generatedIssueId}_${area}_${idx}`)
            .then((res) => {
              const url = getGGDriveImgURLViewWithId(res.imgIdGGdrive);
              const name = res.imgNameGGdrive;
              return {
                url,
                name,
              }
            })
            .catch((error) => {
              console.error("Error saving image:", error);
              return ""; // Return an empty string if there's an error with an image
            });
          imgInfoPromises.push(imgInfoPromise);
        });
      });
    }

    try {
      const imgsInfoResolved = areaImages.length ? await Promise.all(imgInfoPromises) : "";
      const completedSaveForm: IssueItem = {
        id: generatedIssueId,
        ...formData,
        datetimeReport: localISOTime,
        latestDatetimeUpdate: localISOTime,
        imgsInfo: areaImages.length ? JSON.stringify(imgsInfoResolved) : "",
      };

      // save form data to google sheet
      await axios.post("/api/saveForm", completedSaveForm);
      router.push('/admin-cms-page');

      const res = await axios.get("/api/getIssuesData");
      initializeIssuesSheetData(res.data.issues);
    } catch (error) {
      console.error("Error saving form:", error);
    } finally {
      setIsSaving(false);
    }
  };

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
      onSaveForm={onSaveAddForm}
      isSaving={isSaving}

    />
  </div>
}

export default Page
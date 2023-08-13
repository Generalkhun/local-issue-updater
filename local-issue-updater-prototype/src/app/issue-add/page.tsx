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
    if (!isEmpty(areaImages)) {
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
      const imgsInfoResolved = !isEmpty(areaImages) ? await Promise.all(imgInfoPromises) : "";
      const completedSaveForm: IssueItem = {
        id: generatedIssueId,
        ...formData,
        datetimeReport: localISOTime,
        latestDatetimeUpdate: localISOTime,
        imgsInfo: !isEmpty(areaImages) ? JSON.stringify(imgsInfoResolved) : "",
      };

      // save form data to google sheet
      await axios.post("/api/saveForm", completedSaveForm);
      router.push('/admin-cms-page');
      fetch("/api/getIssuesData", { cache: 'no-store' })
        .then(res => {
          res.json()
            .then(res => {
              initializeIssuesSheetData(res.issues)
            })
        })
    } catch (error) {
      console.error("Error saving form:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    <div style={{
      backgroundColor: "#F07B3A",
      width: '100%',
      height: '64px',
      fontSize: '22px',
      fontWeight: 500,
      paddingLeft: '20px',
      color: 'white',
    }}>
      <div style={{
        paddingTop: '15px'
      }}>
        <button style={{
          backgroundColor: 'transparent',
          borderStyle: 'none',
          fontWeight: 800,
          fontSize: '12px',
          color: 'black'
        }} onClick={onClickCancel}>{"< ยกเลิก"}</button>
        <span>เพิ่มปัญหาใหม่</span>
      </div>
    </div>
    <div style={{ 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      }}>
      <IssueForm
        areaImages={areaImages}
        handleAreaImageChange={handleAreaImageChange}
        handleDeleteAreaImage={handleDeleteAreaImage}
        onFormDataChange={onFormDataChange}
        onSaveForm={onSaveAddForm}
        isSaving={isSaving}
      />
    </div>

  </div>
}

export default Page
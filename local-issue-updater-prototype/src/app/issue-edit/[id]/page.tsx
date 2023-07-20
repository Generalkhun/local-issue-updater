'use client'
import { getlocalISOTime, saveImgToGGDrive } from '@/app/utils/uiHelper'
import IssueForm from '@/component/IssueForm'
import { GoogleSheetDataContext } from '@/contextProvider/googleSheetContextProvider'
import useInputImageAreaForm from '@/hooks/useInputImageAreaForm'
import { IssueItem } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { useCallback } from 'react'
interface Props {
    params: {
        id: string
    }
}
const Page = ({ params }: Props) => {
    const id = params.id
    const router = useRouter()
    const { issuesData, initializeIssuesSheetData } = useContext(GoogleSheetDataContext)
    const {
        areaImages,
        handleAreaImageChange,
        handleDeleteAreaImage,
    } = useInputImageAreaForm()
    const [formData, setFormData] = useState<any>(issuesData.filter((issue: IssueItem) => issue.id === id)[0])
    const onFormDataChange = useCallback((updatedFormData: Record<any, any>) => {
        setFormData((prev: any) => ({
            ...prev,
            ...updatedFormData,
        }))
    }, [setFormData])
    const onSaveEditForm = () => {
        const completedSaveForm = {
            ...formData,
            latestDatetimeUpdate: getlocalISOTime(),
        }
        // save img(s) to drive
        /**@note file name containing "-" will make it's path tobe undefined, so we remove - from the file name for now (will matchable with the id later, anyway) */
        Object.keys(areaImages).forEach((area: string) => {
            areaImages[area].forEach((file: File, idx) => {
                saveImgToGGDrive(file, `${id}_${area}_${idx}`);
            })
        })
        axios
            .post("/api/updateIssueData", completedSaveForm)
            .then(_ => {
                router.push('/admin-cms-page')
                axios
                    .get("/api/getIssuesData")
                    .then(res => {
                        initializeIssuesSheetData(res.data.issues)
                    })
            })
            .catch(err => {
                throw new Error(err)
            })


    }
    return <div>
        <h1>แก้ไขข้อมูล ปัญหารหัส: {id}</h1>
        <IssueForm
            areaImages={areaImages}
            handleAreaImageChange={handleAreaImageChange}
            handleDeleteAreaImage={handleDeleteAreaImage}
            prefillFormData={formData}
            isEditMode={true}
            onFormDataChange={onFormDataChange}
            onSaveForm={onSaveEditForm}
        />
    </div>
}

export default Page
'use client'
import { getlocalISOTime } from '@/app/utils/uiHelper'
import IssueForm from '@/component/IssueForm'
import { GoogleSheetDataContext } from '@/contextProvider/googleSheetContextProvider'
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
            prefillFormData={formData}
            isEditMode={true}
            onFormDataChange={onFormDataChange}
            onSaveForm={onSaveEditForm}
            id={id}
        />
    </div>
}

export default Page
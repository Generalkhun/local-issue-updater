'use client'
import { getGGDriveImgURLViewWithId, getlocalISOTime, saveImgToGGDrive } from '@/app/utils/uiHelper'
import IssueForm from '@/component/IssueForm'
import { GoogleSheetDataContext } from '@/contextProvider/googleSheetContextProvider'
import useInputImageAreaForm from '@/hooks/useInputImageAreaForm'
import { IssueItem } from '@/types'
import axios from 'axios'
import { isEmpty } from 'lodash'
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
    const [isSaving, setIsSaving] = useState<boolean>(false)
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
    const onSaveEditForm = async (p: { updatedImgsOnServer: { url: string; name: string; }[] } | undefined) => {
        setIsSaving(true);
        // save new img(s) to drive (deleted image will disappear from the list already)
        let imgInfoPromises: any = [];
        if (!isEmpty(areaImages)) {
            // make this wait until this code is complete befor saving data to ggsheet
            Object.keys(areaImages).forEach((area: string) => {
                areaImages[area].forEach((file: File, idx) => {
                    const imgInfoPromise = saveImgToGGDrive(file, `${id}_${area}_${idx}`)
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
            const imgsInfoResolved = await Promise.all(imgInfoPromises);
            const updatedImgsOnServer = p?.updatedImgsOnServer;
            const completedSaveForm = {
                ...formData,
                latestDatetimeUpdate: getlocalISOTime(),
                imgsInfo: JSON.stringify([...imgsInfoResolved, ...updatedImgsOnServer || []]),
            }
            axios
                .post("/api/updateIssueData", completedSaveForm)
                .then(_ => {
                    router.push('/admin-cms-page')
                    fetch("/api/getIssuesData", { cache: 'no-store' })
                        .then(res => {
                            res.json()
                                .then(res => {
                                    initializeIssuesSheetData(res.issues)
                                })
                        })
                })
                .catch(err => {
                    throw new Error(err)
                })
        } catch (error) {

        }


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
            isSaving={isSaving}
        />
    </div>
}

export default Page
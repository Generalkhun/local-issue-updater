'use client'
import { getGGDriveImgURLViewWithId, getlocalISOTime, saveImgToGGDrive, severityMapper } from '@/app/utils/uiHelper'
import IssueForm from '@/component/IssueForm'
import StatusDisplayingBadge from '@/component/StatusDisplayingBadge'
import { GoogleSheetDataContext } from '@/contextProvider/googleSheetContextProvider'
import useInputImageAreaForm from '@/hooks/useInputImageAreaForm'
import { IssueItem } from '@/types'
import axios from 'axios'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { useCallback } from 'react'
import Image from 'next/image'
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
    const onClickCancel = () => {
        router.push('/admin-cms-page')
    }
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }}><div style={{

        width: '390px',
    }}>

            <div style={{
                backgroundColor: "#072C49",
                width: '100%',
                height: '147px',
                fontSize: '22px',
                fontWeight: 500,
                paddingLeft: '20px',
                paddingRight: '20px',
                color: 'white',
            }}>
                <div style={{
                    paddingTop: '15px',
                    fontSize: '16px',
                    fontWeight: '700',
                }}>
                    {`แก้ไขรายละเอียดปัญหา`}
                </div>
                <div style={{
                    paddingTop: '20px',
                    display: 'flex',
                    gap: '10px',
                    flexDirection: 'row'
                }}>
                    <div style={{
                        width: 'auto',
                        padding: '5px 10px 5px 10px',
                        height: '20px',
                        backgroundColor: severityMapper(formData?.severity),
                        color: 'black',
                        fontFamily: 'Heebo',
                        fontSize: '12px',
                        fontWeight: '500px',
                        borderRadius: '24px',
                        textAlign: 'center',
                    }}>
                        {formData?.severity}
                    </div>
                    <StatusDisplayingBadge status={formData?.status} />

                </div>
                <div style={{
                    paddingTop: '15px',
                    fontSize: '18px',
                    fontWeight: '700',
                    lineHeight: '27.72px',

                }}>
                    {formData?.issueDetail}
                </div>
            </div>
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{
                    paddingLeft: '40px'
                }}>
                    <IssueForm
                        onLeaveForm={onClickCancel}
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

            </div>

        </div>
    </div>



}

export default Page
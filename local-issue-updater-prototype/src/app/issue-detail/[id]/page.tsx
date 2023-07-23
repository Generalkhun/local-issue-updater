'use client'
import { extractIssueImageData } from '@/app/utils/uiHelper'
import { GoogleSheetDataContext } from '@/contextProvider/googleSheetContextProvider'
import { ImgsInfo, IssueItem } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useContext, useMemo, useState } from 'react'
interface Props {
    params: {
        id: string
    }
}
const Page = ({ params }: Props) => {
    const id = params.id
    const router = useRouter()
    const { issuesData } = useContext(GoogleSheetDataContext)
    const thisIssueData = useMemo(() => issuesData.filter((issue: IssueItem) => issue.id === id)[0], [issuesData])
    const imgsInfoDisplay = useMemo(() => extractIssueImageData(thisIssueData.imgsInfo), [extractIssueImageData, thisIssueData.imgsInfo])
    // const ImgsInfoDisplayPs = useMemo(() => imgsInfoDisplay
    //     .filter(imgInfo => imgInfo.group === 'ps')
    //     .map(imgInfoPS => <img width='200px' src={imgInfoPS.url} />)
    //     , [imgsInfoDisplay])
    // const ImgsInfoDisplayBefore = useMemo(() => imgsInfoDisplay
    //     .filter(imgInfo => imgInfo.group === 'before')
    //     .map(imgInfoPS => <img width='200px' src={imgInfoPS.url} />)
    //     , [imgsInfoDisplay])
    // const ImgsInfoDisplayAfter = useMemo(() => imgsInfoDisplay
    //     .filter(imgInfo => imgInfo.group === 'after')
    //     .map(imgInfoPS => <img width='200px' src={imgInfoPS.url} />)
    //     , [imgsInfoDisplay])
    return <div>
        <div style={{
            display: 'flex',
            gap: '100px'
        }}>
            <h1>รายละเอียด รหัสปัญหา: {id}</h1>
            <button onClick={() => router.push(`/issue-edit/${id}`)}>แก้ไข</button>
        </div>
        <div>------------</div>
        <div>สถานะ: {thisIssueData.status}</div>
        <div>ประเภทปัญหา: {thisIssueData.type} </div>
        <div>แขวงที่เกิดปัญหา: {thisIssueData.area}</div>
        <div>ชื่อผู้รายงาน: {thisIssueData.reporterName}</div>
        <div>เบอร์โทรศัพท์ผู้รายงาน: {thisIssueData.reporterPhoneNumber}</div>
        <div>หมายเหตุ: {thisIssueData.ps}</div>
        <div>ภาพประกอบหมายเหตุ: </div>
        <div>
            {imgsInfoDisplay
                .filter(imgInfo => imgInfo.group === 'ps')
                .map(imgInfoPS => <img width='200px' src={imgInfoPS.url} />)
            }
        </div>
        <div>วันที่รายงานปัญหา: {thisIssueData.datetimeReport}</div>
        <div>วันที่อัพเดตล่าสุด:{thisIssueData.latestDatetimeUpdate} </div>
        <div>รูปก่อนแก้ไข:</div>
        <div>
            {imgsInfoDisplay
                .filter(imgInfo => imgInfo.group === 'before')
                .map(imgInfoPS => <img width='200px' src={imgInfoPS.url} />)
            }
        </div>
        <div>รูปหลังแก้ไข:</div>
        <div>
            {imgsInfoDisplay
                .filter(imgInfo => imgInfo.group === 'after')
                .map(imgInfoPS => <img width='200px' src={imgInfoPS.url} />)
            }
        </div>
    </div>
}

export default Page
"use client"
import { InputImgObject, extractIssueImageData, severityMapper } from '@/app/utils/uiHelper'
import StatusDisplayingBadge from '@/component/StatusDisplayingBadge'
import { IssueItem } from '@/types'
import React, { useEffect, useMemo, useState } from 'react'

interface Props {
    params: {
        id: string
    }
}
const Page = ({ params }: Props) => {
    const id = params.id
    const [thisIssueData, setThisIssueData] = useState<IssueItem | null>(null)
    useEffect(() => {
        if (!!thisIssueData) {
            return;
        }
        fetch("/api/getIssuesData", { cache: 'no-store' })
            .then(res => {
                res.json()
                    .then(res => {
                        setThisIssueData(res.issues.filter((issue: IssueItem) => issue.id === id)[0])
                    })
            })
    }, [thisIssueData])
    const imgsInfoParsed: InputImgObject[] = useMemo(() => thisIssueData?.imgsInfo ? JSON.parse(thisIssueData.imgsInfo) : [], [thisIssueData])
    const imgsInfoDisplay = useMemo(() => imgsInfoParsed ? extractIssueImageData(imgsInfoParsed) : [], [extractIssueImageData, imgsInfoParsed])
    return <div>
    {thisIssueData && <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
        <div>
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
                    <span>ติดตามความคืบหน้าของปัญหา</span>
                </div>
            </div>
            <div style={{
                marginTop: '20px',
                display: 'flex',
                gap: '10px',
                flexDirection: 'column'
            }}>
                <StatusDisplayingBadge status={thisIssueData.status} />
            </div>
            <div style={{
                paddingTop: '20px',
            }}>
                {thisIssueData.issueDetail}
            </div>

            <div style={{
                paddingTop: '20px',
            }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#4F4F4F' }}>หมายเหตุ</div>
                {thisIssueData.ps}
            </div>

            <div style={{
                paddingTop: '20px',
            }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#4F4F4F' }}>ภาพประกอบหมายเหตุ</div>
                <div>
                    {imgsInfoDisplay && imgsInfoDisplay
                        .filter((imgInfo: any) => imgInfo.group === 'ps')
                        .map((imgInfoPS: any, idx: number) => <img key={idx} width='200px' src={imgInfoPS.url} />)
                    }
                </div>
            </div>

            <div style={{
                paddingTop: '20px',
            }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#4F4F4F' }}>วันที่รายงานปัญหา</div>
                {thisIssueData.datetimeReport}
            </div>

            <div style={{
                paddingTop: '20px',
            }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#4F4F4F' }}>วันที่อัพเดตล่าสุด</div>
                {thisIssueData.latestDatetimeUpdate}
            </div>

            <div style={{
                paddingTop: '20px',
            }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#4F4F4F' }}>รูปก่อนแก้ไข</div>
                <div>
                    {imgsInfoDisplay && imgsInfoDisplay
                        .filter((imgInfo: any) => imgInfo.group === 'before')
                        .map((imgInfoBefore: any, idx: number) => <img key={idx} width='200px' src={imgInfoBefore.url} />)
                    }
                </div>
            </div>

            <div style={{
                paddingTop: '20px',
            }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#4F4F4F' }}>รูปหลังแก้ไข</div>
                <div>
                    {imgsInfoDisplay && imgsInfoDisplay
                        .filter((imgInfo: any) => imgInfo.group === 'after')
                        .map((imgInfoAfter: any, idx: number) => <img key={idx} width='200px' src={imgInfoAfter.url} />)
                    }
                </div>
            </div>
        </div>
    </div >}
</div>
}

export default Page
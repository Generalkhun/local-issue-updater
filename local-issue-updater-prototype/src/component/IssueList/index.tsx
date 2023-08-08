'use client';
import { IssueItem } from '@/types'
import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { InputImgObject, extractIssueImageData } from '@/app/utils/uiHelper';

type Props = {
    issues: IssueItem[]
}

const IssueList = ({ issues }: Props) => {
    const router = useRouter()
    const onClickShare = () => {
        console.log('share')
    }
    const onClickDetail = (id: string) => {
        router.push(`/issue-detail/${id}`)
    }
    const borderColorMapper = (severity: string) => {
        switch (severity) {
            case 'วิกฤติ':
                return 'red'
            case 'ด่วน':
                return 'orange'
            case 'ปานกลาง':
                return 'yellow'
            case 'รอได้':
                return 'grey'
            default:
                return 'grey'
        }
    }
    return (
        <div>
            {issues && <div>
                {
                    issues.map((issue, idx) => {
                        let shownImg = ""
                        if (issue?.imgsInfo) {
                            const imgs = extractIssueImageData(JSON.parse(issue.imgsInfo))
                            if (!imgs.length) {
                                shownImg = "no image"
                            } else {
                                const firstPsImg = imgs.find((imgGroup) => imgGroup.group === 'ps')
                                const firstBeforeImg = imgs.find((imgGroup) => imgGroup.group === 'before')
                                const firstAfterImg = imgs.find((imgGroup) => imgGroup.group === 'after')
                                shownImg = firstBeforeImg ? firstBeforeImg.url : (firstAfterImg ? firstAfterImg.url : (firstPsImg ? firstPsImg.url : "no image"))
                            }
                        }

                        return (
                            <div key={idx} style={{
                                borderColor: borderColorMapper(issue.severity),
                                borderStyle: "solid",
                                height: '103px',
                                width: '372px',
                                overflow: 'scroll',
                                marginTop: '10px',
                                paddingLeft: '10px',
                                paddingRight: '10px',
                                paddingTop: '20px',
                                paddingBottom: '20px',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}>
                                    <div style={{
                                        width: '98px',
                                        height: '74px',
                                        backgroundColor: 'grey'
                                    }}>
                                        <img width='98px' height='auto'  src={shownImg} />
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}>
                                        <div>
                                            {/* <div>วันที่แจ้ง {issue.datetimeReport}</div> */}
                                            <div style={{
                                                fontWeight: 500,
                                                fontSize: '16px',
                                            }}>{issue.issueDetail}</div>
                                            <div>ประเภท: {issue.type}</div>
                                            <div>สถานะ: {issue.status}</div>
                                            <div>ความเร่งด่วน: {issue.severity}</div>
                                        </div>
                                        <div>
                                            <div style={{
                                                display: 'flex',
                                                gap: '4px',
                                                flexDirection: 'column',
                                            }}>
                                                <button onClick={onClickShare}>คัดลอกลิ้ง</button>
                                                <button onClick={() => onClickDetail(issue.id)}>รายละเอียด</button>
                                                <button onClick={() => router.push(`/issue-edit/${issue.id}`)}>แก้ไข</button>
                                                <button onClick={() => router.push(`/issue-preview/${issue.id}`)}>พรีวิว</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }
            </div>}
        </div>
    )
}

export default IssueList
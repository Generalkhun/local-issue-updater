'use client';
import { IssueItem } from '@/types'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

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
                    issues.map((issue, idx) => (
                        <div key={idx} style={{
                            borderColor: borderColorMapper(issue.severity),
                            borderStyle: "solid",
                            height: '120px',
                            width: '300px',
                            overflow: 'scroll',
                        }}>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <div>
                                    <div>วันที่แจ้ง {issue.datetimeReport}</div>
                                    <div style={{
                                        borderColor: 'grey',
                                        borderStyle: "solid",
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
                    ))
                }
            </div>}
        </div>
    )
}

export default IssueList
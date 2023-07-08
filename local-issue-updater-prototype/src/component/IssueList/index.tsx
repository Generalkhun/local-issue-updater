'use client';
import { IssueItem } from '@/types'
import React from 'react'
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
            case 'critical':
                return 'red'
            case 'hurry':
                return 'orange'
            case 'canwait':
                return 'yellow'
            default:
                return 'grey'
        }
    }
    return (
        <div>
            {issues && <div>
                {
                    issues.map((issue) => (
                        <div style={{
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
                                        flexDirection: 'column',
                                    }}>
                                        <button onClick={onClickShare}>แชร์</button>
                                        <button onClick={() => onClickDetail(issue.id)}>รายละเอียด</button>
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
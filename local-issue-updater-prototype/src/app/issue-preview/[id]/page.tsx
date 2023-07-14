"use client"
import { IssueItem } from '@/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
        axios
            .get("/api/getIssuesData")
            .then(res => {
                setThisIssueData(res.data.issues.filter((issue: IssueItem) => issue.id === id)[0])
            })
    }, [thisIssueData])
    return (
        <>
            {thisIssueData &&
                <div style={{
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: 'white',
                    padding: '30px'
                }}>
                    <div style={{
                        fontWeight: 700,
                        fontSize: '26px',
                        color: 'black',
                    }}>
                        ติดตามความคืบหน้าของปัญหา
                    </div>
                    <div style={{
                        borderTop: '3px solid #bbb',
                        borderColor: '#989898',
                    }}></div>

                    <div style={{
                        width: '150px',
                        height: '25px',
                        borderRadius: '9px',
                        display: 'flex',
                        color: '#4F4F4F',
                        position: 'absolute',
                        top: '100px',
                        backgroundColor: '#E0E0E0',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        gap: '5px',
                        paddingLeft: '10px',
                    }}>
                        <div style={{
                            width: '9.01px',
                            height: '9.01px',
                            borderRadius: '50%',
                            backgroundColor: '#F8C96D',
                        }}>
                        </div>
                        <div>
                            {thisIssueData.status}
                        </div>
                    </div>
                    <div style={{
                        color: '#7E7E7E',
                        fontSize: '16px',
                        lineHeight: '22.4px',
                        position: 'absolute',
                        top: '150px',
                    }}>
                        {thisIssueData.issueDetail}
                    </div>
                    <div
                        style={{
                            color: '#4F4F4F',
                            fontSize: '18px',
                            fontWeight: 700,
                            lineHeight: '22.4px',
                            position: 'absolute',
                            top: '200px',
                        }}
                    >หมายเหตุ</div>
                    <div
                        style={{
                            color: '#7E7E7E',
                            fontSize: '16px',
                            lineHeight: '22.4px',
                            position: 'absolute',
                            top: '230px',
                        }}
                    >
                        {thisIssueData.ps}

                        <div
                            style={{
                                color: '#4F4F4F',
                                fontSize: '18px',
                                fontWeight: 700,
                                lineHeight: '22.4px',
                                marginTop: '30px',
                            }}
                        >วันที่รายงานปัญหา</div>
                        <div>
                            {thisIssueData.datetimeReport}
                        </div>

                        <div
                            style={{
                                color: '#4F4F4F',
                                fontSize: '18px',
                                fontWeight: 700,
                                lineHeight: '22.4px',
                                marginTop: '30px',
                            }}
                        >วันที่อัพเดตล่าสุด</div>
                        <div>
                            {thisIssueData.latestDatetimeUpdate}
                        </div>
                    </div>


                </div>
            }
        </>

    )
}

export default Page
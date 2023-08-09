'use client';
import { IssueItem } from '@/types'
import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { InputImgObject, extractIssueImageData, getIssueStatusColor, severityMapper } from '@/app/utils/uiHelper';
import { findIndex } from 'lodash';
import HamburgerMenu from '../Hamburgermenu';

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

    return (
        <div style={{
            paddingTop: '170px',
        }}>
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
                                height: '103px',
                                width: '372px',
                                overflow: 'visible',
                                marginTop: '10px',
                                padding: '8px',
                                boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.12)',
                                borderRadius: '12px'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '13px',
                                }}>
                                    <div style={{
                                        width: '98px',
                                        height: '74px',
                                    }}>
                                        <img width='100px' height='auto' src={shownImg} />
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}>
                                        <div>
                                            {/* <div>วันที่แจ้ง {issue.datetimeReport}</div> */}
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'start',
                                            }}>
                                                <div style={{
                                                    width: '55px',
                                                    height: '20px',
                                                    /**@todo change color according to serverity */
                                                    backgroundColor: '#D41010',
                                                    color: 'white',
                                                    fontFamily: 'Heebo',
                                                    fontSize: '12px',
                                                    fontWeight: '500px',
                                                    borderRadius: '24px',
                                                    textAlign: 'center',
                                                }}>
                                                    {issue.severity}
                                                </div>
                                                <div style={{
                                                    width: '100px',
                                                    height: '20px',
                                                    backgroundColor: getIssueStatusColor(issue.status),
                                                    color: 'white',
                                                    fontFamily: 'Heebo',
                                                    fontSize: '12px',
                                                    fontWeight: '500px',
                                                    borderRadius: '24px',
                                                    textAlign: 'center',
                                                    marginLeft: '4px',
                                                }}>
                                                    {issue.status}
                                                </div>
                                            </div>
                                            <div style={{
                                                fontWeight: 500,
                                                fontSize: '14px',
                                            }}>{issue.issueDetail}</div>
                                            <div>

                                            </div>
                                            <div style={{
                                                width: '200px',
                                                height: '18px',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                fontSize: '12px',
                                                fontWeight: '500px',
                                                textAlign: 'center',
                                                paddingTop: '50px'
                                            }}>
                                                <div>ประเภท: {issue.type}</div>
                                                <div style={{paddingTop: '2px'}}>{issue.datetimeReport.slice(0,issue.datetimeReport.indexOf(" "))}</div>
                                            </div>
                                            {/* <div>ประเภท: {issue.type}</div>
                                            <div>สถานะ: {issue.status}</div>
                                            <div>ความเร่งด่วน: {issue.severity}</div> */}
                                        </div>
                                        <div>
                                        <HamburgerMenu />
                                            {/* <div style={{
                                                display: 'flex',
                                                gap: '2px',
                                                flexDirection: 'column',
                                            }}>
                                                <button onClick={onClickShare}>คัดลอกลิ้ง</button>
                                                <button onClick={() => onClickDetail(issue.id)}>รายละเอียด</button>
                                                <button onClick={() => router.push(`/issue-edit/${issue.id}`)}>แก้ไข</button>
                                                <button onClick={() => router.push(`/issue-preview/${issue.id}`)}>พรีวิว</button>
                                            </div> */}
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
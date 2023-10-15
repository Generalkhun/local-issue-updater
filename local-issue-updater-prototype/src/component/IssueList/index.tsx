'use client';
import { IssueItem } from '@/types'
import React, { useCallback, useMemo, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { extractIssueImageData, getIssueStatusColor, severityMapper } from '@/app/utils/uiHelper';
import HamburgerMenu, { Option } from '../Hamburgermenu';
import useClickCopyIssueLink from '@/hooks/useClickCopyIssueLink';

type Props = {
    issues: IssueItem[]
}

const IssueList = ({ issues }: Props) => {
    const router = useRouter()
    const pathName = usePathname()
    const { onClickCopyLink, isCopied, clearCopyTick } = useClickCopyIssueLink()
    const onClickDetail = (id: string) => {
        router.push(`/issue-detail/${id}`)
    }
    const options: Option[] = useMemo(() => ([
        {
            name: `${isCopied ? "✅ " : ""}คัดลอกลิ้ง`,
            callback: (issue: IssueItem) => {
                onClickCopyLink(issue.id)
            },
        },
        {
            name: "รายละเอียด",
            callback: (issue: IssueItem) => onClickDetail(issue.id),
        },
        {
            name: "แก้ไข",
            callback: (issue: IssueItem) => router.push(`/issue-edit/${issue.id}`),
        },
        {
            name: "พรีวิว",
            callback: (issue: IssueItem) => router.push(`/issue-preview/${issue.id}`),
        }
    ]), [onClickCopyLink, isCopied])
    const onCloseHanburgerMenu = useCallback(() => {
        clearCopyTick()
    }, [clearCopyTick])
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
                                height: '103px',
                                width: '342px',
                                overflow: 'visible',
                                marginTop: '10px',
                                padding: '8px',
                                boxShadow: '0px 1px 8px 0px rgba(0, 0, 0, 0.12)',
                                borderRadius: '12px',
                                backgroundColor: 'white',
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
                                        {shownImg ? <img width='100px' height='auto' src={shownImg} /> : <div style={{ width: '100px' }}></div>}
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        gap: '20px',
                                    }}>
                                        <div>
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'start',
                                            }}>
                                                <div style={{
                                                    width: '55px',
                                                    height: '20px',
                                                    backgroundColor: severityMapper(issue.severity),
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
                                                overflow: 'scroll',
                                                width: '200px',
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
                                                <div style={{ paddingTop: '2px' }}>{issue.datetimeReport.slice(0, issue.datetimeReport.indexOf(" "))}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <HamburgerMenu issue={issue} options={options} onClose={onCloseHanburgerMenu} />
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
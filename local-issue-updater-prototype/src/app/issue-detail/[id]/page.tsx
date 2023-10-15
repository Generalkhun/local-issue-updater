'use client'
import { InputImgObject, extractIssueImageData, severityMapper } from '@/app/utils/uiHelper'
import StatusDisplayingBadge from '@/component/StatusDisplayingBadge'
import { GoogleSheetDataContext } from '@/contextProvider/googleSheetContextProvider'
import { IssueItem } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useMemo } from 'react'
import Image from 'next/image'
import useClickCopyIssueLink from '@/hooks/useClickCopyIssueLink'
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
    const imgsInfoParsed: InputImgObject[] = useMemo(() => thisIssueData?.imgsInfo ? JSON.parse(thisIssueData.imgsInfo) : [], [thisIssueData])
    const imgsInfoDisplay = useMemo(() => imgsInfoParsed ? extractIssueImageData(imgsInfoParsed) : [], [extractIssueImageData, imgsInfoParsed])
    const { onClickCopyLink, isCopied, clearCopyTick } = useClickCopyIssueLink()
    const onClickBack = () => {
        router.push('/admin-cms-page')
    }
    const onClickEdit = () => {
        router.push(`/issue-edit/${id}`)
    }
    useEffect(() => {
        if (!thisIssueData) {
            router.push('/admin-cms-page')
        }
    })
    return <div>
        {thisIssueData && <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <div>
                <div style={{
                    backgroundColor: "#072C49",
                    width: '100%',
                    height: '237px',
                    fontSize: '22px',
                    fontWeight: 500,
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    color: 'white',
                }}>
                    <div style={{
                        paddingTop: '15px'
                    }}>
                        <button style={{
                            borderStyle: 'none',
                            backgroundColor: 'transparent',
                            fontWeight: 500,
                            fontSize: '14px',
                            color: 'white',
                            marginRight: '20px'
                        }} onClick={onClickBack}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '3px',

                            }}>
                                <Image
                                    src="/ep_back.svg"
                                    alt="moving forward logo"
                                    priority
                                    width={16}
                                    height={16}
                                    style={{
                                        paddingTop: '3px',
                                    }}
                                />
                                <div>
                                    กลับ
                                </div>
                            </div>

                        </button>

                    </div>

                    <div style={{
                        marginTop: '20px',
                        display: 'flex',
                        gap: '10px',
                        flexDirection: 'row'
                    }}>
                        <div style={{
                            width: 'auto',
                            padding: '5px 10px 5px 10px',
                            height: '20px',
                            backgroundColor: severityMapper(thisIssueData.severity),
                            color: 'black',
                            fontFamily: 'Heebo',
                            fontSize: '12px',
                            fontWeight: '500px',
                            borderRadius: '24px',
                            textAlign: 'center',
                        }}>
                            {thisIssueData.severity}
                        </div>
                        <StatusDisplayingBadge status={thisIssueData.status} />

                    </div>
                    <div style={{
                        paddingTop: '15px',
                        fontSize: '18px',
                        fontWeight: '700',
                        lineHeight: '27.72px',

                    }}>
                        {thisIssueData.issueDetail}
                    </div>
                    <div style={{
                        paddingTop: '15px',
                        fontSize: '12px',
                        fontWeight: '500',
                    }}>
                        {`วันที่รายงานปัญหา ${thisIssueData.datetimeReport}`}
                    </div>
                    <div style={{
                        paddingTop: '15px',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        width: '100%',
                    }}>
                        <button style={{
                            width: '100%',
                            padding: '10px, 12px, 10px, 12px',
                            borderRadius: '8px',
                            backgroundColor: '#FB6413',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: 'white',
                            height: '36px',
                            borderStyle: 'none'
                        }} onClick={onClickEdit}>อัพเดตความคืบหน้า</button>

                        <button style={{
                            width: '100%',
                            padding: '10px, 12px, 10px, 12px',
                            borderRadius: '8px',
                            backgroundColor: 'transparent',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: 'white',
                            height: '36px',
                            borderStyle: 'solid',
                            borderColor: '#FB6413'
                        }} onClick={() => onClickCopyLink(thisIssueData.id)}>{`${isCopied ? "✅ " : ""}คัดลอกลิงก์`}</button>
                    </div>
                </div>


                <div style={{
                    paddingTop: '20px',
                }}>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#4F4F4F' }}>ประเภทปัญหา</div>
                    {thisIssueData.type}
                </div>

                <div style={{
                    paddingTop: '20px',
                }}>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#4F4F4F' }}>แขวงที่เกิดปัญหา</div>
                    {thisIssueData.area}
                </div>

                <div style={{
                    paddingTop: '20px',
                }}>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#4F4F4F' }}>ชื่อผู้รายงาน</div>
                    {thisIssueData.reporterName}
                </div>

                <div style={{
                    paddingTop: '20px',
                }}>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#4F4F4F' }}>เบอร์โทรศัพท์ผู้รายงาน</div>
                    {thisIssueData.reporterPhoneNumber}
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
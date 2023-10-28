"use client"
import { InputImgObject, extractIssueImageData, severityMapper } from '@/app/utils/uiHelper'
import StatusDisplayingBadge from '@/component/StatusDisplayingBadge'
import { IssueItem } from '@/types'
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

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
                        paddingTop: '20px',
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
                </div>



                <div style={{
                    paddingLeft: '10px',
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '300px',
                        right: '350px',
                        marginRight: '-188px'
                    }}>
                        <Image
                            src="/mfp-half.svg"
                            alt="half of moving forward party logo"
                            priority
                            width={139}
                            height={161}
                        />
                    </div>

                    <div style={{
                        paddingTop: '20px',
                    }}>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#072C49' }}>รายละเอียด</div>
                        <span style={{color: 'black', fontWeight: 500, fontSize: '15px'}}>{thisIssueData.issueDetail}</span>
                    </div>

                    <div style={{
                        paddingTop: '20px',
                    }}>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#072C49' }}>ประเภทปัญหา</div>
                        <span style={{color: 'black', fontWeight: 500, fontSize: '15px'}}>{thisIssueData.type}</span>
                    </div>

                    <div style={{
                        paddingTop: '20px',
                    }}>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#072C49' }}>แขวงที่เกิดปัญหา</div>
                        <span style={{color: 'black', fontWeight: 500, fontSize: '15px'}}>{thisIssueData.area}</span>
                    </div>

                    <div style={{
                        paddingTop: '20px',
                    }}>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#072C49' }}>ชื่อผู้รายงาน</div>
                        <span style={{color: 'black', fontWeight: 500, fontSize: '15px'}}>{thisIssueData.reporterName}</span>
                    </div>

                    <div style={{
                        paddingTop: '20px',
                    }}>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#072C49' }}>เบอร์โทรศัพท์ผู้รายงาน</div>
                        <span style={{color: 'black', fontWeight: 500, fontSize: '15px'}}>{thisIssueData.reporterPhoneNumber}</span>
                    </div>

                    <div style={{
                        paddingTop: '20px',
                    }}>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#072C49' }}>หมายเหตุ</div>
                        <span style={{color: 'black', fontWeight: 500, fontSize: '15px'}}>{thisIssueData.ps}</span>
                    </div>

                    <div style={{
                        paddingTop: '20px',
                    }}>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#072C49' }}>ภาพประกอบหมายเหตุ</div>
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
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#072C49' }}>วันที่รายงานปัญหา</div>
                        {thisIssueData.datetimeReport}
                    </div>

                    {/* <div style={{
                        paddingTop: '20px',
                    }}>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#072C49' }}>วันที่อัพเดตล่าสุด</div>
                        {thisIssueData.latestDatetimeUpdate}
                    </div> */}

                    <div style={{
                        paddingTop: '20px',
                    }}>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#072C49' }}>รูปก่อนแก้ไข</div>
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
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#072C49' }}>รูปหลังแก้ไข</div>
                        <div>
                            {imgsInfoDisplay && imgsInfoDisplay
                                .filter((imgInfo: any) => imgInfo.group === 'after')
                                .map((imgInfoAfter: any, idx: number) => <img key={idx} width='200px' src={imgInfoAfter.url} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >}
</div>
}

export default Page
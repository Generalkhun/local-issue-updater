
import { InputImgObject, OutputImgObject, extractIssueImageData } from '@/app/utils/uiHelper';
import { IssueItem } from '@/types';
import { includes } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react'

interface SaveFormOption {
    updatedImgsOnServer: { url: string; name: string }[] | [],
}
type Props = {
    areaImages: Record<string, File[]>
    handleAreaImageChange: (event: React.ChangeEvent<HTMLInputElement>, areaName: string) => void;
    handleDeleteAreaImage: (areaName: string, idx: number) => void;
    onSaveForm: (option?: SaveFormOption) => void
    onFormDataChange: (updatedFormData: Record<any, any>) => void;
    isEditMode?: boolean;
    prefillFormData?: IssueItem;
    isSaving: boolean;
}
const IssueForm = ({
    onSaveForm,
    onFormDataChange,
    isEditMode,
    prefillFormData,
    areaImages,
    handleAreaImageChange,
    handleDeleteAreaImage,
    isSaving,
}: Props) => {
    //todo: use id to prefill id the form is editing form
    const [status, setStatus] = useState(isEditMode ? prefillFormData?.status : "");
    const [issueDetail, setIssueDetail] = useState("");
    const [type, setType] = useState(isEditMode ? prefillFormData?.type : "");
    const [area, setArea] = useState(isEditMode ? prefillFormData?.area : "");
    const [reporterName, setReporterName] = useState("");
    const [reporterPhoneNumber, setReporterPhoneNumber] = useState("");
    const [ps, setPs] = useState("");
    const [severity, setSeverity] = useState(isEditMode ? prefillFormData?.severity : "วิกฤติ");
    const imgsInfoParsed: InputImgObject[] = useMemo(() => prefillFormData?.imgsInfo ? JSON.parse(prefillFormData.imgsInfo) : [], [prefillFormData])
    const imgsInfoDisplay = useMemo(() => imgsInfoParsed ? extractIssueImageData(imgsInfoParsed) : [], [extractIssueImageData, imgsInfoParsed])
    const [displayedImagesThatSavedOnServer, updateDisplayedImagesThatSavedOnServer] = useState(isEditMode ? imgsInfoDisplay : [])
    const [updatedImgsOnServer, setUpdatedImgsOnServer] = useState<{ url: string, name: string }[] | []>(imgsInfoParsed);

    // prefill everything if it is edit mode
    useEffect(() => {
        if (!isEditMode || !prefillFormData) {
            return;
        }
        const thisIssue = prefillFormData
        setStatus(thisIssue.status)
        setIssueDetail(thisIssue.issueDetail)
        setType(thisIssue.type)
        setArea(thisIssue.area)
        setReporterName(thisIssue.reporterName)
        setReporterPhoneNumber(thisIssue.reporterPhoneNumber)
        setPs(thisIssue.ps)
        setSeverity(thisIssue.severity)
    }, [prefillFormData, isEditMode])


    // form data update
    useEffect(() => {
        if (!status) {
            return;
        }
        onFormDataChange({ status })
    }, [status, onFormDataChange])
    useEffect(() => {
        if (!issueDetail) {
            return;
        }
        onFormDataChange({ issueDetail })
    }, [issueDetail, onFormDataChange])
    useEffect(() => {
        if (!type) {
            return;
        }
        onFormDataChange({ type })
    }, [type, onFormDataChange])
    useEffect(() => {
        if (!area) {
            return;
        }
        onFormDataChange({ area })
    }, [area, onFormDataChange])
    useEffect(() => {
        if (!reporterName) {
            return;
        }
        onFormDataChange({ reporterName })
    }, [reporterName, onFormDataChange])

    useEffect(() => {
        if (!reporterPhoneNumber) {
            return;
        }
        onFormDataChange({ reporterPhoneNumber })
    }, [reporterPhoneNumber, onFormDataChange])

    useEffect(() => {
        if (!ps) {
            return;
        }
        onFormDataChange({ ps })
    }, [ps, onFormDataChange])

    useEffect(() => {
        if (!severity) {
            return;
        }
        onFormDataChange({ severity })
    }, [severity, onFormDataChange])

    // update saved image
    useEffect(() => {
        const updatedUrls = displayedImagesThatSavedOnServer.map((img) => img.url)
        setUpdatedImgsOnServer(
            prev => (
                prev.filter(imgObj => updatedUrls.includes(imgObj.url))
            )
        )
    }, [displayedImagesThatSavedOnServer, setUpdatedImgsOnServer])

    const handleDeleteSavedImage = (imgUrl: string) => {
        if (!imgsInfoDisplay.length) {
            return;
        }
        updateDisplayedImagesThatSavedOnServer(prev => (
            prev.filter(imgObj => imgObj.url !== imgUrl)
        ))
    }

    const saveIssueForm = () => {
        if (!imgsInfoDisplay.length) {
            onSaveForm();
            return;
        }
        onSaveForm({
            updatedImgsOnServer,
        });

    }

    return (
        <div style={{
            padding: '11px',
            color: '#4F4F4F',
            fontSize: '16px',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
            }}>
                <label htmlFor='status'>สถานะ*</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} id='status'>
                    <option disabled={true} value="">
                        -- select --
                    </option>
                    <option value="รับเรื่องปัญหา">รับเรื่องปัญหา</option>
                    <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                    <option value="ดำเนินการเรียบร้อย">ดำเนินการเรียบร้อย</option>
                    <option value="นอกเขตพื้นที่">นอกเขตพื้นที่</option>
                    <option value="ที่ส่วนบุคคล">ที่ส่วนบุคคล</option>
                </select>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '20px',
                gap: '5px'
            }}>
                <label htmlFor='detail'>รายละเอียดปัญหา*</label>
                <textarea style={{ height: '100px' }} value={issueDetail} onChange={(e) => setIssueDetail(e.target.value)} id='detail' placeholder='' />
            </div>
            <div style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
            }}>
                <label htmlFor='type'>ประเภทปัญหา*</label>
                <select value={type} onChange={(e) => setType(e.target.value)} id='type'>
                    <option disabled={true} value="">
                        -- select --
                    </option>
                    <option value="ถนน">ถนน</option>
                    <option value="ทางเท้า">ทางเท้า</option>
                    <option value="แสงสว่าง">แสงสว่าง</option>
                    <option value="ความปลอดภัย">ความปลอดภัย</option>
                    <option value="ความสะอาด">ความสะอาด</option>

                    <option value="น้ำท่วม">น้ำท่วม</option>
                    <option value="กีดขวาง">กีดขวาง</option>
                    <option value="ท่อระบายน้ำ">ท่อระบายน้ำ</option>
                    <option value="จราจร">จราจร</option>

                    <option value="สะพาน">สะพาน</option>
                    <option value="สายไฟ">สายไฟ</option>
                    <option value="เสียงรบกวน">เสียงรบกวน</option>
                    <option value="คลอง">คลอง</option>

                    <option value="ต้นไม้">ต้นไม้</option>
                    <option value="ป้าย">ป้าย</option>
                    <option value="สัตว์จรจัด">สัตว์จรจัด</option>
                    <option value="PM2.5">PM2.5</option>

                    <option value="คนจรจัด">คนจรจัด</option>
                    <option value="การเดินทาง">การเดินทาง</option>
                    <option value="ห้องน้ำ">ห้องน้ำ</option>
                    <option value="ป้ายจราจร">ป้ายจราจร</option>

                    <option value="อื่นๆ">อื่นๆ</option>
                    <option value="ข้อเสนอแนะ/นโยบาย">ข้อเสนอแนะ/นโยบาย</option>
                    <option value="สวนสาธารณะ">สวนสาธารณะ</option>
                </select>
            </div>
            <div style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
            }}>
                <label htmlFor='area'>แขวงที่เกิดปัญหา*</label>
                <select value={area} onChange={(e) => setArea(e.target.value)} id='area' placeholder=''>
                    <option value="จอมทอง">จอมทอง</option>
                    <option value="บางค้อ">บางค้อ</option>
                    <option value="บางมด">บางมด</option>
                    <option value="ท่าข้าม">ท่าข้าม</option>
                </select>
            </div>
            <div style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
            }}>
                <label htmlFor='reporterName'>ชื่อผู้รายงาน(ถ้ามี)</label>
                <input value={reporterName} onChange={(e) => setReporterName(e.target.value)} type='text' id='reporterName' placeholder='' />
            </div>
            <div style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
            }}>
                <label htmlFor='reporterPhoneNum'>เบอร์โทรศัพท์ผู้รายงาน(ถ้ามี)</label>
                <input value={reporterPhoneNumber} onChange={(e) => setReporterPhoneNumber(e.target.value)} type='text' id='reporterPhoneNum' placeholder='' />
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '20px',
                gap: '5px',
            }}>
                <label htmlFor='ps'>หมายเหตุ</label>
                <textarea style={{
                    height: '100px'
                }} value={ps} onChange={(e) => setPs(e.target.value)} id='ps' placeholder='' />
                <label htmlFor='ps'>ภาพประกอบหมายเหตุ</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleAreaImageChange(e, 'ps')}
                />
                {areaImages['ps'] &&
                    areaImages['ps'].map((image, index) => (
                        <div key={index}>
                            <img width='200px' src={URL.createObjectURL(image)} alt="Preview" />
                            <button onClick={() => handleDeleteAreaImage('ps', index)}>
                                X
                            </button>
                        </div>
                    ))
                }

                {displayedImagesThatSavedOnServer.length ? displayedImagesThatSavedOnServer
                    .filter(imgInfo => imgInfo.group === 'ps')
                    .map((imgInfoPS, idx) => <div key={idx}>
                        <img width='200px' src={imgInfoPS.url} />
                        <button onClick={() => handleDeleteSavedImage(imgInfoPS.url)}>
                            X
                        </button>
                    </div>)
                    :
                    <></>
                }
            </div>
            <div style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
            }}>
                <label htmlFor='severity'>ความเร่งด่วน*</label>
                <select value={severity} onChange={(e) => {
                    setSeverity(e.target.value)
                }} id='severity' placeholder=''>
                    <option value="วิกฤติ">วิกฤติ</option>
                    <option value="ด่วน">ด่วน</option>
                    <option value="ปานกลาง">ปานกลาง</option>
                    <option value="รอได้">รอได้</option>
                </select>
            </div>
            <h2>ภาพประกอบ</h2>
            <div style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
            }}>
                รูปก่อนแก้ไข
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleAreaImageChange(e, 'before')}
                />
                {areaImages['before'] &&
                    areaImages['before'].map((image, index) => (
                        <div key={index}>
                            <img width='200px' src={URL.createObjectURL(image)} alt="Preview" />
                            <button onClick={() => handleDeleteAreaImage('before', index)}>
                                X
                            </button>
                        </div>
                    ))}
                {displayedImagesThatSavedOnServer.length ? displayedImagesThatSavedOnServer
                    .filter(imgInfo => imgInfo.group === 'before')
                    .map((imgInfoPS, idx) => <div key={idx}>
                        <img width='200px' src={imgInfoPS.url} />
                        <button onClick={() => handleDeleteSavedImage(imgInfoPS.url)}>
                            X
                        </button>
                    </div>)
                    :
                    <></>
                }
            </div>
            <div style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
            }}>
                รูปหลังแก้ไข
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleAreaImageChange(e, 'after')}
                />
                {areaImages['after'] &&
                    areaImages['after'].map((image, index) => (
                        <div key={index}>
                            <img width='200px' src={URL.createObjectURL(image)} alt="Preview" />
                            <button onClick={() => handleDeleteAreaImage('after', index)}>
                                X
                            </button>
                        </div>
                    ))}
                {displayedImagesThatSavedOnServer.length ? displayedImagesThatSavedOnServer
                    .filter(imgInfo => imgInfo.group === 'after')
                    .map((imgInfoPS, idx) => <div key={idx}>
                        <img width='200px' src={imgInfoPS.url} />
                        <button onClick={() => handleDeleteSavedImage(imgInfoPS.url)}>
                            X
                        </button>
                    </div>)
                    :
                    <></>
                }
            </div>
            {isSaving ? <div style={{
                width: '400px',
                height: '80px',
                marginTop: '20px',
                borderRadius: '8px',
                backgroundColor: 'grey',
                fontSize: '30px',
            }}>
                กำลังบันทึก...
            </div> : <button onClick={saveIssueForm} style={{
                width: '347px',
                height: '80px',
                marginTop: '20px',
                backgroundColor: '#F07B3A',
                fontSize: '28px',
                fontWeight: 600,
                color: 'white',
                borderRadius: '60px',
                borderStyle: 'none'
            }}>บันทึก</button>}
        </div>
    )
}

export default IssueForm
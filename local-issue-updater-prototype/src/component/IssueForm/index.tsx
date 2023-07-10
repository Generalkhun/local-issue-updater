
import { IssueItem } from '@/types';
import React, { useEffect, useState } from 'react'

type Props = {
    id: string;
    onSaveForm: () => void
    onFormDataChange: (updatedFormData: Record<any, any>) => void;
    isEditMode?: boolean;
    prefillFormData?: IssueItem;
}
const IssueForm = ({ id, onSaveForm, onFormDataChange, isEditMode, prefillFormData }: Props) => {
    //todo: use id to prefill id the form is editing form
    const [status, setStatus] = useState(isEditMode ? prefillFormData?.status : "รับเรื่องปัญหา");
    const [issueDetail, setIssueDetail] = useState("");
    const [type, setType] = useState(isEditMode ? prefillFormData?.type : "ถนน");
    const [area, setArea] = useState(isEditMode ? prefillFormData?.area : "จอมทอง");
    const [reporterName, setReporterName] = useState("");
    const [reporterPhoneNumber, setReporterPhoneNumber] = useState("");
    const [ps, setPs] = useState("");
    const [severity, setSeverity] = useState(isEditMode ? prefillFormData?.severity : "วิกฤติ");

    // const [imagesBeforeFix, setImagesBeforeFix] = useState<File[] | null>(null);
    // const [imagesAfterFix, setImagesAfterFix] = useState<File[] | null>(null);
    // const [imagesPS, setImagesPS] = useState<File[] | null>(null);
    const [areaImages, setAreaImages] = useState<Record<string, File[]>>({});



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

    // const handleImagesBeforeFixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         setImagesBeforeFix(e.target.files[0]);
    //     }
    // };

    // const handleImage2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         setImage2(e.target.files[0]);
    //     }
    // };

    const handleAreaImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        area: string
    ) => {
        if (e.target.files && e.target.files.length > 0) {
            const newImages = Array.from(e.target.files);
            setAreaImages((prevImages) => ({
                ...prevImages,
                [area]: [...(prevImages[area] || []), ...newImages],
            }));
        }
    };

    const handleDeleteAreaImage = (area: string, index: number) => {
        setAreaImages((prevImages) => {
            const updatedImages = [...(prevImages[area] || [])];
            updatedImages.splice(index, 1);
            return { ...prevImages, [area]: updatedImages };
        });
    };


    return (
        <div>
            <div>
                <label htmlFor='status'>สถานะปัญหา</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} id='status' placeholder=''>
                    <option value="รับเรื่องปัญหา">รับเรื่องปัญหา</option>
                    <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                    <option value="ดำเนินการเรียบร้อย">ดำเนินการเรียบร้อย</option>
                    <option value="นอกเขตพื้นที่">นอกเขตพื้นที่</option>
                    <option value="ที่ส่วนบุคคล">ที่ส่วนบุคคล</option>
                </select>
            </div>
            <div>
                <label htmlFor='detail'>รายละเอียด</label>
                <input value={issueDetail} onChange={(e) => setIssueDetail(e.target.value)} type='text' id='detail' placeholder='' />
            </div>
            <div>
                <label htmlFor='type'>ประเภทปัญหา</label>
                <select value={type} onChange={(e) => setType(e.target.value)} id='type' placeholder=''>
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
            <div>
                <label htmlFor='area'>แขวงที่เกิดปัญหา</label>
                <select value={area} onChange={(e) => setArea(e.target.value)} id='area' placeholder=''>
                    <option value="จอมทอง">จอมทอง</option>
                    <option value="บางค้อ">บางค้อ</option>
                    <option value="บางมด">บางมด</option>
                    <option value="ท่าข้าม">ท่าข้าม</option>
                </select>
            </div>
            <div>
                <label htmlFor='reporterName'>ชื่อผู้รายงาน(ถ้ามี)</label>
                <input value={reporterName} onChange={(e) => setReporterName(e.target.value)} type='text' id='reporterName' placeholder='' />
            </div>
            <div>
                <label htmlFor='reporterPhoneNum'>เบอร์โทรศัพท์ผู้รายงาน(ถ้ามี)</label>
                <input value={reporterPhoneNumber} onChange={(e) => setReporterPhoneNumber(e.target.value)} type='text' id='reporterPhoneNum' placeholder='' />
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <label htmlFor='ps'>หมายเหตุ</label>
                <textarea style={{
                    width: '400px',
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
                    ))}
            </div>
            <div>
                <label htmlFor='severity'>ความเร่งด่วน</label>
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
            <div>
                <p>ก่อนแก้ไข</p>
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
            </div>
            <div>
                <p>หลังแก้ไข</p>
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
            </div>
            <button onClick={onSaveForm} style={{
                width: '400px',
                height: '80px',
                marginTop: '20px',
                borderRadius: '8px',
                backgroundColor: 'crimson',
                fontSize: '30px',
            }}>บันทึก</button>
        </div>
    )
}

export default IssueForm
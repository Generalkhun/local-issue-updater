'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
interface Props {
    params: {
        id: string
    }
}
const Page = ({ params }: Props) => {
    const id = params.id
    const router = useRouter()
    return <div>
        <div style={{
            display: 'flex',
            gap: '100px'
        }}>
            รหัสปัญหา: {id}
            <button onClick={() => router.push(`/issue-edit/${id}`)}>แก้ไข</button>
        </div>
        <div>------------</div>
        <div>สถานะ: </div>
        <div>ประเภทปัญหา: </div>
        <div>แขวงที่เกิดปัญหา: </div>
        <div>ชื่อผู้รายงาน: </div>
        <div>เบอร์โทรศัพท์ผู้รายงาน: </div>
        <div>ทีมงานที่รับผิดชอบ: </div>
        <div>หมายเหตุ: </div>
        <div>วันที่รายงานปัญหา: </div>
        <div>วันที่อัพเดตล่าสุด: </div>
        <div>รูปก่อนแก้ไข: </div>
        <div>รูปหลังแก้ไข: </div>
    </div>
}

export default Page
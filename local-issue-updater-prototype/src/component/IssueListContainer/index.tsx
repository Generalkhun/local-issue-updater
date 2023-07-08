import { IssueItem } from '@/types'
import React from 'react'
import IssueList from '../IssueList'

type Props = {}

const IssueListContainer = (props: Props) => {
    // get from api
    const issues: IssueItem[] = [
        {
            id: '1',
            area: 'a',
            status: 'inProgress',
            issueDetail: 'สายไฟขาดที่ถนน หน้าตลาดเช้า',
            type: 'electricalline',
            reporterName: 'สมชัย แสวงการงานทำบ้างเห้อะ',
            reporterPhoneNumber: '000009999999',
            responsibleTeam: 'ทีมพื้นที่',
            ps: 'คนนี้รีบร้อนมาก เพราะบ้านไฟดับ',
            severity: 'critical' ,
            datetimeReport: '10/10/1995',
            latestDatetimeUpdate: '13/10/1995',
        }
    ]
  return (
    <div>
        <IssueList issues={issues}/>
    </div>
  )
}

export default IssueListContainer
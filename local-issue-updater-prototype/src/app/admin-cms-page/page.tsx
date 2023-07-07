import IssueListContainer from '@/component/IssueListContainer/IssueListContainer'
import React from 'react'

type Props = {}

const AdminCMSPage = (props: Props) => {
  return (
    <div>
    ปัญหาทั้งหมด
    <div>
     ----------------

    <IssueListContainer/>
    </div>
   </div>
  )
}

export default AdminCMSPage
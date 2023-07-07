
'use client'
import IssueListContainer from '@/component/IssueListContainer'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const AdminCMSPage = (props: Props) => {
  const router = useRouter()
  const onAddNewIssue = () => {
    router.push('/issue-add')
  }
  return (
    <div>
      <h1> ปัญหาทั้งหมด</h1>
      <div>
        ----------------

        <IssueListContainer />
        <div title="add new issue" style={{
          position: 'absolute',
          bottom: '50px',
          right: '100px',
        }}>
          <button onClick={onAddNewIssue} style={{
            backgroundColor: 'blue',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            fontSize: '50px',
          }}>+</button>
        </div>
      </div>
    </div>
  )
}

export default AdminCMSPage
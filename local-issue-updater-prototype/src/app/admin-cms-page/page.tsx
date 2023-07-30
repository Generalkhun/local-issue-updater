
'use client'
export const dynamic = 'force-dynamic'
import IssueListContainer from '@/component/IssueListContainer'
import { GoogleSheetDataContext } from '@/contextProvider/googleSheetContextProvider'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'

const AdminCMSPage = () => {
  const router = useRouter()
  const onAddNewIssue = () => {
    router.push('/issue-add')
  }
  const { initializeIssuesSheetData, issuesData } = useContext(GoogleSheetDataContext)
  // get from api
  useEffect(() => {
    if (issuesData.length) {
      return;
    }
    fetch("/api/getIssuesData", { cache: 'no-store' })
      .then(res => {
        res.json()
          .then(res => {
            initializeIssuesSheetData(res.issues)
          })
      })
  }, [issuesData])
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
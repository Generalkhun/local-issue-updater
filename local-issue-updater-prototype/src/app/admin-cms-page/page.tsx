
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        width: '375px',
        height: '51px',
        backgroundColor: '#F07B3A',
        fontWeight: 500,
        fontSize: '22px'
      }}>
        ปัญหาทั้งหมด
      </div>
      <div style={{
        paddingTop: '20px',
      }}>
        <IssueListContainer />
      </div>
      <div>
        <div title="เพิ่มปัญหาใหม่" style={{
          position: 'fixed',
          bottom: '50px',
          right: '100px',
        }}>
          <button onClick={onAddNewIssue} style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            fontSize: '50px',
            backgroundColor: '#F07B3A',
            border: 'none',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
              <mask id="mask0_309_1321" maskUnits="userSpaceOnUse" x="0" y="0" width="44" height="44">
                <rect x="0.218262" y="0.253906" width="43.5273" height="43.5273" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_309_1321)">
                <path d="M21.9816 34.7112C21.4677 34.7112 21.037 34.5374 20.6894 34.1898C20.3418 33.8422 20.168 33.4115 20.168 32.8976V23.8294H11.0998C10.5859 23.8294 10.1552 23.6556 9.80755 23.308C9.45994 22.9604 9.28613 22.5296 9.28613 22.0158C9.28613 21.5019 9.45994 21.0712 9.80755 20.7236C10.1552 20.3759 10.5859 20.2021 11.0998 20.2021H20.168V11.1339C20.168 10.6201 20.3418 10.1893 20.6894 9.84173C21.037 9.49412 21.4677 9.32031 21.9816 9.32031C22.4955 9.32031 22.9262 9.49412 23.2738 9.84173C23.6214 10.1893 23.7952 10.6201 23.7952 11.1339V20.2021H32.8634C33.3773 20.2021 33.808 20.3759 34.1556 20.7236C34.5032 21.0712 34.677 21.5019 34.677 22.0158C34.677 22.5296 34.5032 22.9604 34.1556 23.308C33.808 23.6556 33.3773 23.8294 32.8634 23.8294H23.7952V32.8976C23.7952 33.4115 23.6214 33.8422 23.2738 34.1898C22.9262 34.5374 22.4955 34.7112 21.9816 34.7112Z" fill="white" />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminCMSPage
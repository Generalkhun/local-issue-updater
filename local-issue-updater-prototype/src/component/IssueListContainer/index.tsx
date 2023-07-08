import React, { useContext } from 'react'
import IssueList from '../IssueList'
import { GoogleSheetDataContext } from '@/contextProvider/googleSheetContextProvider'

const IssueListContainer = () => {
  const {issuesData} = useContext(GoogleSheetDataContext)
  // get from api
  return (
    <div>
       {!!issuesData.length && <IssueList issues={issuesData}/>}
    </div>
  )
}

export default IssueListContainer
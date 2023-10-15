import { getIssueStatusColor } from '@/app/utils/uiHelper'
import React from 'react'

type Props = {
    status: string
}

const index = ({ status }: Props) => {
    return (
        <div style={{
            maxWidth: '180px',
            height: '20px',
            borderRadius: '30px',
            textAlign: 'center',
            padding: '5px 10px 5px 10px',
            backgroundColor: getIssueStatusColor(status),
        }}>
            <div style={{
                fontSize: '12px'
            }}>
                {status}
            </div>
        </div>
    )
}

export default index
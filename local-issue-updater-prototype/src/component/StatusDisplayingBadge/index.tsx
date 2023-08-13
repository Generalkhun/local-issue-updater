import { getIssueStatusColor } from '@/app/utils/uiHelper'
import React from 'react'

type Props = {
    status: string
}

const index = ({ status }: Props) => {
    return (
        <div style={{
            maxWidth: '180px',
            height: '36px',
            borderRadius: '30px',
            textAlign: 'center',
            backgroundColor: getIssueStatusColor(status),
        }}>
            <div style={{
                paddingTop: '5px',
            }}>
                {status}
            </div>
        </div>
    )
}

export default index
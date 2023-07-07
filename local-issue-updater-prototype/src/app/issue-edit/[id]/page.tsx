'use client'
import React from 'react'
interface Props {
    params: {
        id: string
    }
}
const Page = ({params}: Props) => {
    return <p>issue edit id: {params.id}</p>
}

export default Page
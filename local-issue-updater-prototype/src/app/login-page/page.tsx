"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const Login = () => {
    const router = useRouter()
    const [id, setId] = useState("")
    const [pass, setPass] = useState("")
    const onChangeId = (e: any) => {
        setId(e.target.value)
    }
    const onChangePassword = (e: any) => {
        setPass(e.target.value)
    }
    const onLogin = () => {
        // if(id === 'mfp-chomthong-admin' && pass === '1161126') {
        //     router.push('/admin-cms-page')
        // }
        router.push('/admin-cms-page')
    }
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            height: '100vh',
        }}>
            <div style={{
                width: '500px',
                height: '500px',
                backgroundColor: 'black',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <p style={{ marginBottom: '30px' }}>admin login</p>
                <div>
                    <div>
                        <label htmlFor='id'>id</label>
                    </div>

                    <input id='id' type='text' onChange={onChangeId} />
                </div>
                <div>
                    <div>

                        <label htmlFor='pass'>password</label>
                    </div>
                    <input id='pass' type='text' onChange={onChangePassword} />
                </div>
                <button onClick={onLogin}>login</button>
            </div>
        </div>
    )
}

export default Login
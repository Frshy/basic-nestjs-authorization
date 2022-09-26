import * as React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

const Dashboard = () => {
    const [authorized, setAuthorized] = useState(false)

    const router = useRouter()

    useEffect(() => {
        if (!getCookie('access_token')) {
            router.push('/auth/login')
        } else {
            axios.get('http://localhost:4000/user/getMe', {
                headers: {
                    'Authorization': `Bearer ${getCookie('access_token')}`
                }
            }).then(res => {
                setAuthorized(true)
            }).catch(err => {
                router.push('/auth/login')
            })
        }

        axios.get('http://localhost:4000/user/getAll', {
            headers: {
                'Authorization': `Bearer ${getCookie('access_token')}`
            }
        }).then(res => {
            
        }).catch(err => {
            
        })

    }, [])

    if (!authorized) {
        return (
            <div className='w-full h-full flex justify-center items-center bg-neutral-800 text-slate-100'>
                <div className='text-5xl'>Wczytywanie</div>
            </div>
        )
    }

    return (
        <div className='w-full h-full flex justify-center items-center bg-neutral-800 text-slate-100'>
            <div className='text-5xl'></div>
        </div>
    )
}

export default Dashboard

import * as React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { deleteCookie, getCookie } from 'cookies-next';
import User from '../../components/dashboard/User';

const Dashboard = () => {
    const [authorized, setAuthorized] = useState(false)
    const [usersData, setUsersData] = useState<any>([]);
    const [updateData, setUpdateData] = useState(true)

    const router = useRouter()

    const logout = () => {
        deleteCookie('access_token')
        router.push('/auth/login')
    }

    useEffect(() => {
        (async () => {
            if (!getCookie('access_token')) {
                router.push('/auth/login')
            } else {
                try {
                    const result = await axios.get('http://localhost:4000/user/getMe', {
                        headers: {
                            'Authorization': `Bearer ${getCookie('access_token')}`
                        }
                    })

                    setAuthorized(true)
                } catch {
                    router.push('/auth/login')
                }
            }
        })()
    }, [])


    useEffect(() => {

        (async () => {
            if (!updateData) return
            setUpdateData(false)

            try {
                const result = await axios.get('http://localhost:4000/user/getAll', {
                    headers: {
                        'Authorization': `Bearer ${getCookie('access_token')}`
                    }
                })

                setUsersData(result.data)
            }
            catch (err) {
                console.log(err)
            }
        })();
    }, [updateData])

    if (!authorized) {
        return (
            <div className='w-full h-full flex justify-center items-center bg-neutral-800 text-slate-100'>
                <div className='text-5xl'>Wczytywanie</div>
            </div>
        )
    }

    const userElements = usersData.map((user: any) => {
        const element = <User key={'user' + user.id} id={user.id} username={user.username} note={user.note} changeUpdateData={setUpdateData} />
        return element
    })

    return (
        <div className='w-full h-full align-top text-top flex flex-col items-center bg-neutral-800 text-slate-100'>
            <button className='absolute right-0 m-4 cursor-pointer text-md outline-none px-12 py-2 rounded-xl bg-neutral-800 border-red-500 border-[1px] hover:bg-red-500 duration-300'
                onClick={logout}>
                Wyloguj
            </button>

            <div className='text-3xl my-3'>Użytkownicy</div>
            <div>{userElements}</div>
        </div>
    )
}

export default Dashboard
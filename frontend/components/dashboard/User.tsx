import axios from 'axios'
import { getCookie } from 'cookies-next'
import { Field, Form, Formik } from 'formik'
import * as React from 'react'
import { useRef } from 'react'


const User = (props: any) => {
    const formikRef = useRef<any>([]);

    const removeUser = async () => {
        const id = props.id

        try {
            const result = await axios.delete('http://localhost:4000/user/delete', {
                headers: {
                    'Authorization': `Bearer ${getCookie('access_token')}`
                },
                data: {
                    id
                }
            })

            props.changeUpdateData(true)
        }
        catch (err) {
            alert(err)
        }
    }

    const editUser = async () => {
        const id = props.id
        const username = formikRef.current?.values.username
        const note = formikRef.current?.values.note

        try {
            const result = await axios.patch('http://localhost:4000/user/edit', {
                id,
                username,
                note,
            }, {
                headers: {
                    'Authorization': `Bearer ${getCookie('access_token')}`
                },
            })

            props.changeUpdateData(true)
        }
        catch (err) {
            alert(err)
        }
    }

    return (
        <div>
            <Formik
                innerRef={formikRef}
                initialValues={{
                    username: props.username || '',
                    note: props.note || '',
                }}
                onSubmit={() => { }}
            >
                {() => (
                    <Form className='flex flex-wrap items-center justify-center items-center text-slate-100 w-full sm:w-[800px] h-full sm:h-fit bg-neutral-900 sm:rounded-2xl p-5 border-red-700 sm:border-t-2 my-2'>

                        <div className='text-center w-[55px]'>
                            <div>ID: {props.id}</div>
                        </div>

                        <div className='w-1/3 text-center'>
                            <div>
                                <label htmlFor="username">Nazwa:</label>
                                <div className='my-1'></div>
                                <Field name='username' className='outline-none px-2 py-1 rounded-xl bg-neutral-800 border-red-500 border-[1px]' type="text" />
                            </div>
                        </div>

                        <div className='w-1/3 text-center'>
                            <div>
                                <label htmlFor="note">Notatka:</label>
                                <div className='my-1'></div>
                                <Field name='note' className='w-2/1 outline-none px-2 py-1 rounded-xl bg-neutral-800 border-red-500 border-[1px]' type="text" />
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <button className='cursor-pointer text-md outline-none px-6 py-1 rounded-xl bg-neutral-800 border-red-500 border-[1px] hover:bg-red-500 duration-300'
                                onClick={editUser}>
                                Edytuj
                            </button>

                            <div className='py-1'></div>

                            <button className='cursor-pointer text-md outline-none px-6 py-1 rounded-xl bg-neutral-800 border-red-500 border-[1px] hover:bg-red-500 duration-300'
                                onClick={removeUser}>
                                Usuń
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    )
}

export default User
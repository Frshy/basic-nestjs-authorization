import * as React from 'react'
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import Link from 'next/link';

const validationSchema = yup.object({
  username: yup
    .string()
    .required("Pole wymagane"),
  password: yup
    .string()
    .required("Pole wymagane")
    .min(8, "Hasło musi być dłuższe niż 8 znaków"),
});

const Register = () => {
  const [error, setError] = useState('')

  const router = useRouter()

  useEffect(() => {
    if (getCookie('access_token')) {
      axios.get('http://localhost:4000/user/getMe', {
        headers: {
          'Authorization': `Bearer ${getCookie('access_token')}`
        }
      }).then(res => {
        router.push('/dashboard')
      }).catch(err => {
        deleteCookie('access_token')
      })

    }
  }, [])

  const handleSubmit = async (values: any) => {
    setError('')

    axios.post('http://localhost:4000/auth/login',
      { username: values.username, password: values.password })
      .then(res => {
        setCookie('access_token', res.data.access_token);
        router.push('/dashboard')
      }).catch(err => {
        setError(err.response.data.message)
      })
  }

  return (
    <div className='w-full h-full flex justify-center items-center bg-neutral-800'>

      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className='flex flex-col items-center text-slate-100 w-full sm:w-[400px] h-full sm:h-fit bg-neutral-900 sm:rounded-2xl p-5 border-red-700 sm:border-t-2'>
            <h2 className='text-3xl'>Login</h2>

            <div className='my-5 mx-auto w-3/4 border-red-500 border-t-2'></div>

            <label className='text-xl' htmlFor="username">Nazwa Użytkownika</label>
            <div className='my-1'></div>
            <Field name="username" className='w-2/3 outline-none px-2 py-1 rounded-xl bg-neutral-800 border-red-500 border-[1px]' type="text" />
            {errors.username && touched.username ? (
              <div className='text-red-500'>{errors.username}</div>
            ) : null}

            <div className='my-1'></div>

            <label className='text-xl' htmlFor="password">Hasło</label>
            <div className='my-1'></div>
            <Field name="password" className='w-2/3 outline-none px-2 py-1 rounded-xl bg-neutral-800 border-red-500 border-[1px]' type="password" />
            {errors.password && touched.password ? (
              <div className='text-red-500'>{errors.password}</div>
            ) : null}

            <div className='my-3'></div>

            <Field type="submit" value="Zaloguj" className='cursor-pointer text-lg outline-none px-12 py-1 rounded-xl bg-neutral-800 border-red-500 border-[1px] hover:bg-red-500 duration-300' />
            <div className='my-1'></div>

            {error ? (
              <div className='text-red-500'>{error}</div>
            ) : null}

            <div className='hover:text-red-500 duration-300'>
              <Link href="/auth/register">Nie posiadasz konta? Zarejestruj się!</Link>
            </div>

          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Register

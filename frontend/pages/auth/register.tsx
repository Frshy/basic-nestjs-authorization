import * as React from 'react'
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

const validationSchema = yup.object({
  username: yup
    .string()
    .required("Pole wymagane"),
  password: yup
    .string()
    .required("Pole wymagane")
    .min(8, "Hasło musi być dłuższe niż 8 znaków"),
  passwordConfirmation: yup
    .string()
    .required("Pole wymagane")
    .min(8, "Hasło musi być dłuższe niż 8 znaków")
    .oneOf([yup.ref('password'), null], 'Hasła muszą się zgadzać!')
});

const Register = () => {
  const [error, setError] = useState('')

  const router = useRouter()

  useEffect(() => {
    if (getCookie('access_token')) {
      router.push('/dashboard')
    }
  }, [])

  const handleSubmit = async (values: any) => {
    setError('')

    axios.post('http://localhost:4000/auth/register',
      { username: values.username, password: values.password })
      .then(res => {
        router.push('/auth/login')
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
          passwordConfirmation: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className='flex flex-col items-center text-slate-100 w-full sm:w-[400px] h-full sm:h-fit bg-neutral-900 sm:rounded-2xl p-5 border-red-700 sm:border-t-2'>
            <h2 className='text-3xl'>Rejestracja</h2>

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

            <div className='my-1'></div>

            <label className='text-xl' htmlFor="passwordConfirmation">Potwierdź Hasło</label>
            <div className='my-1'></div>
            <Field name="passwordConfirmation" className='w-2/3 outline-none px-2 py-1 rounded-xl bg-neutral-800 border-red-500 border-[1px]' type="password" />
            {errors.passwordConfirmation && touched.passwordConfirmation ? (
              <div className='text-red-500'>{errors.passwordConfirmation}</div>
            ) : null}

            <div className='my-3'></div>

            <Field type="submit" value="Zarejestruj" className='cursor-pointer text-lg outline-none px-12 py-1 rounded-xl bg-neutral-800 border-red-500 border-[1px] hover:bg-red-500 duration-300' />
            <div className='my-1'></div>

            {error ? (
              <div className='text-red-500'>{error}</div>
            ) : null}

          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Register

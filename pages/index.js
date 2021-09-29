import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Home() {
  // react-hook-form
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async (data) => {
    await fetch('/api/findProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  return (
    <div className="w-full max-w-2xl mx-auto overflow-hidden bg-white shadow sm:rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid items-center justify-between grid-flow-col px-4 py-5">
          <div className="">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Access your profile
            </h3>
            <p className="max-w-2xl mt-1 text-sm text-gray-500">
              Please enter the email associated with your membership.
              <br />
              We'll send you an email to access your profile.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <div className="flex items-center justify-between px-4 py-5 bg-gray-50">
            <input
              type="text"
              name="email"
              id="email"
              className="block w-full max-w-lg text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500"
              placeholder="Your email address"
              aria-describedby="email-description"
              ref={register({ required: true, maxLength: 80 })}
            />
            <button
              type="submit"
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-900 bg-gray-200 border border-transparent rounded-md shadow-sm cursor-pointer hover:text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Get access
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

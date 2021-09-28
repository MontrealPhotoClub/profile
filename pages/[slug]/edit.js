import useSWR from 'swr'
import { useRouter } from 'next/router'

import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import NextLink from 'next/link'
import { route } from 'next/dist/server/router'

const fetcher = (url) => fetch(url).then((res) => res.json())

function Profile() {
  const router = useRouter()
  // getting the data using the api route
  const url = `/api/getProfile/${router.query.slug}`
  const { data, error } = useSWR(url, fetcher)

  // react-hook-form
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      email: data.attributes.email,
      firstName: data.attributes.firstName,
      lastName: data.attributes.lastName,
      instagram: data.attributes.instagram,
      website: data.attributes.website,
      language: data.attributes.language,
      unsubscribed: data.unsubscribed,
    },
  })

  const onSubmit = async (data) => {
    await fetch('/api/updateProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  if (error)
    return (
      <div className="w-full max-w-2xl mx-auto overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="grid items-center justify-between grid-flow-col px-4 py-5">
          <div className="">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Error: member not found
            </h3>
            <p className="max-w-2xl mt-1 text-sm text-gray-500">
              We couldn't find your member profile.
            </p>
          </div>
          <div className="grid justify-center grid-flow-col gap-4 mx-auto">
            <a
              href="https://montrealphoto.club"
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Sign up now
            </a>
            <NextLink href="/">
              <span className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                Return to home
              </span>
            </NextLink>
          </div>
        </div>
      </div>
    )

  if (!data)
    return (
      <div className="w-full max-w-2xl mx-auto overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="grid items-center justify-between grid-flow-col px-4 py-5">
          <div className="">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Edit your profile
            </h3>
            <p className="max-w-2xl mt-1 text-sm text-gray-500">
              These are the personal details associated with your membership
            </p>
          </div>
          <div className="">
            <button
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium border border-transparent rounded-md shadow-sm cursor-pointer text-gray-50 bg-error-600 hover:text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              disabled
            >
              Submit changes
            </button>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="flex items-center px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">First name</dt>
              <dd className="h-6 bg-gray-300 rounded sm:mt-0 sm:col-span-2 animate-pulse"></dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Last name</dt>
              <dd className="h-6 bg-gray-300 rounded sm:mt-0 sm:col-span-2 animate-pulse"></dd>
            </div>
            <div className="flex items-center px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="h-6 bg-gray-300 rounded sm:mt-0 sm:col-span-2 animate-pulse"></dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Member since
              </dt>
              <dd className="h-6 bg-gray-300 rounded sm:mt-0 sm:col-span-2 animate-pulse"></dd>
            </div>
            <div className="flex items-center px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Language</dt>
              <dd className="h-6 bg-gray-300 rounded sm:mt-0 sm:col-span-2 animate-pulse"></dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Website</dt>
              <dd className="h-6 bg-gray-300 rounded sm:mt-0 sm:col-span-2 animate-pulse"></dd>
            </div>
            <div className="flex items-center px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Instagram</dt>
              <dd className="h-6 bg-gray-300 rounded sm:mt-0 sm:col-span-2 animate-pulse"></dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Subscribed to communications
              </dt>
              <dd className="h-6 bg-gray-300 rounded sm:mt-0 sm:col-span-2 animate-pulse"></dd>
            </div>
          </dl>
        </div>
      </div>
    )

  return (
    <div className="w-full max-w-2xl mx-auto overflow-hidden bg-white shadow sm:rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid items-center justify-between grid-flow-col px-4 py-5">
          <div className="">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Edit your profile
            </h3>
            <p className="max-w-2xl mt-1 text-sm text-gray-500">
              These are the personal details associated with your membership
            </p>
          </div>
          <div className="">
            <button
              type="submit"
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md shadow-sm cursor-pointer hover:text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Submit changes
            </button>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="flex items-center px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">First name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="block w-full text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                  placeholder={
                    !data.attributes.firstName
                      ? 'Your first name'
                      : data.attributes.firstName
                  }
                  aria-describedby="first-name-description"
                  ref={register({ required: true, maxLength: 80 })}
                />
              </dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Last name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="block w-full text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                  placeholder={
                    !data.attributes.lastName
                      ? 'Your last name'
                      : data.attributes.lastName
                  }
                  aria-describedby="last-name-description"
                  ref={register({ required: true, maxLength: 80 })}
                />
              </dd>
            </div>
            <div className="flex items-center px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="block w-full text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                  placeholder={data.attributes.email}
                  aria-describedby="email-description"
                  ref={register({ required: true, maxLength: 80 })}
                />
              </dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Member since
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(data.attributes.created_at * 1000).toLocaleDateString(
                  'en-CA'
                )}
              </dd>
            </div>
            <div className="flex items-center px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Language</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div>
                  <select
                    id="language"
                    name="language"
                    className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                    ref={register}
                  >
                    {data.unsubscribed === 'en' ? (
                      <>
                        <option value="en" selected>
                          English
                        </option>
                        <option value="fr">French</option>
                      </>
                    ) : (
                      <>
                        <option value="en">English</option>
                        <option value="fr" selected>
                          French
                        </option>
                      </>
                    )}
                  </select>
                </div>
              </dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Website</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="website"
                  id="website"
                  className="block w-full text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                  placeholder={
                    !data.attributes.website
                      ? 'Your website'
                      : data.attributes.website
                  }
                  aria-describedby="website-description"
                  ref={register({ required: true, maxLength: 80 })}
                />
              </dd>
            </div>
            <div className="flex items-center px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Instagram</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="instagram"
                  id="instagram"
                  className="block w-full text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                  placeholder={
                    !data.attributes.instagram
                      ? 'Your Instagram username'
                      : data.attributes.instagram
                  }
                  aria-describedby="instagram-description"
                  ref={register({ required: true, maxLength: 80 })}
                />
              </dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Subscribed to communications
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {' '}
                <div>
                  <select
                    id="unsubscribed"
                    name="unsubscribed"
                    className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                    ref={register}
                  >
                    {data.unsubscribed === true ? (
                      <>
                        <option value="true" selected>
                          Unsubscribed
                        </option>
                        <option value="false">Subscribed</option>
                      </>
                    ) : (
                      <>
                        <option value="true">Unsubscribed</option>
                        <option value="false" selected>
                          Subscribed
                        </option>
                      </>
                    )}
                  </select>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </form>
    </div>
  )
}

export default Profile

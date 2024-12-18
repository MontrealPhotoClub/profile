import { useRouter } from 'next/router'
import useSWR from 'swr'

import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'

import NextLink from 'next/link'

const fetcher = (url) => fetch(url).then((res) => res.json())

import { Dialog, Transition } from '@headlessui/react'

function Profile() {
  const router = useRouter()

  // getting the data using the api route
  const url = `/api/getProfile/${router.query.slug}`
  const { data, error } = useSWR(url, fetcher)

  const onSubmit = async (data) => {
    await fetch('/api/updateProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  if (error)
    return (
      <div className="mx-auto w-full max-w-2xl overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="grid grid-flow-col items-center justify-between px-4 py-5">
          <div className="">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Error: member not found
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              We couldn't find your member profile.
            </p>
          </div>
          <div className="mx-auto grid grid-flow-col justify-center gap-4">
            <a
              href="https://montrealphoto.club"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Sign up now
            </a>
            <NextLink href="/" legacyBehavior>
              <span className="inline-flex w-full cursor-pointer justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm">
                Return to home
              </span>
            </NextLink>
          </div>
        </div>
      </div>
    )

  if (!data)
    return (
      <div className="mx-auto w-full max-w-2xl overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="grid grid-flow-col items-center justify-between px-4 py-5">
          <div className="">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Edit your profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              These are the personal details associated with your membership
            </p>
          </div>
          <div className="">
            <button
              className="inline-flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-error-600 px-4 py-2 text-base font-medium text-gray-50 shadow-sm hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              disabled
            >
              Submit changes
            </button>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="flex items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">First name</dt>
              <dd className="h-6 animate-pulse rounded bg-gray-300 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Last name</dt>
              <dd className="h-6 animate-pulse rounded bg-gray-300 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div className="flex items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="h-6 animate-pulse rounded bg-gray-300 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Member since
              </dt>
              <dd className="h-6 animate-pulse rounded bg-gray-300 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div className="flex items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Language</dt>
              <dd className="h-6 animate-pulse rounded bg-gray-300 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Website</dt>
              <dd className="h-6 animate-pulse rounded bg-gray-300 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div className="flex items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Instagram</dt>
              <dd className="h-6 animate-pulse rounded bg-gray-300 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Subscribed to communications
              </dt>
              <dd className="h-6 animate-pulse rounded bg-gray-300 sm:col-span-2 sm:mt-0"></dd>
            </div>
          </dl>
        </div>
      </div>
    )

  if (data) {
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

    return (
      <>
        <div className="mx-auto w-full max-w-2xl overflow-hidden bg-white shadow sm:rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-flow-col items-center justify-between px-4 py-5">
              <div className="">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Edit your profile
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  These are the personal details associated with your membership
                </p>
              </div>
              <div className="">
                <button
                  type="submit"
                  onClick={openModal}
                  className="inline-flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-base font-medium text-gray-900 shadow-sm hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Submit changes
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="flex items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    First name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
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
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Last name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
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
                <div className="flex items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
                      placeholder={data.attributes.email}
                      aria-describedby="email-description"
                      ref={register({ required: true, maxLength: 80 })}
                    />
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Member since
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {new Date(
                      data.attributes.created_at * 1000
                    ).toLocaleDateString('en-CA')}
                  </dd>
                </div>
                <div className="flex items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Language
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <div>
                      <select
                        id="language"
                        name="language"
                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm"
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
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Website</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      name="website"
                      id="website"
                      className="block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
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
                <div className="flex items-center bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Instagram
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      name="instagram"
                      id="instagram"
                      className="block w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
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
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Subscribed to communications
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {' '}
                    <div>
                      <select
                        id="unsubscribed"
                        name="unsubscribed"
                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm"
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

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Update successful!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your changes have been successfully submitted.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-base font-medium text-gray-900 shadow-sm hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </>
    )
  }
}

export default Profile

import useSWR from 'swr'
import { useRouter } from 'next/router'

import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import NextLink from 'next/link'
import { route } from 'next/dist/server/router'

const fetcher = (url) => fetch(url).then((res) => res.json())

import { Dialog, Transition } from '@headlessui/react'

function Profile() {
  const router = useRouter()

  // Issue with router.query.slug
  const slug = router.query.slug

  // getting the data using the api route
  const url = `../api/getProfile/${slug}`
  const { data, error } = useSWR(url, fetcher)

  const onSubmit = async (data) => {
    await fetch('../../api/updateProfile', {
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
      <div className="w-full max-w-2xl mx-auto overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="grid items-center justify-between grid-flow-col px-4 py-5">
          <div className="">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Erreur: profil introuvable
            </h3>
            <p className="max-w-2xl mt-1 text-sm text-gray-500">
              Nous n'avons pas pu trouver votre profil.
            </p>
          </div>
          <div className="grid justify-center grid-flow-col gap-4 mx-auto">
            <a
              href="https://montrealphoto.club"
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              S'inscrire
            </a>
            <NextLink href="/">
              <span className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                Retourner à l'accueil
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
              Votre profil
            </h3>
            <p className="max-w-2xl mt-1 text-sm text-gray-500">
              Voici les informations associées à votre profil
            </p>
          </div>
          <div className="">
            <NextLink href={`/${router.query.slug}/edit`}>
              <span className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md shadow-sm cursor-pointer hover:text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                Éditer votre profil
              </span>
            </NextLink>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Prénom</dt>
              <dd className="h-6 bg-gray-300 rounded sm:mt-0 sm:col-span-2 animate-pulse"></dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Nom de famille
              </dt>
              <dd className="h-6 bg-gray-300 rounded sm:mt-0 sm:col-span-2 animate-pulse"></dd>
            </div>
            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Adresse courriel
              </dt>
              <dd className="h-6 bg-gray-300 rounded sm:mt-0 sm:col-span-2 animate-pulse"></dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Membre depuis
              </dt>
              <dd className="h-6 bg-gray-300 rounded sm:mt-0 sm:col-span-2 animate-pulse"></dd>
            </div>
            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Langue</dt>
              <dd className="h-6 bg-gray-300 rounded sm:mt-0 sm:col-span-2 animate-pulse"></dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Site web</dt>
              <dd className="h-6 bg-gray-300 rounded sm:mt-0 sm:col-span-2 animate-pulse"></dd>
            </div>
            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Instagram</dt>
              <dd className="h-6 bg-gray-300 rounded sm:mt-0 sm:col-span-2 animate-pulse"></dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Abonnement aux courriels
              </dt>
              <dd className="h-6 bg-gray-300 rounded sm:mt-0 sm:col-span-2 animate-pulse"></dd>
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
        <div className="w-full max-w-2xl mx-auto overflow-hidden bg-white shadow sm:rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid items-center justify-between grid-flow-col px-4 py-5">
              <div className="">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Votre profil
                </h3>
                <p className="max-w-2xl mt-1 text-sm text-gray-500">
                  Voici les informations associées à votre profil
                </p>
              </div>
              <div className="">
                <button
                  type="submit"
                  onClick={openModal}
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md shadow-sm cursor-pointer hover:text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Soumettre
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="flex items-center px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Prénom</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="block w-full text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                      placeholder={
                        !data.attributes.firstName
                          ? 'Votre prénom'
                          : data.attributes.firstName
                      }
                      aria-describedby="first-name-description"
                      ref={register({ required: true, maxLength: 80 })}
                    />
                  </dd>
                </div>
                <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Nom de famille
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="block w-full text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                      placeholder={
                        !data.attributes.lastName
                          ? 'Votre nom de famille'
                          : data.attributes.lastName
                      }
                      aria-describedby="last-name-description"
                      ref={register({ required: true, maxLength: 80 })}
                    />
                  </dd>
                </div>
                <div className="flex items-center px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Adresse courriel
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
                    Membre depuis
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {new Date(
                      data.attributes.created_at * 1000
                    ).toLocaleDateString('en-CA')}
                  </dd>
                </div>
                <div className="flex items-center px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Language
                  </dt>
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
                              Anglais
                            </option>
                            <option value="fr">Français</option>
                          </>
                        ) : (
                          <>
                            <option value="en">Anglais</option>
                            <option value="fr" selected>
                              Français
                            </option>
                          </>
                        )}
                      </select>
                    </div>
                  </dd>
                </div>
                <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Site web
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="website"
                      id="website"
                      className="block w-full text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                      placeholder={
                        !data.attributes.website
                          ? 'Votre site web'
                          : data.attributes.website
                      }
                      aria-describedby="website-description"
                      ref={register({ required: true, maxLength: 80 })}
                    />
                  </dd>
                </div>
                <div className="flex items-center px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Instagram
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input
                      type="text"
                      name="instagram"
                      id="instagram"
                      className="block w-full text-gray-900 border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
                      placeholder={
                        !data.attributes.instagram
                          ? "Votre nom d'utilisateur Instagram"
                          : data.attributes.instagram
                      }
                      aria-describedby="instagram-description"
                      ref={register({ required: true, maxLength: 80 })}
                    />
                  </dd>
                </div>
                <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Abonnement aux courriels
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
                              Désabonné·e
                            </option>
                            <option value="false">Abonné·e</option>
                          </>
                        ) : (
                          <>
                            <option value="true">Désabonné·e</option>
                            <option value="false" selected>
                              Abonné·e
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
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Mise à jour réussie!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Vos changements ont bien été pris en compte.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md shadow-sm cursor-pointer hover:text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={closeModal}
                    >
                      Parfait, merci!
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

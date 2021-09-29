import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Dialog, Transition } from '@headlessui/react'

import NextLink from 'next/link'

export default function Home() {
  // headlessui
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  let [isOpenError, setIsOpenError] = useState(false)

  function closeModalError() {
    setIsOpenError(false)
  }

  function openModalError() {
    setIsOpenError(true)
  }

  // react-hook-form
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async (data) => {
    const result = await fetch('../api/findProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (result.status === 200) {
      console.log('Success!')
      openModal()
    } else {
      console.log('Error!')
      openModalError()
    }
  }

  return (
    <>
      <div className="w-full max-w-2xl mx-auto overflow-hidden bg-white shadow sm:rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid items-center justify-between grid-flow-col px-4 py-5">
            <div className="">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Accéder à votre profil
              </h3>
              <p className="max-w-2xl mt-1 text-sm text-gray-500">
                Entrez l'adresse courriel associée avec votre profil d'adhésion.
                <br />
                Nous vous enverrons un courriel automatisé afin d'accéder à votre profil.
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
                placeholder="Votre adresse courriel"
                aria-describedby="email-description"
                ref={register({ required: true, maxLength: 80 })}
              />
              <button
                type="submit"
                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-900 bg-gray-200 border border-transparent rounded-md shadow-sm cursor-pointer hover:text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Accéder
              </button>
            </div>
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
                  as="div"
                  className="grid items-center justify-start grid-flow-col space-x-2 text-xl font-medium leading-6 text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3>Succès</h3>
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Nous avons trouvé un profil associé à cette adresse courriel. Nous vous avons envoyé un lien de connexion par courriel.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-green-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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
      <Transition appear show={isOpenError} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalError}
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
                  as="div"
                  className="grid items-center justify-start grid-flow-col space-x-2 text-xl font-medium leading-6 text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-error-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3>Erreur</h3>
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Nous n'avons pas pu trouver de profil associé à cette adresse courriel.
                    Merci de vérifier votre adresse.
                  </p>
                </div>

                <div className="grid justify-center grid-flow-col gap-4 mx-auto mt-4">
                  <a
                    href="https://montrealphoto.club"
                    className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 sm:w-auto sm:text-sm"
                  >
                    S'inscrire
                  </a>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModalError}
                  >
                    Fermer
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

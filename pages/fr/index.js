import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Dialog, Transition } from '@headlessui/react'


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
      <div className="mx-auto w-full max-w-2xl overflow-hidden bg-white shadow sm:rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-flow-col items-center justify-between px-4 py-5">
            <div className="">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Accéder à votre profil
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Entrez l'adresse courriel associée avec votre profil d'adhésion.
                <br />
                Nous vous enverrons un courriel automatisé afin d'accéder à
                votre profil.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <div className="flex items-center justify-between bg-gray-50 px-4 py-5">
              <input
                type="text"
                name="email"
                id="email"
                className="block w-full max-w-lg rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                placeholder="Votre adresse courriel"
                aria-describedby="email-description"
                ref={register({ required: true, maxLength: 80 })}
              />
              <button
                type="submit"
                className="inline-flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-base font-medium text-gray-900 shadow-sm hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
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
              <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="grid grid-flow-col items-center justify-start space-x-2 text-xl font-medium leading-6 text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
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
                    Nous avons trouvé un profil associé à cette adresse
                    courriel. Nous vous avons envoyé un lien de connexion par
                    courriel.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-green-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
              <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="grid grid-flow-col items-center justify-start space-x-2 text-xl font-medium leading-6 text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-error-600"
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
                    Nous n'avons pas pu trouver de profil associé à cette
                    adresse courriel. Merci de vérifier votre adresse.
                  </p>
                </div>

                <div className="mx-auto mt-4 grid grid-flow-col justify-center gap-4">
                  <a
                    href="https://montrealphoto.club"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 sm:w-auto sm:text-sm"
                  >
                    S'inscrire
                  </a>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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

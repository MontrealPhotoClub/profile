import { useRouter } from 'next/router'
import useSWR from 'swr'

import NextLink from 'next/link'

const fetcher = (url) => fetch(url).then((res) => res.json())

function Profile() {
  const router = useRouter()
  const url = `../api/getProfile/${router.query.slug}`

  // Use a ternary operator to only fetch the data when the ID isn't undefined
  const { data, error } = useSWR(url, fetcher)

  if (error)
    return (
      <div className="mx-auto w-full max-w-2xl overflow-hidden bg-white shadow-sm sm:rounded-lg">
        <div className="grid grid-flow-col items-center justify-between px-4 py-5">
          <div className="">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Erreur: profil introuvable
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Nous n'avons pas pu trouver votre profil.
            </p>
          </div>
          <div className="mx-auto grid grid-flow-col justify-center gap-4">
            <a
              href="https://montrealphoto.club"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-xs hover:bg-green-700 focus:outline-hidden focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              S'inscrire
            </a>
            <NextLink href="/" legacyBehavior>
              <span className="inline-flex w-full cursor-pointer justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-xs hover:text-gray-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm">
                Retourner à l'accueil
              </span>
            </NextLink>
          </div>
        </div>
      </div>
    )
  if (!data)
    return (
      <div className="mx-auto w-full max-w-2xl overflow-hidden bg-white shadow-sm sm:rounded-lg">
        <div className="grid grid-flow-col items-center justify-between px-4 py-5">
          <div className="">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Votre profil
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Voici les informations associées à votre profil
            </p>
          </div>
          <div className="">
            <NextLink href={`/${router.query.slug}/edit`} legacyBehavior>
              <span className="inline-flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-base font-medium text-gray-900 shadow-xs hover:bg-green-500 hover:text-white focus:outline-hidden focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                Éditer votre profil
              </span>
            </NextLink>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Prénom</dt>
              <dd className="h-6 animate-pulse rounded-sm bg-gray-300 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Nom de famille
              </dt>
              <dd className="h-6 animate-pulse rounded-sm bg-gray-300 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Adresse courriel
              </dt>
              <dd className="h-6 animate-pulse rounded-sm bg-gray-300 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Membre depuis
              </dt>
              <dd className="h-6 animate-pulse rounded-sm bg-gray-300 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Langue</dt>
              <dd className="h-6 animate-pulse rounded-sm bg-gray-300 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Site web</dt>
              <dd className="h-6 animate-pulse rounded-sm bg-gray-300 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Instagram</dt>
              <dd className="h-6 animate-pulse rounded-sm bg-gray-300 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Abonnement aux courriels
              </dt>
              <dd className="h-6 animate-pulse rounded-sm bg-gray-300 sm:col-span-2 sm:mt-0"></dd>
            </div>
          </dl>
        </div>
      </div>
    )

  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden bg-white shadow-sm sm:rounded-lg">
      <div className="grid grid-flow-col items-center justify-between px-4 py-5">
        <div className="">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Votre profil
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Voici les informations associées à votre profil
          </p>
        </div>
        <div className="">
          <NextLink href={`/fr/${router.query.slug}/edit`} legacyBehavior>
            <span className="inline-flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-base font-medium text-gray-900 shadow-xs hover:bg-green-500 hover:text-white focus:outline-hidden focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
              Éditer votre profil
            </span>
          </NextLink>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Prénom</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {!data.attributes.firstName ? (
                <span className="italic text-gray-400">Aucun</span>
              ) : (
                data.attributes.firstName
              )}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Nom de famille
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {!data.attributes.lastName ? (
                <span className="italic text-gray-400">Aucun</span>
              ) : (
                data.attributes.lastName
              )}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Adresse courriel
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {data.attributes.email}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Membre depuis</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {new Date(data.attributes.created_at * 1000).toLocaleDateString(
                'en-CA'
              )}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Langue</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {data.attributes.language === 'fr' ? 'French' : 'English'}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Site web</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {!data.attributes.website ? (
                <span className="italic text-gray-400">Aucun</span>
              ) : (
                data.attributes.website
              )}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Instagram</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {!data.attributes.instagram ? (
                <span className="italic text-gray-400">Aucun</span>
              ) : (
                data.attributes.instagram
              )}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Abonnement aux courriels
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {data.unsubscribed === true ? 'Désabonné·e' : 'Abonné·e'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default Profile

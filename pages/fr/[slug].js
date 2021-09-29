import useSWR from 'swr'
import { useRouter } from 'next/router'

import NextLink from 'next/link'
import { route } from 'next/dist/server/router'

const fetcher = (url) => fetch(url).then((res) => res.json())

function Profile() {
  const router = useRouter()
  const url = `../api/getProfile/${router.query.slug}`

  // Use a ternary operator to only fetch the data when the ID isn't undefined
  const { data, error } = useSWR(url, fetcher)

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
              <dt className="text-sm font-medium text-gray-500">Nom de famille</dt>
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
          <NextLink href={`/fr/${router.query.slug}/edit`}>
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
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {!data.attributes.firstName ? (
                <span className="italic text-gray-400">Aucun</span>
              ) : (
                data.attributes.firstName
              )}
            </dd>
          </div>
          <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Last name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {!data.attributes.lastName ? (
                <span className="italic text-gray-400">Aucun</span>
              ) : (
                data.attributes.lastName
              )}
            </dd>
          </div>
          <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Adresse courriel
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {data.attributes.email}
            </dd>
          </div>
          <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Membre depuis</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {new Date(data.attributes.created_at * 1000).toLocaleDateString(
                'en-CA'
              )}
            </dd>
          </div>
          <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Langue</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {data.attributes.language === 'fr' ? 'French' : 'English'}
            </dd>
          </div>
          <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Site web</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {!data.attributes.website ? (
                <span className="italic text-gray-400">Aucun</span>
              ) : (
                data.attributes.website
              )}
            </dd>
          </div>
          <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Instagram</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {!data.attributes.instagram ? (
                <span className="italic text-gray-400">Aucun</span>
              ) : (
                data.attributes.instagram
              )}
            </dd>
          </div>
          <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Abonnement aux courriels
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {data.unsubscribed === true ? 'Désabonné·e' : 'Abonné·e'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default Profile

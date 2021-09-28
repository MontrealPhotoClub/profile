import useSWR from 'swr'
import { useRouter } from 'next/router'

import NextLink from 'next/link'
import { route } from 'next/dist/server/router'

const fetcher = (url) => fetch(url).then((res) => res.json())

function Profile() {
  const router = useRouter()
  const url = `/api/getProfile/${router.query.slug}`

  // Use a ternary operator to only fetch the data when the ID isn't undefined
  const { data, error } = useSWR(url, fetcher)

  if (error)
    return (
      <div className="w-full max-w-sm p-4 mx-auto border border-gray-200 rounded-md shadow">
        <div className="text-center">
          <h1 className="text-xl font-bold">Error: member not found</h1>
          <p>We couldn't find your member profile.</p>
        </div>
        <div className="grid justify-center grid-flow-col gap-4 mx-auto mt-5">
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
    )
  if (!data)
    return (
      <div className="w-full max-w-sm p-4 mx-auto border rounded-md shadow border-brand-300">
        <div className="flex space-x-4 animate-pulse">
          <div className="flex-1 py-1 space-y-4">
            <div className="w-3/4 h-4 rounded bg-brand-400"></div>
            <div className="space-y-2">
              <div className="h-4 rounded bg-brand-400"></div>
              <div className="w-5/6 h-4 rounded bg-brand-400"></div>
            </div>
          </div>
        </div>
      </div>
    )

  return (
    <div className="w-full max-w-sm p-4 mx-auto border rounded-md shadow border-brand-300">
      <div className="grid mb-4 space-y-2">
        <div>Email: {data.attributes.email}</div>
        <div>Member since: {data.attributes.created_at}</div>
        <div>Language: {data.attributes.language === "fr" ? 'French' : 'English'}</div>
      </div>
      <div className="grid justify-end grid-flow-col gap-4 mx-auto mt-5">
        <NextLink href={`/${router.query.slug}/edit`}>
          <span className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md shadow-sm cursor-pointer hover:text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
            Edit profile
          </span>
        </NextLink>
      </div>
    </div>
  )
}

export default Profile

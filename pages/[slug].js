import useSWR from 'swr'
import { useRouter } from 'next/router'

const fetcher = (url) => fetch(url).then((res) => res.json())

function Profile() {
  const router = useRouter()
  const url = `/api/getProfile/${router.query.slug}`

  // Use a ternary operator to only fetch the data when the ID isn't undefined
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>Error</div>
  if (!data) return <div>loading...</div>

  return <div>hello {data.attributes.email}</div>
}

export default Profile

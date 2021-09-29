const API_KEY = process.env.CIO_BETA_KEY

export default async (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email

    const response = await fetch(
      `https://beta-api.customer.io/v1/api/customers?email=${email}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    )

    const results = await response.json()

    if (results.results.length === 1) {
      const identifier = results.results[0].email
      const payload = JSON.stringify({ name: 'Login Requested' })

      const event = await fetch(
        `https://track.customer.io/api/v1/customers/${identifier}/events`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `Basic ${process.env.NEXT_PUBLIC_CIO_TRACK_KEY}`,
          },
          body: payload,
        }
      )

      return res.status(200).end()
    } else {
      console.error('No profile associated with that email')
      return res.status(404).end()
    }
  }
  return res.status(500).end()
}

export default async function handler(req, res) {
  const { id } = req.query

  const API_KEY = process.env.CIO_BETA_KEY
  const response = await fetch(
    `https://beta-api.customer.io/v1/api/customers/${id}/attributes`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      method: 'GET',
    }
  )

  const profiledata = await response.json()

  res
    .status(200)
    .json({
      attributes: profiledata.customer.attributes,
      unsubscribed: profiledata.customer.unsubscribed,
    })
}

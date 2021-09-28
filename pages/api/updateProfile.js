export default async (req, res) => {
  if (req.method === 'POST') {
    const payload = JSON.stringify({ data: req.body })

    await fetch('https://track.customer.io/api/v1/forms/updateProfile/submit', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Basic ${process.env.NEXT_PUBLIC_CIO_TRACK_KEY}`,
      },
      body: payload,
    })

    console.log('Profile updated!')
    return res.status(200).end()
  }
  return res.status(500).end()
}

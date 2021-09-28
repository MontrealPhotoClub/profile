export default async (req, res) => {
  if (req.method === 'POST') {
    await fetch('https://track.customer.io/api/v1/forms/updateProfile/submit', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Basic ${process.env.NEXT_PUBLIC_CIO_TRACK_KEY}`,
      },
      body: JSON.stringify({
        data: {
          email: `${req.body.email}`,
          firstName: `${req.body.firstName}`,
          lastName: `${req.body.lastName}`,
          instagram: `${req.body.instagram}`,
          website: `${req.body.website}`,
          language: `${req.body.language}`,
          unsubscribed: `${req.body.unsubscribed}`,
        },
      }),
    })

    console.log('Profile updated!')

    return res.status(200).end()
  }
  return res.status(500).end()
}

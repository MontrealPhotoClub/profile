module.exports = {
  async redirects() {
    return [
      {
        source: '/fr/api/:slug*',
        destination: '/api/:slug*', // Matched parameters can be used in the destination
        permanent: true,
      },
    ]
  },
}

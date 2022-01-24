import 'tailwindcss/tailwind.css'

import Head from 'next/head'

import { DefaultSeo } from 'next-seo'

import SEO from '../next-seo-config'

import Header from '../components/Header'
import Footer from '../components/Footer'

import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo {...SEO} />
      <div className="mx-auto max-w-6xl px-6 pb-6">
        <Header />
        <div className="mx-auto py-12">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default MyApp

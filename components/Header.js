import NextLink from 'next/link'
import { useRouter } from 'next/router'

import Logo from '../elements/logos/Logo'
import LogoMobile from '../elements/logos/LogoMobile'
import { TranslateIcon } from '@heroicons/react/solid'

export default function Header() {
  const router = useRouter()

  return (
    <div className="sticky top-0 z-10 mx-auto max-w-6xl bg-white bg-opacity-90 pt-4">
      <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 text-xl font-semibold">
        <div>
          <NextLink href="/">
            <div className="cursor-pointer">
              <Logo />
            </div>
          </NextLink>
          <NextLink href="/">
            <div className="cursor-pointer">
              <LogoMobile />
            </div>
          </NextLink>
        </div>
        <div className="grid grid-flow-col items-center gap-2">
          <a href="https://montrealphoto.club">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer hover:text-brand-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </a>
          <NextLink href={router.pathname.includes('fr') == true ? '/' : '/fr'}>
            <TranslateIcon className="h-6 w-6 cursor-pointer hover:text-brand-600" />
          </NextLink>
        </div>
      </div>
    </div>
  )
}

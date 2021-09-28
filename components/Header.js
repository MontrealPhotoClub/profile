import NextLink from 'next/link'
import { useRouter } from 'next/router'

import Logo from '../elements/logos/Logo'
import LogoMobile from '../elements/logos/LogoMobile'

export default function Header() {
  return (
    <div className="sticky top-0 z-10 max-w-6xl pt-4 mx-auto bg-white bg-opacity-90">
      <div className="flex items-center justify-between py-6 text-xl font-semibold border-b-2 border-gray-100">
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
        <div className="grid grid-flow-col gap-4 text-sm font-medium outline-none md:text-base md:gap-8 focus:outline-none">
          <a href="https://montrealphoto.club" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 cursor-pointer"
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
        </div>
      </div>
    </div>
  )
}

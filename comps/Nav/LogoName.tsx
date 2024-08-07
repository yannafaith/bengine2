
import Link from 'next/link'
import classNames from 'classnames'

export function LogoName() {
    return (
      <Link href={"/"} className={classNames("text-3xl font-light mr-10")}>The
        <span 
         className={classNames(
         "font-normal text-3xl",
         "inline-block text-transparent bg-clip-text",
         "bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400",
         )}> ART
        </span>
        <span className={classNames("dark:text-gray-400 text-2xl")}>Company</span>
      </Link>
    )
  }
  
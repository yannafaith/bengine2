
import Link from 'next/link'
import classNames from 'classnames'
import { ThemeButton } from './ThemeButton'
import { getRoutes } from 'actions/routes'
import { LogoName } from './LogoName'

async function NavBar() {
  const routes = await getRoutes()
  return (
    <header className={classNames(
      "p-[20px]",
      "flex justify-between items-center",
      "bg-slate-200 dark:bg-slate-950 rounded"
    )}>
      <nav>
        <ThemeButton/>
        {routes.map((link,i)=> 
          <Link 
            key={i}
            href={link.path} 
            className={classNames("uppercase px-4 text-xs")}>
              {link.title}
          </Link>)}
      </nav>
      <LogoName/>
    </header>
  )
}

export { NavBar }

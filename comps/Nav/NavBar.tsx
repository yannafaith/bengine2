
import Link from 'next/link'
import classNames from 'classnames'
import { ThemeButton } from './ThemeButton'
import { getRoutes } from 'actions/routes'
import { LogoName } from './LogoName'
import { ICONS_OUTLINE } from '@/p5/Controls'

async function NavBar() {
  const routes = await getRoutes()
  return (
    <header className={classNames(
      "h-[80px] px-[40px] py-2 tracking-widest",
      "flex flex-col justify-between items-center md:flex-row",
      "bg-slate-200 dark:bg-slate-950 rounded"
    )}>
      <div className='flex items-center'>
        <ThemeButton/>
        <LogoName/>
      </div>
      <nav className='flex justify-center items-center'>
      <Link href={`/${'arizmendi'}`} className={classNames("flex mx-2")}>
        <span className={ICONS_OUTLINE}>home</span>
      </Link>
  
        { routes.map((link,i)=> 
          <Link key={i} href={link.path} className={classNames("uppercase text-xs m-2")}>
            {link.title}
          </Link>
        )}
      </nav>
    </header>
  )
}

export { NavBar }

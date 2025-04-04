import { FC } from 'react';
import { LuMenu } from 'react-icons/lu';
import NetworkSwitcher from './NetworkSwitcher';

export const AppBar: FC = (props)=> {
  
  const menu = [
    { name: 'Home', link: '#home' },
    { name: 'Tools', link: '#tools' },
    { name: 'Features', link: '#features' },
    { name: 'Faq', link: '#faq' },
    { name: 'Price', link: '#price' },
  ];

  return (
    <div>
      <header id='navbar-sticky' className='navbar'>
        <div className='container'>
          <nav>
            <a href="/" className='logo'>
              <img src='assets/images/logo1.png' className='h-10' alt="logo" />
            </a>
            <div className='ms-auto flex items-center px-2.5 lg:hidden'>
              <button className='hs-collapse-toggle bg-default-100/5 inline-flex h-9 w-12 items-center justify-center rounded-md border border-white/20' type='button' data-hs-collapse="#mobilemenu" data-hs-type="collapse">
              <i data-lucide="menu" className='stroke-white'>
                <LuMenu />
              </i>
              </button>
            </div>
          </nav>
        </div>
      </header>
    </div>
  )

};
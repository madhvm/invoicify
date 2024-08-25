import React from 'react';

function Navbar() {
  return (
    <nav className='h-[6%] bg-blue-200 items-center'>
      <ul className='flex gap-10 justify-center items-center h-full cursor-pointer'>
        <li className='hover:underline'>Dashboard</li>
        <li className='hover:underline'>Invoices</li>
        <li className='hover:underline'>Setting</li>
      </ul>
    </nav>
  );
}

export default Navbar;
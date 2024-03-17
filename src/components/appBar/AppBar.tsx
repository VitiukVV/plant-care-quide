import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AppBar = () => {
  return (
    <>
      <header>
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="garden">Garden</NavLink>
        </nav>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default AppBar;

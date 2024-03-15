import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AppBar = () => {
  return (
    <>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="add">+</NavLink>
          <NavLink to="schedule">Schedule</NavLink>
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

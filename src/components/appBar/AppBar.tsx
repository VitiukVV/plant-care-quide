import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AppBar = () => {
  return (
    <>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <footer>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/add">+</NavLink>
          <NavLink to="/schedule">Schedule</NavLink>
        </nav>
      </footer>
    </>
  );
};

export default AppBar;

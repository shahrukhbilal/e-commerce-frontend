import { Outlet } from 'react-router-dom';
import TopHeader from './components/TopHeader';
import MainNavbar from './components/MainNavbar';
import MainFooter from './components/MainFooter';

export default function SimpleLayout() {
  return (
    <>
      <TopHeader />
      <MainNavbar />
      <Outlet />  {/* Renders ProductDetail, Cart, About, Contact, etc. */}
      <MainFooter></MainFooter>
    </>
  );
}

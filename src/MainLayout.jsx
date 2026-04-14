import { Outlet } from 'react-router-dom';
import TopHeader from './components/TopHeader';
import MainNavbar from './components/MainNavbar';
import HeroSection from './components/HeroSection';
import ProductSection from './components/ProductSection';
import FeaturedCategories from './components/FeaturedCategories';
import MainFooter from './components/MainFooter';

export default function MainLayout() {
  return (
    <>
      <TopHeader />
      <MainNavbar />
      <HeroSection />
      <Outlet />          {/* Renders Home content */}
      <FeaturedCategories />
      <ProductSection></ProductSection>
      <MainFooter></MainFooter>
    </>
  );
}

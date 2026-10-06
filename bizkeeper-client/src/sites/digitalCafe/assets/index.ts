// Asset exports for the DigitalCafe demo site
// This allows us to import assets as modules instead of using public URLs

// Images
import aboutImg from './img/about.png';
import bgImg from './img/bg.jpg';
import carousel1 from './img/carousel-1.jpg';
import carousel2 from './img/carousel-2.jpg';
import menu1 from './img/menu-1.jpg';
import menu2 from './img/menu-2.jpg';
import menu3 from './img/menu-3.jpg';
import overlayBottom from './img/overlay-bottom.png';
import overlayTop from './img/overlay-top.png';
import service1 from './img/service-1.jpg';
import service2 from './img/service-2.jpg';
import service3 from './img/service-3.jpg';
import service4 from './img/service-4.jpg';
import testimonial1 from './img/testimonial-1.jpg';
import testimonial2 from './img/testimonial-2.jpg';
import testimonial3 from './img/testimonial-3.jpg';
import testimonial4 from './img/testimonial-4.jpg';

export const images = {
  about: aboutImg,
  bg: bgImg,
  carousel1,
  carousel2,
  menu1,
  menu2,
  menu3,
  overlayBottom,
  overlayTop,
  service1,
  service2,
  service3,
  service4,
  testimonial1,
  testimonial2,
  testimonial3,
  testimonial4,
};

// For backward compatibility with public URLs
export const getAssetUrl = (path: string): string => {
  // Map old paths to new imports
  const mapping: Record<string, string> = {
    '/demo-cafe-assets/img/about.png': aboutImg,
    '/demo-cafe-assets/img/bg.jpg': bgImg,
    '/demo-cafe-assets/img/carousel-1.jpg': carousel1,
    '/demo-cafe-assets/img/carousel-2.jpg': carousel2,
    '/demo-cafe-assets/img/menu-1.jpg': menu1,
    '/demo-cafe-assets/img/menu-2.jpg': menu2,
    '/demo-cafe-assets/img/menu-3.jpg': menu3,
    '/demo-cafe-assets/img/overlay-bottom.png': overlayBottom,
    '/demo-cafe-assets/img/overlay-top.png': overlayTop,
    '/demo-cafe-assets/img/service-1.jpg': service1,
    '/demo-cafe-assets/img/service-2.jpg': service2,
    '/demo-cafe-assets/img/service-3.jpg': service3,
    '/demo-cafe-assets/img/service-4.jpg': service4,
    '/demo-cafe-assets/img/testimonial-1.jpg': testimonial1,
    '/demo-cafe-assets/img/testimonial-2.jpg': testimonial2,
    '/demo-cafe-assets/img/testimonial-3.jpg': testimonial3,
    '/demo-cafe-assets/img/testimonial-4.jpg': testimonial4,
  };
  
  return mapping[path] || path;
};


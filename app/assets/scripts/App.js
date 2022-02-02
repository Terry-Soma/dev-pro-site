import '../styles/styles.css';
import MobileMenu from './modules/MobileMenu';
import Reveal from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
let mobileMenu = new MobileMenu();
let stickyHeader = new StickyHeader();
new Reveal(document.querySelectorAll('.feature-item'), 75);
new Reveal(document.querySelectorAll('.testimonial'), 50);

if (module.hot) {
  module.hot.accept();
}

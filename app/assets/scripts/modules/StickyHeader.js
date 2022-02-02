import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

export default class StickyHeader {
  constructor() {
    this.siteHeader = document.querySelector('.site-header');
    this.pageSections = document.querySelectorAll('.page-section');
    this.browserHeight = window.innerHeight;
    this.preScrollY = window.scrollY;
    this.events();
  }
  events() {
    window.addEventListener(
      'scroll',
      throttle(() => this.runOnScroll(), 200)
    );
    window.addEventListener(
      'resize',
      debounce(() => {
        this.browserHeight = window.innerHeight;
      }, 500)
    );
  }

  runOnScroll() {
    this.checkScrollDir();
    if (window.scrollY > 60) {
      this.siteHeader.classList.add('site-header--dark');
    } else {
      this.siteHeader.classList.remove('site-header--dark');
    }

    this.pageSections.forEach((el) => this.calcSection(el));
  }
  checkScrollDir() {
    if (window.scrollY > this.preScrollY) {
      this.scrollDir = 'down';
    } else {
      this.scrollDir = 'up';
    }
    this.preScrollY = window.scrollY;
  }

  calcSection(el) {
    if (
      window.scrollY + this.browserHeight > el.offsetTop &&
      window.scrollY < el.offsetTop + el.offsetHeight
    ) {
      let scrollPercent =
        (el.getBoundingClientRect().y / this.browserHeight) * 100;

      if (
        (scrollPercent < 18 &&
          scrollPercent > 0.1 &&
          this.scrollDir === 'down') ||
        (scrollPercent < 33 && this.scrollDir === 'up')
      ) {
        let matchingLink = el.getAttribute('data-matching-link');
        document
          .querySelectorAll(`.primary-nav a:not(${matchingLink})`)
          .forEach((el) => el.classList.remove('is-current-link'));
        document.querySelector(matchingLink).classList.add('is-current-link');
      }
    }
  }
}

import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
export default class Reveal {
  constructor(elements, limit) {
    this.browserHeight = window.innerHeight;
    this.itemsToReveal = elements;
    this.limit = limit;
    this.hideInit();
    this.scrollThrottle = throttle(this.calcCaller, 500).bind(this);
    this.events();
  }

  events() {
    window.addEventListener('scroll', this.scrollThrottle);
    window.addEventListener(
      'resize',
      debounce(() => {
        this.browserHeight = window.innerHeight;
      }, 500)
    );
  }
  calcCaller() {
    this.itemsToReveal.forEach((el) => {
      if (!el.isRevealed) {
        this.calcIfScrolledTo(el);
      }
    });
  }
  calcIfScrolledTo(el) {
    if (window.scrollY + this.browserHeight > el.offsetTop) {
      let scrollPercent =
        (el.getBoundingClientRect().y / this.browserHeight) * 100;
      if (scrollPercent < this.limit) {
        el.classList.add('reveal-item--is-visible');
        el.isRevealed = true;
        if (el.isLastItem) {
          window.removeEventListener('scroll', this.scrollThrottle);
        }
      }
    }
  }

  hideInit() {
    this.itemsToReveal.forEach((el) => {
      el.classList.add('reveal-item');
      el.isRevealed = false;
    });
    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
  }
}

/*
import './className';

[
  `company-values__inner-container blabla hello`,
  isFixed && 'scroll-fixed',
  showContent && 'show-content',
  isRevealed && 'revealed'
].css()
*/

/*
declare global {
  interface Array<T> {
    css(): Array<T>;
  }
}
*/

Array.prototype.css = function () {
  return this?.filter(Boolean).join(' ');
};

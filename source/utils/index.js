export const IconFont = {
  SITE_LOGO: 'a',
  SEARCH: 'b',
  HOME: 'c',
  TWITTER: 'd',
  GITHUB: 'e',
  INSTAGRAM: 'f',
  BUBBLE: 'g',
  DOWN_ARROW: 'h',
  CROSS: 'i'
};

export const generateInkRipple = (parent, event) => {
  if (!parent) return;
  const element = parent.querySelector('.ink');
  if (!element) {
    parent.insertAdjacentHTML('afterbegin', '<span class="ink"></span>');
  }
  const ink = parent.querySelector('.ink');
  ink.className = ink.className.replace(/\s?animate/g, '');
  if (!ink.clientHeight && !ink.clientWidth) {
    const d = Math.max(parent.offsetHeight, parent.offsetWidth);
    ink.style.height = `${d}px`;
    ink.style.width = `${d}px`;
  }
  const rect = parent.getBoundingClientRect();
  const x = event.pageX - (rect.left + document.body.scrollLeft) - (ink.clientWidth / 2);
  const y = event.pageY - (rect.top + document.body.scrollTop) - (ink.clientHeight / 2);
  ink.style.top = `${y}px`;
  ink.style.left = `${x}px`;
  ink.className += ' animate';
};

export const scrollToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

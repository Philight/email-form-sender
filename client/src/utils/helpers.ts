export const openURL = (URL: string): void => {
  window.open(URL, '_blank', 'noreferrer');
};

export const getAppURL = (): string => {
  // console.log('current URL 👉️', window.location.href);
  // console.log('current Pathname 👉️', window.location.pathname);
  // console.log(window.location.href.split(window.location.pathname)[0]);
  return window.location.href.split(window.location.pathname)[0];
};

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

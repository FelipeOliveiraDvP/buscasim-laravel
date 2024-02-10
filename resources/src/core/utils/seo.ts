import ReactGA from 'react-ga';

export function gaPageView(path: string) {
  const { VITE_GOOGLE_TAG_ID, DEV } = import.meta.env;

  ReactGA.initialize(VITE_GOOGLE_TAG_ID, { debug: DEV });
  ReactGA.pageview(path);
}

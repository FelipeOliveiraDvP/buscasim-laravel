// import optionsService from '../services/options/options.service';

export async function gaPageView(title: string, path: string) {
  // const googleTag = await optionsService.getOption('GOOGLE_TAG_ID');

  // if (
  //   googleTag !== false &&
  //   'gtag' in window &&
  //   typeof window.gtag === 'function'
  // ) {
  //   window.gtag('event', 'page_view', {
  //     page_title: title,
  //     page_location: path,
  //   });
  // }

  if ('dataLayer' in window && Array.isArray(window.dataLayer)) {
    window.dataLayer?.push({
      event: 'pageview',
      page: {
        page_title: title,
        page_location: path,
      },
    });
  }
}

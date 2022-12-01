import { Platform } from "@ionic/angular";
import { NavigationClient } from "@azure/msal-browser";
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

export class CustomNavigationClientAzure extends NavigationClient {

  constructor(
    private iab: InAppBrowser,
    private platform: Platform
  ) {
    super();
  }

  override async navigateExternal(url: string, options: any) {
    if (window.hasOwnProperty("cordova")) {
      const browser = this.iab.create(url, '_blank', {
        location: 'no',
        clearcache: 'yes',
        clearsessioncache: 'yes',
        hidenavigationbuttons: 'yes',
        hideurlbar: 'yes',
        fullscreen: 'yes',
        toolbar: 'no',
        disallowoverscroll: 'yes'
      });

      browser.on('loadstart').subscribe((event: any) => {
        if (event.url.includes('#code')) {
          // Close the in app browser and redirect to localhost + the state parameter
          browser.close();

          const domain = event.url.split('#')[0];
          let url = event.url.replace(domain, 'http://localhost');

          if (this.platform.is('ios')) {
            url = event.url.replace(domain, 'ionic://localhost');
          }

          window.location.href = url;
        }
      });

      browser.on('loadstart').subscribe((event: any) => { });
    } else {
      if (options.noHistory) {
        window.location.replace(url);
      } else {
        window.location.assign(url);
      }
    }

    return true;
  }
}
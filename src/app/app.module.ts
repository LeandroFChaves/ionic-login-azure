import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MsalModule, MsalRedirectComponent } from '@azure/msal-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from 'src/environments/environment';

const protectedResourceMap = new Map<string, Array<string>>();
protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['openid']);

@NgModule({
  declarations: [
    AppComponent
  ],
  
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        clientId: environment.LOGIN_AZURE_CLIENT_ID,
        authority: 'https://login.microsoftonline.com/' + environment.LOGIN_AZURE_TENANT_ID,
        redirectUri: 'http://localhost',
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,
      },
      system: {
        allowRedirectInIframe: true,
        windowHashTimeout: 60000,
        iframeHashTimeout: 6000,
        loadFrameTimeout: 0,
        asyncPopups: false
      },
    }), {
      interactionType: InteractionType.Popup, // MSAL Guard Configuration
      authRequest: {
        scopes: ['openid']
      }
    }, {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: protectedResourceMap,
    })
  ],
  
  providers: [
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy
    },
    InAppBrowser
  ],
  
  bootstrap: [
    AppComponent,
    MsalRedirectComponent
  ],
})
export class AppModule {}

import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType } from '@azure/msal-browser';
import { filter } from 'rxjs';

import { CustomNavigationClientAzure } from '../custom-navigation-client-azure';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private platform: Platform,
    private iab: InAppBrowser,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {
    this.msalService.instance.setNavigationClient(new CustomNavigationClientAzure(this.iab, this.platform));
  }

  ngOnInit(){
    this.msalBroadcastService.msalSubject$.pipe(
      filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS || msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS),
    ).subscribe((result: EventMessage) => {
      console.log('Login realizado com sucesso.')
      console.log(result);
    });
  }

  loginAD() {
    this.msalService.instance.loginRedirect();
  }

}

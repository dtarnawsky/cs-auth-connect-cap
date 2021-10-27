import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public authenticationChange$: Observable<boolean>;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationChange$ = authenticationService.authenticationChange$;
  }


  async login(): Promise<void> {
    // This line is required if iosWebView is shared and we are using Identity Vault. It prevents the privacy screen from displaying
    // Device.setHideScreenOnBackground(false);
    await this.authenticationService.login();
  }

  async logout(): Promise<void> {
    this.authenticationService.logout();
  }

  async refresh() {
    console.log(await this.authenticationService.isRefreshTokenAvailable());
    const token = await this.authenticationService.getAccessToken();
    console.log(token);
    await this.authenticationService.refreshSession();
    const atoken = await this.authenticationService.getAccessToken();
    console.log(atoken);
    if (atoken != token) {      
      alert('Token was refreshed')
    }    
  }

}

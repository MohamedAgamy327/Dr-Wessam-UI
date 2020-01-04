import { Component } from '@angular/core';
import { CredentialService } from 'src/app/_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  panelOpenState = false;
  leftMenu=false;

  constructor(public credentialService: CredentialService) {
  }

  editProfile() {

  }

  logout() {
    this.credentialService.logout();
  }



}

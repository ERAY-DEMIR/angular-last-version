import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-who-are-we',
  templateUrl: './who-are-we.component.html',
  styleUrl: './who-are-we.component.css'
})
export class WhoAreWeComponent {
  constructor(public translate: TranslateService) {
    // Set default language
    this.translate.setDefaultLang('en');
    // Set initial language if needed
    this.translate.use('en');
    translate.addLangs(['en', 'tr']);
  }
}

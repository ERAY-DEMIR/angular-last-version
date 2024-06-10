import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  
  isDarkTheme: boolean = false;
location: any;
  toggleDarkMode() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  constructor(public translate: TranslateService) {
    // Set default language
    this.translate.setDefaultLang('en');
    // Set initial language if needed
    this.translate.use('en');
    translate.addLangs(['en', 'tr']);
  }
}

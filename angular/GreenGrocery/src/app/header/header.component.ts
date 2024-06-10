import { Component, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  username: string | null = null;
  isDarkTheme: boolean = false;

  dark_mode: string = 'assets/img/crescent-moon.png';
  light_mode: string = 'assets/img/sunny.png';

  constructor(private authService: AuthService, private router: Router, public translate: TranslateService, private renderer: Renderer2) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    translate.addLangs(['en', 'tr']);
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
      this.username = this.authService.getUsername();
    });

    this.authService.checkLoginStatus();
    this.isDarkTheme = localStorage.getItem('theme') === "Dark" ? true : false;
    this.translate.get('assets/img/crescent-moon.png').subscribe((res: string) => {
      this.dark_mode = res;
    });
    this.translate.get('assets/img/sunny.png').subscribe((res: string) => {
      this.light_mode = res;
    });
    this.setBodyBackground();
    this.productText();
    this.cardTitle();
    this.testimonialBackground();
    this.cardBackground();
  }

  ngAfterViewInit(): void {
    this.navBackground();
    this.cardBackground(); 
  }
  
  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  ChangeLang(event: any) {
    const lang = event.target.value;
    this.switchLanguage(lang);
    localStorage.setItem('theme', this.isDarkTheme ? 'Dark' : 'Light');
    this.languageBackground();
    this.testimonialBackground();
  }

  storeThemeSelection() {
    localStorage.setItem('theme', this.isDarkTheme ? 'Dark' : 'Light');
    this.setBodyBackground();
    this.testimonialBackground();
    this.productText();
    this.footerBackground();
    this.cardBackground();
    this.buyButtonBackground();
    this.cardTitle();
    this.navBackground();
    this.buttonText();
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.authService.setAuthenticated(false, null);
      this.router.navigate(['/login']);
    }, error => {
      console.error('Logout error', error);
    });
  }

  private navBackground() {
    const navBackgroundColor = this.isDarkTheme ? '#4d4d4d' : '#ffffff';
    this.renderer.setStyle(document.querySelector('.navigation'), 'background-color', navBackgroundColor);
  }

  private setBodyBackground() {
    const backgroundColor = this.isDarkTheme ? '#3b5b2d' : '#5eda5e';
    this.renderer.setStyle(document.body, 'background-color', backgroundColor);
  }

  private productText() {
    const color = this.isDarkTheme ? '#ffffff' : '#000000';
    this.renderer.setStyle(document.body, 'color', color);
  }

  private footerBackground() {
    const footerBackgroundColor = this.isDarkTheme ? '#4d4d4d' : '#ffffff';
    this.renderer.setStyle(document.querySelector('.footer'), 'background-color', footerBackgroundColor);
  }

  private languageBackground() {
    const color = this.isDarkTheme ? '#ffffff' : '#000000';
    this.renderer.setStyle(document.body, 'color', color);
  }

  private cardBackground() {
    const backgroundColor = this.isDarkTheme ? '#5eda5e' : '#3b5b2d';
    const cardContents = document.querySelectorAll('.card-content');
    const cardContents2 = document.querySelectorAll('.fruit-card');
    cardContents.forEach(cardContent => {
      this.renderer.setStyle(cardContent, 'background-color', backgroundColor);
    });
    cardContents2.forEach(cardContent2 => {
      this.renderer.setStyle(cardContent2, 'background-color', backgroundColor);
    });
  }

  private buyButtonBackground() {
    const backgroundColor = this.isDarkTheme ? '#3b5b2d' : '#5eda5e';
    const cardContents = document.querySelectorAll('.buy-now');
    cardContents.forEach((cardContent) => {
      this.renderer.setStyle(cardContent, 'background-color', backgroundColor);
    });
  }

  private cardTitle() {
    const color = this.isDarkTheme ? '#000000' : '#ffffff';
    const productTitles = document.querySelectorAll('.product-title');
    const fruitTitles = document.querySelectorAll('.fruit-title');
    const fruitCardBackground = document.querySelectorAll('.fruit-card');
    productTitles.forEach((title) => {
      this.renderer.setStyle(title, 'color', color);
    });
    const productDescriptions = document.querySelectorAll('.product-description');
    productDescriptions.forEach((description) => {
      this.renderer.setStyle(description, 'color', color);
    });
    const productPrices = document.querySelectorAll('.product-price');
    productPrices.forEach((price) => {
      this.renderer.setStyle(price, 'color', color);
    });
    fruitTitles.forEach((title) => {
      this.renderer.setStyle(title, 'color', color);
    });
    const fruitDescriptions = document.querySelectorAll('.fruit-description');
    fruitDescriptions.forEach((description) => {
      this.renderer.setStyle(description, 'color', color);
    });
    const fruitPrices = document.querySelectorAll('.fruit-price');
    fruitPrices.forEach((price) => {
      this.renderer.setStyle(price, 'color', color);
    });
  }

  private buttonText() {
    const color = this.isDarkTheme ? '#ffffff' : '#000000';
    const buyButtonText = document.querySelectorAll('.buy-now');
    buyButtonText.forEach((price) => {
      this.renderer.setStyle(price, 'color', color);
    });
  }

  private testimonialBackground() {
    const backgroundColor = this.isDarkTheme ? '#5eda5e' : '#3b5b2d';
    const testimonialContents = document.querySelectorAll('.testimonial-content');
    const textColor = this.isDarkTheme ? '#000000' : '#ffffff';
    testimonialContents.forEach(content => {
      this.renderer.setStyle(content, 'background-color', backgroundColor);
    });
    const usernames = document.querySelectorAll('.username');
    const descriptions = document.querySelectorAll('.description');
    usernames.forEach((elem) => {
      this.renderer.setStyle(elem, 'color', textColor);
    });
    descriptions.forEach((elem) => {
      this.renderer.setStyle(elem, 'color', textColor);
    });
  }
}

import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Product as Drink } from '../drink.model';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Renderer2 } from '@angular/core';
import { DrinkService } from '../drink.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit, AfterViewInit, OnDestroy {
  
  drinks: Drink[] = [];
  isDarkTheme: boolean = false;
  langChangeSubscription: Subscription;

  constructor(private drinkService: DrinkService, public translate: TranslateService, private renderer: Renderer2) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    translate.addLangs(['en', 'tr']);

    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      // Update drinks after language change
      this.updateDrinks();
      // Check theme after language change
      this.checkDarkTheme();
      this.isDarkTheme = localStorage.getItem('theme') === "Dark";
    });
  }

  ngAfterViewInit(): void {
    // Check theme after view initialization
    this.checkDarkTheme();
  }

  ngOnInit(): void {
    // Check theme on component initialization
    this.checkDarkTheme();
    // Update products on component initialization
    this.updateDrinks();
    this.cardTitle();
  }

  ngOnDestroy(): void {
    this.langChangeSubscription.unsubscribe();
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  ChangeLang(event: any) {
    const lang = event.target.value;
    this.switchLanguage(lang);
  }

  addToCart(drink: Drink) {
    // Replace with the actual customerId if available
    const customerId = 1;
    this.drinkService.addToCart(drink.id, customerId).subscribe(response => {
      console.log('Product added to cart:', response);
    });
  }

  private updateDrinks() {
    this.drinkService.getDrinks().subscribe(drinks => {
      this.drinks = drinks;
    });
  }

  private checkDarkTheme() {
    // Check if dark theme is enabled in localStorage
    this.isDarkTheme = localStorage.getItem('theme') === 'Dark';
    // Apply appropriate theme-based styles
    this.applyThemeStyles();
  }

  // Method to toggle dark mode
  toggleDarkMode() {
    this.isDarkTheme = !this.isDarkTheme;
    // Update localStorage with the new theme preference
    localStorage.setItem('theme', this.isDarkTheme ? 'Dark' : 'Light');
    // Apply appropriate theme-based styles
    this.applyThemeStyles();
    this.cardTitle();
  }

  private applyThemeStyles() {
    const backgroundColor = this.isDarkTheme ? '#3b5b2d' : '#5eda5e';
    document.documentElement.style.setProperty('--background-color', backgroundColor);
  }

  private cardTitle() {
    const color = this.isDarkTheme ? '#000000' : '#ffffff';
    const drinkTitles = document.querySelectorAll('.drink-title');
    drinkTitles.forEach((title) => {
      this.renderer.setStyle(title, 'color', color);
    });
    const drinkDescriptions = document.querySelectorAll('.drink-description');
    drinkDescriptions.forEach((description) => {
      this.renderer.setStyle(description, 'color', color);
    });
    const drinkPrices = document.querySelectorAll('.drink-price');
    drinkPrices.forEach((price) => {
      this.renderer.setStyle(price, 'color', color);
    });
  }
}

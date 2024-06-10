import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Product as Vegetable } from '../vegetable.model';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Renderer2 } from '@angular/core';
import { VegetableService } from '../vegetable.service';

@Component({
  selector: 'app-vegetables',
  templateUrl: './vegetables.component.html',
  styleUrls: ['./vegetables.component.css']
})
export class VegetablesComponent implements OnInit, AfterViewInit, OnDestroy {
  
  vegetables: Vegetable[] = [];
  isDarkTheme: boolean = false;
  langChangeSubscription: Subscription;

  constructor(private vegetableService: VegetableService, public translate: TranslateService, private renderer: Renderer2) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    translate.addLangs(['en', 'tr']);

    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      // Update vegetables after language change
      this.updateVegetables();
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
    this.updateVegetables();
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

  addToCart(vegetable: Vegetable) {
    // Replace with the actual customerId if available
    const customerId = 1;
    this.vegetableService.addToCart(vegetable.id, customerId).subscribe(response => {
      console.log('Product added to cart:', response);
    });
  }

  private updateVegetables() {
    this.vegetableService.getVegetables().subscribe(vegetables => {
      this.vegetables = vegetables;
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
    const vegetableTitles = document.querySelectorAll('.vegetable-title');
    vegetableTitles.forEach((title) => {
      this.renderer.setStyle(title, 'color', color);
    });
    const vegetableDescriptions = document.querySelectorAll('.vegetable-description');
    vegetableDescriptions.forEach((description) => {
      this.renderer.setStyle(description, 'color', color);
    });
    const vegetablePrices = document.querySelectorAll('.vegetable-price');
    vegetablePrices.forEach((price) => {
      this.renderer.setStyle(price, 'color', color);
    });
  }
}
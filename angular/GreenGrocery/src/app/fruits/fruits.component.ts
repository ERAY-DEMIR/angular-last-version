import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { FruitService } from '../fruit.service';
import { Product as Fruit } from '../fruit.model';

@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.css']
})
export class FruitsComponent implements OnInit, AfterViewInit, OnDestroy {

  fruits: Fruit[] = [];
  isDarkTheme: boolean = false;
  langChangeSubscription: Subscription;

  constructor(
    private fruitService: FruitService,
    public translate: TranslateService,
    private renderer: Renderer2
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    translate.addLangs(['en', 'tr']);

    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.updateFruits();
      this.checkDarkTheme();
      this.applyThemeStyles();
    });
  }

  ngOnInit(): void {
    this.checkDarkTheme();
    this.updateFruits();
  }

  ngAfterViewInit(): void {
    this.applyThemeStyles();
  }

  ngOnDestroy(): void {
    this.langChangeSubscription.unsubscribe();
  }

  addToCart(fruit: Fruit): void {
    console.log('Adding fruit to cart:', fruit);
    const customerId = 1; // Replace with the actual customerId if available
    this.fruitService.addToCart(fruit.id, customerId).subscribe(response => {
      alert(`${fruit.productName} has been added to the cart!`);
    }, error => {
      console.error('Error adding to cart', error);
      alert('Product successfully added to cart');
    });
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }

  ChangeLang(event: any): void {
    const lang = event.target.value;
    this.switchLanguage(lang);
  }

  private updateFruits(): void {
    this.fruitService.getFruits().subscribe(fruits => {
      this.fruits = fruits;
    });
  }

  private checkDarkTheme(): void {
    this.isDarkTheme = localStorage.getItem('theme') === 'Dark';
  }

  toggleDarkMode(): void {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'Dark' : 'Light');
    this.applyThemeStyles();
  }

  private applyThemeStyles(): void {
    this.setBodyBackground();
    this.updateCardBackground();
    this.updateButtonText();
    this.updateCardTitle();
  }

  private setBodyBackground(): void {
    const backgroundColor = this.isDarkTheme ? '#3b5b2d' : '#5eda5e';
    this.renderer.setStyle(document.body, 'background-color', backgroundColor);
  }

  private updateCardBackground(): void {
    const backgroundColor = this.isDarkTheme ? '#3b5b2d' : '#5eda5e';
    const fruitCards = document.querySelectorAll('.fruit-card');
    fruitCards.forEach(card => {
      this.renderer.setStyle(card, 'background-color', backgroundColor);
    });
  }

  private updateButtonText(): void {
    const color = this.isDarkTheme ? '#ffffff' : '#000000';
    const buyButtons = document.querySelectorAll('.buy-now');
    buyButtons.forEach(button => {
      this.renderer.setStyle(button, 'color', color);
    });
  }

  private updateCardTitle(): void {
    const color = this.isDarkTheme ? '#000000' : '#ffffff';
    const fruitTitles = document.querySelectorAll('.fruit-title');
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
}

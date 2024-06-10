import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  products: Product[] = [];
  isDarkTheme: boolean = false;
  langChangeSubscription: Subscription;
  customerId?: number; // Example customer ID, can be null
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: false,
    navText: ['prev', 'next'],
    items: 1,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      1025: {
        items: 3
      }
    },
    nav: false
  }

  constructor(
    private productService: ProductService,
    public translate: TranslateService,
    private renderer: Renderer2
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    translate.addLangs(['en', 'tr']);

    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.updateProducts();
      this.checkDarkTheme();
      this.isDarkTheme = localStorage.getItem('theme') === 'Dark';
    });
  }

  ngAfterViewInit(): void {
    this.checkDarkTheme();
  }

  ngOnInit(): void {
    this.checkDarkTheme();
    this.updateProducts();
  }

  ngOnDestroy(): void {
    this.langChangeSubscription.unsubscribe();
  }

  addToCart(product: Product): void {
    console.log('Adding product to cart:', product);
    this.productService.addToCart(product.id, this.customerId).subscribe(response => {
      alert(`${product.productName} has been added to the cart!`);
    }, error => {
      console.error('Error adding to cart', error);
      alert('Product successfully added to cart');
    });
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }

  changeLang(event: any): void {
    const lang = event.target.value;
    this.switchLanguage(lang);
  }

  private updateProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  private checkDarkTheme(): void {
    this.isDarkTheme = localStorage.getItem('theme') === 'Dark';
    this.applyThemeStyles();
  }

  toggleDarkMode(): void {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'Dark' : 'Light');
    this.applyThemeStyles();
    this.updateUIElements();
  }

  private applyThemeStyles(): void {
    const backgroundColor = this.isDarkTheme ? '#3b5b2d' : '#5eda5e';
    document.documentElement.style.setProperty('--background-color', backgroundColor);
  }

  private updateUIElements(): void {
    this.updateCardTitleStyles();
    this.updateTestimonialBackground();
    this.updateButtonText();
  }

  private updateCardTitleStyles(): void {
    const color = this.isDarkTheme ? '#000000' : '#ffffff';
    const productTitles = document.querySelectorAll('.product-title');
    productTitles.forEach(title => {
      this.renderer.setStyle(title, 'color', color);
    });
    const productDescriptions = document.querySelectorAll('.product-description');
    productDescriptions.forEach(description => {
      this.renderer.setStyle(description, 'color', color);
    });
    const productPrices = document.querySelectorAll('.product-price');
    productPrices.forEach(price => {
      this.renderer.setStyle(price, 'color', color);
    });
  }

  private updateTestimonialBackground(): void {
    const backgroundColor = this.isDarkTheme ? '#5eda5e' : '#3b5d2d';
    const testimonialContents = document.querySelectorAll('.testimonial-content');
    testimonialContents.forEach(content => {
      this.renderer.setStyle(content, 'background-color', backgroundColor);
    });
  }

  private updateButtonText(): void {
    const color = this.isDarkTheme ? '#ffffff' : '#000000';
    const buyButtonText = document.querySelectorAll('.buy-now');
    buyButtonText.forEach(button => {
      this.renderer.setStyle(button, 'color', color);
    });
  }
}
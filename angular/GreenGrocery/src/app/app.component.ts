import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { TranslateService } from '@ngx-translate/core';
import { Renderer2 } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('owlCarousel', { static: false }) owlCarousel!: ElementRef;
  title = 'GreenGrocery';
  products: Product[] = [];
  fruit: any;
  fruit_title: any;
  isDarkTheme: boolean = false;

  // Initialize dark_mode and light_mode with translation keys
  dark_mode: string = 'assets/img/crescent-moon.png';
  light_mode: string = 'assets/img/sunny.png';

  constructor(private productService: ProductService, public translate: TranslateService, private renderer: Renderer2) {
    // Set default language
    this.translate.setDefaultLang('en');
    // Set initial language if needed
    this.translate.use('en');
    translate.addLangs(['en', 'tr']);
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      setTimeout(() => {
        this.owlCarousel.nativeElement.owl.refresh();
      }, 100);
    });

    this.isDarkTheme = localStorage.getItem('theme') === 'Dark';
    this.translate.get('assets/img/crescent-moon.png').subscribe((res: string) => {
      this.dark_mode = res;
    });
    this.translate.get('assets/img/sunny.png').subscribe((res: string) => {
      this.light_mode = res;
    });
    this.setBodyBackground();
    this.productText();
    this.testimonialBackground();
  }

  ngAfterViewInit(): void {
    // Implement any AfterViewInit logic if necessary
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }

  changeLang(event: any): void {
    const lang = event.target.value;
    this.switchLanguage(lang);
    localStorage.setItem('theme', this.isDarkTheme ? 'Dark' : 'Light');
    this.languageBackground();
    this.testimonialBackground();
  }

  storeThemeSelection(): void {
    localStorage.setItem('theme', this.isDarkTheme ? 'Dark' : 'Light');
    this.setBodyBackground();
    this.productText();
    this.footerBackground();
    this.cardBackground();
    this.buyButtonBackground();
    this.cardText();
    this.testimonialBackground();
  }

  private setBodyBackground(): void {
    const backgroundColor = this.isDarkTheme ? '#3b5d2d' : '#5eda5e';
    this.renderer.setStyle(document.body, 'background-color', backgroundColor);
  }

  private productText(): void {
    const color = this.isDarkTheme ? '#ffffff' : '#000000';
    this.renderer.setStyle(document.body, 'color', color);
  }

  private footerBackground(): void {
    const footerBackgroundColor = this.isDarkTheme ? '#4d4d4d' : '#ffffff';
    this.renderer.setStyle(document.querySelector('.footer'), 'background-color', footerBackgroundColor);
  }

  private languageBackground(): void {
    const color = this.isDarkTheme ? '#ffffff' : '#000000';
    this.renderer.setStyle(document.body, 'color', color);
  }

  private cardBackground(): void {
    const cardBackground = this.isDarkTheme ? '#5eda5e' : '#3b5d2d';
    const cardContents = document.querySelectorAll('.card-content');
    cardContents.forEach(cardContent => {
      this.renderer.setStyle(cardContent, 'background-color', cardBackground);
    });
  }

  private testimonialBackground(): void {
    const backgroundColor = this.isDarkTheme ? '#5eda5e' : '#3b5d2d';
    const textColor = this.isDarkTheme ? '#000000' : '#ffffff';
    const testimonialContents = document.querySelectorAll('.testimonial-content');
    testimonialContents.forEach(content => {
      this.renderer.setStyle(content, 'background-color', backgroundColor);
    });
    const usernames = document.querySelectorAll('.username');
    const descriptions = document.querySelectorAll('.description');

    usernames.forEach(elem => {
      this.renderer.setStyle(elem, 'color', textColor);
    });

    descriptions.forEach(elem => {
      this.renderer.setStyle(elem, 'color', textColor);
    });
  }

  private cardText(): void {
    const color = this.isDarkTheme ? '#000000' : '#ffffff';
    const productTitles = document.querySelectorAll('.product-title');
    productTitles.forEach(title => {
      this.renderer.setStyle(title, 'color', color);
    });
  }

  private buyButtonBackground(): void {
    const buyButtonBackground = this.isDarkTheme ? '#3b5d2d' : '#5eda5e';
    const cardContents = document.querySelectorAll('.buy-now');
    cardContents.forEach(cardContent => {
      this.renderer.setStyle(cardContent, 'background-color', buyButtonBackground);
    });
  }

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
  };

  customOptions2: OwlOptions = {
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
  };
}
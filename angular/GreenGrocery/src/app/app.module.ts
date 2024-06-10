import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProductService } from './product.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotRegisteredSignInComponent } from './not-registered-sign-in/not-registered-sign-in.component';
import { LoginComponent } from './login/login.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { WhoAreWeComponent } from './who-are-we/who-are-we.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { TestimonialComponent } from './testimonials/testimonials.component';

import { OurHistoryComponent } from './our-history/our-history.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { TestimonialCommentComponent } from './testimonial-comment/testimonial-comment.component';
import { ShippingComponent } from './shipping/shipping.component';
import { firebaseConfig } from 'src/envs/environment';
import { ProductSafetyComponent } from './product-safety/product-safety.component';
import { OrderingPolicyComponent } from './ordering-policy/ordering-policy.component';
import { RefundPolicyComponent } from './refund-policy/refund-policy.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CommonModule } from '@angular/common';
import { FruitsComponent } from './fruits/fruits.component';
import { VegetablesComponent } from './vegetables/vegetables.component';
import { DrinksComponent } from './drinks/drinks.component';
import { CreditCardComponent } from './credit-card/credit-card.component';

import { CreditCardService } from './credit-card.service';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
import { ForgotPasswordService } from './forgotpassword.service';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestimonialComponent,
    NotRegisteredSignInComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    FruitsComponent,
    WhoAreWeComponent,
    StarRatingComponent,

    OurHistoryComponent,
    TestimonialCommentComponent,
    ShippingComponent,
    ProductSafetyComponent,
    OrderingPolicyComponent,
    RefundPolicyComponent,
    CreditCardComponent,
    ShoppingCartComponent,
    VegetablesComponent,
    DrinksComponent,
    ForgotPasswordComponent  // Declare ForgotPasswordComponent
  ],
  imports: [
    CarouselModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FontAwesomeModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ProductService,

    ForgotPasswordService,
    CreditCardService,
    
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
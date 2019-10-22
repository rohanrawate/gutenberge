import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HeaderComponent } from './header/header.component';
import { BookCardComponent } from './book-card/book-card.component';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { HttpErrorInterceptor } from './shared/http-error.interceptor';

import { APP_CONFIG } from './shared/injection-tokens';
import { config  } from './shared/config';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    InfiniteScrollComponent,
    LandingComponent,
    PageNotFoundComponent,
    SearchBarComponent,
    HeaderComponent,
    BookCardComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [
    { provide: APP_CONFIG, useValue: config},
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

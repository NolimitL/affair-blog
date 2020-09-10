import { AuthInterceptor } from './shared/auth.interceptor';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { registerLocaleData } from '@angular/common';
import ruLocale from '@angular/common/locales/ru'; //для работы с разными языками и локализации

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostComponent } from './shared/components/post/post.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

registerLocaleData(ruLocale, 'ru')
/**
 * ЕЕ можно передавать в пайп даты  {{somedate | date:'time':'time-zone':'ru'}}
 * 3 параметров в пайпе даты стоит локаль
 */

const INTECEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi:true
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule
  ],
  providers: [INTECEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }

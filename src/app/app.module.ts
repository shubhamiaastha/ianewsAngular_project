import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

import { AuthInterceptor } from '../shared/auth/auth.interceptor';
// import { HttpClientModule, HttpClient } from '@angular/common/http';


import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
// import { NewsDataComponent } from './services/news-data.service';
import { TruncatePipe } from './user/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    // NewsDataComponent
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CakeDetailsComponent } from './cake-details/cake-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CakeDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    Title,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

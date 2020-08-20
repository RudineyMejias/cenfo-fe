import { BrowserModule } from '@angular/platform-browser';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '@/app-routing.module';
import { AppComponent } from '@/app.component';
import { CoreModule } from '@/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule } from '@/authentication/authentication.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@/shared/shared.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    NgbModule,
    NgxUiLoaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

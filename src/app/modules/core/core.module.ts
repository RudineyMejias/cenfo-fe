import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '@/core/services/auth-interceptor.service';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ]
})
export class CoreModule { }

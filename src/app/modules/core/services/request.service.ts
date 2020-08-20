import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/environment';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private readonly API_URL = environment.apiUrl;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly translateService: TranslateService
  ) { }

  get<TResponse>(url: string, headers?: HttpHeaders): Observable<TResponse> {
    return this.httpClient.get<TResponse>(this.formatUrl(url), { headers: { ...this.getDefaultHeaders(), ...headers } });
  }

  post<TResponse>(url: string, body: any, headers?: HttpHeaders): Observable<TResponse> {
    return this.httpClient.post<TResponse>(this.formatUrl(url), body, { headers: { ...this.getDefaultHeaders(), ...headers } });
  }

  patch<TResponse>(url: string, body: any, headers?: HttpHeaders): Observable<TResponse> {
    return this.httpClient.patch<TResponse>(this.formatUrl(url), body, { headers: { ...this.getDefaultHeaders(), ...headers } });
  }

  put<TResponse>(url: string, body: any, headers?: HttpHeaders): Observable<TResponse> {
    return this.httpClient.put<TResponse>(this.formatUrl(url), body, { headers: { ...this.getDefaultHeaders(), ...headers } });
  }

  delete<TResponse>(url: string, headers?: HttpHeaders): Observable<TResponse> {
    return this.httpClient.delete<TResponse>(this.formatUrl(url), { headers: { ...this.getDefaultHeaders(), ...headers } });
  }

  private formatUrl(url: string): string {
    return (/^https?:\/\//i).test(url) ? url : `${this.API_URL}${url}`;
  }

  private getDefaultHeaders(): any {
    return { lang: this.translateService.currentLang || this.translateService.defaultLang };
  }
}

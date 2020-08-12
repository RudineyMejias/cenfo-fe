import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  private readonly API_URL = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) { }

  get<TResponse>(url: string, headers: HttpHeaders): Observable<TResponse> {
    return this.httpClient.get<TResponse>(this.formatUrl(url), { headers });
  }

  post<TResponse, TBody>(url: string, body: TBody, headers: HttpHeaders): Observable<TResponse> {
    return this.httpClient.post<TResponse>(this.formatUrl(url), body, { headers });
  }

  patch<TResponse, TBody>(url: string, body: TBody, headers: HttpHeaders): Observable<TResponse> {
    return this.httpClient.patch<TResponse>(this.formatUrl(url), body, { headers });
  }

  put<TResponse, TBody>(url: string, body: TBody, headers: HttpHeaders): Observable<TResponse> {
    return this.httpClient.put<TResponse>(this.formatUrl(url), body, { headers });
  }

  delete<TResponse>(url: string, headers: HttpHeaders): Observable<TResponse> {
    return this.httpClient.delete<TResponse>(this.formatUrl(url), { headers });
  }

  private formatUrl(url: string): string {
    return (/^https?:\/\//i).test(url) ? url : `${this.API_URL}${url}`;
  }
}

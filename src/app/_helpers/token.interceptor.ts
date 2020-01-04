import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/HTTP';
import { Observable } from 'rxjs';

export class TokenInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(httpReq: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    let headers;
    if (localStorage.getItem('token')) {
      headers = httpReq.headers.set('Authorization', `bearer ${localStorage.getItem('token')}`);
    }
    const newReq = httpReq.clone({ headers });
    return next.handle(newReq);
  }
}

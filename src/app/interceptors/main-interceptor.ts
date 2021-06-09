import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { TokenService } from '../config/token.service';
import { HelpersService } from '../config/helpers.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class MainInterceptor implements HttpInterceptor {
    private authToken: any;
  constructor(
      private tokenService: TokenService,
      private helpers: HelpersService
      ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    if (this.helpers.isBrowser()) {
        this.authToken = this.tokenService.getToken();
    }
    // Removed token from urls 
    const notAuthed = ['https://gist.githubusercontent.com/Fluidbyte/2973986/raw/8bb35718d0c90fdacb388961c98b8d56abc392c9/Common-Currency.json', 'https://www.floatrates.com/daily/usd.json'];
    req.clone({
      headers: req.headers
        .set('Cache-Control', `max-age=604800`)
    });
    if (this.helpers.isBrowser() && this.authToken && !notAuthed.includes(req.url)) {
      const authReq = req.clone({
        headers: req.headers
          .set('Authorization', `Bearer ${this.authToken}`)
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }    
  }
}
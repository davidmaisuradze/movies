import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { PrependBaseUrlInterceptor } from './prepend-base-url.interceptor';
import { JtwInterceptor } from './jtw.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: PrependBaseUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: JtwInterceptor, multi: true }
];

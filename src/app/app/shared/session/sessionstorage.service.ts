import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionstorageService {

  constructor(
 @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
) { }
  setItem(key: string, data: any) {
   return sessionStorage.setItem(key,data)
  }
  getItem(key: string) {
  return sessionStorage.getItem(key)
  }
  removeItem(key: string) {
   return sessionStorage.removeItem(key);
  }
}

import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Inject, Injectable, makeStateKey, PLATFORM_ID, StateKey, TransferState } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatastateService {
  isServer!: boolean;

  constructor(
 @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private tstate: TransferState,
  ) {
    this.isServer = isPlatformServer(platformId);
  }

  checkAndGetData(key: StateKey<void>, getDataObservable: Observable<any>, defaultValue: any = [],options={}) {
    if (this.tstate.hasKey(key)) {
      return of(this.tstate.get(key, defaultValue));
    } else {
      return getDataObservable.pipe(
        tap((data) => {
          if (this.isServer) {
            this.tstate.set(key, data);
          }
        })
      );
    }
  }

  getDynamicStateKey(key: string) {
    return makeStateKey(key);
  }
}

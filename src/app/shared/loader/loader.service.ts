import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading$ = new BehaviorSubject<boolean>(false); 

  constructor(
   
) { }
  open() {
    this.isLoading$.next(true);
  }
  close() {
    this.isLoading$.next(false);
  }
  getLoadingState() {
   return this.isLoading$.asObservable();
  }
}

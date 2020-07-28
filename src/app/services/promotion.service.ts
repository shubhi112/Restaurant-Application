import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }
  // getPromotions(): Promotion[] {
  //   return PROMOTIONS;
  // }

  // getPromotion(id: string): Promotion {
  //   return PROMOTIONS.filter((promo) => (promo.id === id))[0];
  // }

  // getFeaturedPromotion(): Promotion {
  //   return PROMOTIONS.filter((promotion) => promotion.featured)[0];
  // }
//   getPromotions(): Promise<Promotion[]> {
//     return new Promise(resolve => {
//       setTimeout(() => resolve(PROMOTIONS), 2000);
//   });
// }

//   getPromotion(id: string): Promise<Promotion> {
//     return new Promise(resolve => {
//       setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]),2000);
//   });
// }

//   getFeaturedPromotion(): Promise<Promotion> {
//     return new Promise(resolve =>{
//        setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
//   });
// }
// getDishes(): Promise<Promotion[]> {
//   return of(PROMOTIONS).pipe(delay(2000)).toPromise();
// }

// getPromotion(id: string): Promise<Promotion> {
//   return of(PROMOTIONS.filter((Promotion) => (Promotion.id === id))[0]).pipe(delay(2000)).toPromise();
// }

// getFeaturedPromotion(): Promise<Promotion> {
//   return of(PROMOTIONS.filter((Promotion) => Promotion.featured)[0]).pipe(delay(2000)).toPromise();
// }

// getDishes(): Observable<Promotion[]> {
//   return of(PROMOTIONS).pipe(delay(2000));
// }

// getPromotion(id: string): Observable<Promotion> {
//   return of(PROMOTIONS.filter((Promotion) => (Promotion.id === id))[0]).pipe(delay(2000));
// }

// getFeaturedPromotion(): Observable<Promotion> {
//   return of(PROMOTIONS.filter((Promotion) => Promotion.featured)[0]).pipe(delay(2000));
// }
getPromotions(): Observable<Promotion[]> {
  return this.http.get<Promotion[]>(baseURL + 'promotions')
    .pipe(catchError(this.processHTTPMsgService.handleError));
}

getPromotion(id: number): Observable<Promotion> {
  return this.http.get<Promotion>(baseURL + 'promotions/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
}

getFeaturedPromotion(): Observable<Promotion> {
  return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
}

}
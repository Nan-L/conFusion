import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcesshttpService } from './processhttp.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'

@Injectable()
export class DishService {

  constructor(private http: Http, private processhttpService: ProcesshttpService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + 'dishes')
                    .map(res => { return this.processhttpService.extractData(res); });
  }

  getDish(id: number): Observable<Dish> {
    return  this.http.get(baseURL + 'dishes/'+ id)
                    .map(res => { return this.processhttpService.extractData(res); });
  }


  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => { return dishes.map(dish => dish.id) });
  }

  getFeaturedDish(): Observable<Dish> {
  	return this.http.get(baseURL + 'dishes?featured=true')
  					.map(res => { return this.processhttpService.extractData(res)[0]; });
  }
}

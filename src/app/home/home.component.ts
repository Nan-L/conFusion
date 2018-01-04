import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';

import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion';
import {PromotionService} from '../services/promotion.service';
import {Leader} from '../shared/leader';
import {LeaderService} from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  errDish: string;
  errPro: string;
  errLeader: string;

  constructor(private dishservice: DishService,
  	private promotionservice: PromotionService,
    private leaderservice: LeaderService, @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
  	this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish, err => this.errDish = <any>err);
  	this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion, err => this.errPro = <any>err);
    this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader = leader, err => this.errLeader = <any>err);
  }

}

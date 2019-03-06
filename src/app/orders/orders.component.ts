import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OrdersService } from './orders.service';
import { map, delay } from 'rxjs/operators';
import * as moment from 'moment/moment';
import 'moment/locale/ru';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, AfterViewInit {
  public orders: any[] = [];
  isPauseSpinner = true;
  isLoading = true;
  moment = moment();

  constructor(
    private ordersService: OrdersService,
    private navCtrl: NavController
  ) {
    this.ordersService
      .getOrders()
      .pipe(
        delay(1000),
        map(x => x.reverse())
      )
      .subscribe(
        result => {
          console.log(result);
          this.orders = result;
          this.isLoading = false;
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
    this.ordersService.getEmitterDeleteOrder().subscribe(id => {
      this.orders.splice(this.orders.findIndex(x => x.id === +id), 1);
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    /* This is hack to fix spinner paused after load page */
    setTimeout(() => {
      this.isPauseSpinner = false;
    }, 250);
  }

  pushPage(id: number, idArray: number) {
    this.ordersService.selectedOrder = this.orders[idArray];
    this.navCtrl.navigateForward('/orders/' + id);
  }

  onIsAfter(date: any) {
    if (date) {
      if (moment(moment.now()).isAfter(moment(date))) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { OrdersService } from '../orders.service';
import * as moment from 'moment/moment';
import 'moment/locale/ru';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  order: any = {};
  id: any;

  moment = moment();

  constructor(
    public navCtrl: NavController,
    private AcRoute: ActivatedRoute,
    private ordersService: OrdersService
  ) {
    this.id = this.AcRoute.snapshot.paramMap.get('id');
    this.order = this.ordersService.selectedOrder;
    if (!this.order) {
      this.order = { select: 'Нет данных' };
    }
  }

  ngOnInit() {}

  onChangeTime() {
    this.order.timeto = +this.order.timeat.split(':')[0] + 1 + ':00';
  }

  onDeleteOrder(id: number) {
    this.ordersService.deleteOrder(id).subscribe(
      result => {
        this.ordersService.deleteOrderEmit(id);
        this.onBack();
      },
      err => {
        console.log(err);
      }
    );
  }

  onUpdateOrder(id: number) {
    this.order.date = moment(this.order.date).format();
    this.order.payed = true;
    this.ordersService.updateOrder(id, this.order).subscribe(
      result => {
        this.onBack();
      },
      err => {
        console.log(err);
      }
    );
  }

  onBack() {
    this.navCtrl.pop();
  }
}

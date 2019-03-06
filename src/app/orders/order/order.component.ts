import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  order: any = {};
  id: any;

  editedFlag = false;

  constructor(
    public navCtrl: NavController,
    private AcRoute: ActivatedRoute,
    private ordersService: OrdersService
  ) {
    this.id = this.AcRoute.snapshot.paramMap.get('id');
    this.order = this.ordersService.selectedOrder;
    if (!this.order) { this.order = { select: 'Нет данных' }; }
  }

  ngOnInit() {}

  onChangeTime() {
    this.editedFlag = true;
    this.order.timeto = (+(this.order.timeat.split(':')[0]) + 1) + ':00';
  }

  deleteOrder(id: number) {
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

  onBack() {
    this.navCtrl.pop();
  }
}

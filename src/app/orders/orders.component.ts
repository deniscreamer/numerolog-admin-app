import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  pushPage(id: number) {
    this.navCtrl.navigateForward('/orders/' + id);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  id: any;
  select = 'Предназначение';
  myDate = '2019-03-07T19:17:48+03:00';
  timeat = '11:00';
  timeto = '12:00';

  editedFlag = false;


  constructor(public navCtrl: NavController, private AcRoute: ActivatedRoute) {
    this.id = this.AcRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {

  }

  editedToggle() {
    this.editedFlag = true;
    console.log(this.timeat);
  }

}

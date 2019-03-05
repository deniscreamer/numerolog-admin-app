import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { DaytableComponent } from './daytable.component';

@NgModule({
  declarations: [
    DaytableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: DaytableComponent
      }
    ])
  ]
})
export class DaytableModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsComponent } from './forms.component';

@NgModule({
  declarations: [
    FormsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: FormsComponent
      }
    ])
  ]
})
export class FormsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { QuestionsComponent } from './questions.component';

@NgModule({
  declarations: [
    QuestionsComponent
  ],
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: QuestionsComponent
      }
    ])
  ]
})
export class QuestionsModule { }

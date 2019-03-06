import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'orders',
    loadChildren: './orders/orders.module#OrdersModule'
  },
  {
    path: 'orders/:id',
    loadChildren: './orders/order/order.module#OrderModule'
  },
  {
    path: 'daytable',
    loadChildren: './daytable/daytable.module#DaytableModule',
  },
  {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  },
  {
    path: 'questions',
    loadChildren: './questions/questions.module#QuestionsModule',
  },
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule',
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule',
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

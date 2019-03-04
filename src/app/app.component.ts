import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Главная',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Консультации',
      url: '/orders',
      icon: 'chatboxes'
    },
    {
      title: 'Расписание',
      url: '/daytable',
      icon: 'calendar'
    },
    {
      title: 'Анкеты',
      url: '/forms',
      icon: 'document'
    },
    {
      title: 'Вопросы',
      url: '/questions',
      icon: 'help-circle'
    },
    {
      title: 'Настройки',
      url: '/settings',
      icon: 'settings'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

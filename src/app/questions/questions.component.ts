import {
  Component,
  OnInit,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit, AfterViewInit {
  pausedSpinner = true;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    /* This is hack to fix spinner paused after load page */
    setTimeout(() => {
      this.pausedSpinner = false;
    }, 250);
  }
}

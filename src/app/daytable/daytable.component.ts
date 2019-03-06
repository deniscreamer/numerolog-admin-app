import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DayTable } from './daytable.model';
import { DayTableService } from './daytable.service';
import { delay, map, filter } from 'rxjs/operators';
import * as moment from 'moment';
import 'moment/locale/ru';

@Component({
  selector: 'app-daytable',
  templateUrl: './daytable.component.html',
  styleUrls: ['./daytable.component.scss'],
})
export class DaytableComponent implements OnInit, AfterViewInit {
  dayTable: DayTable[] = [];
  isPauseSpinner = true;
  isLoading = true;
  isLoadingData = false;
  moment = moment();

  constructor(private dayTableService: DayTableService) {
    this.dayTableService
      .getDayTables()
      .pipe(
        delay(1000),
        map(x => x.filter(this.onFilterDates)) // delete old dates (from today)
      )
      .subscribe(
        result => {
          this.dayTable = result;
          console.log(result);
          this.isLoading = false;
        },
        err => {
          console.log(err);
          this.isLoading = false;
        }
      );
  }

  ngOnInit() {}

  ngAfterViewInit() {
    /* This is hack to fix spinner paused after load page */
    setTimeout(() => {
      this.isPauseSpinner = false;
    }, 250);
  }

  onStatusChange(
    idx: number,
    day_id: number,
    time_at: string,
    time_to: string
  ) {
    this.isLoadingData = true;
    const findedTimeId = this.dayTable[idx].times.findIndex(
      x => x.time_at === time_at
    );
    const findedTimeObject = this.dayTable[idx].times;
    findedTimeObject[findedTimeId].free = !findedTimeObject[findedTimeId].free;
    this.dayTable[idx].times = findedTimeObject;
    this.dayTableService.updateDayTable(day_id, this.dayTable[idx]).subscribe(
      res => {
        this.isLoadingData = false;
      },
      err => {
        console.log(err);
        findedTimeObject[findedTimeId].free = !findedTimeObject[findedTimeId]
          .free;
        this.isLoadingData = false;
      }
    );
  }

  onFilterDates(date: DayTable) {
    return moment(moment.now()).isBefore(date.date);
  }
}

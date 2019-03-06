import { Component, OnInit } from '@angular/core';
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
export class DaytableComponent implements OnInit {
  dayTable: DayTable[] = [];
  loading = true;
  loadingData = false;
  moment = moment();

  constructor(private dayTableService: DayTableService) {
    this.dayTableService
      .getDayTables()
      .pipe(
        delay(1000),
        map(x => x.filter(this.onFilterDates)) // delete old dates
      )
      .subscribe(
        result => {
          this.dayTable = result;
          console.log(result);
          this.loading = false;
        },
        err => {
          console.log(err);
          this.loading = false;
        }
      );
  }

  ngOnInit() {}

  onStatusChange(
    idx: number,
    day_id: number,
    time_at: string,
    time_to: string
  ) {
    this.loadingData = true;
    const findedTimeId = this.dayTable[idx].times.findIndex(
      x => x.time_at === time_at
    );
    const findedTimeObject = this.dayTable[idx].times;
    findedTimeObject[findedTimeId].free = !findedTimeObject[findedTimeId].free;
    this.dayTable[idx].times = findedTimeObject;
    this.dayTableService.updateDayTable(day_id, this.dayTable[idx]).subscribe(
      res => {
        this.loadingData = false;
      },
      err => {
        console.log(err);
        findedTimeObject[findedTimeId].free = !findedTimeObject[findedTimeId]
          .free;
        this.loadingData = false;
      }
    );
  }

  onFilterDates(date: DayTable, days: number = 4) {
    return moment(moment.now())
      .add(days, 'days')
      .isBefore(date.date);
  }
}

import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { CALENDLY_TOKEN, ICalendly } from './calendly';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, AfterViewInit {
  @ViewChild('calendlyContainer', { static: true })
  calendlyContainer?: ElementRef;

  constructor(@Inject(CALENDLY_TOKEN) private calendly: ICalendly) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const element: HTMLDivElement = this.calendlyContainer!.nativeElement;
    this.calendly.initInlineWidget({
      url: environment.calendlyUrl,
      parentElement: element,
      prefill: {},
      utm: {},
    });
    const calendlyFrame = element.querySelector('iframe')!;
    calendlyFrame.height = '';
  }
}

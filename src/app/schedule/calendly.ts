import { InjectionToken } from '@angular/core';

export const CALENDLY_TOKEN = new InjectionToken('Calendly');
export const Calendly: ICalendly = (window as any).Calendly;

export interface ICalendly {
  initInlineWidget(options: ICalendlyInitOptions): void;
}

export interface ICalendlyInitOptions {
  url: string;
  parentElement: Element;
  prefill: {};
  utm: {};
}

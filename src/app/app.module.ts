import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CashmereModule } from './shared/cashmere.module';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { PayComponent } from './pay/pay.component';
import { Calendly, CALENDLY_TOKEN } from './schedule/calendly';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdventOfCodeComponent } from './advent-of-code/advent-of-code.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PortfolioComponent,
    ScheduleComponent,
    PayComponent,
    AdventOfCodeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CashmereModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{ provide: CALENDLY_TOKEN, useValue: Calendly }],
  bootstrap: [AppComponent],
})
export class AppModule {}

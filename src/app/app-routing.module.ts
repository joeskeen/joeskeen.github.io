import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdventOfCodeComponent } from './advent-of-code/advent-of-code.component';
import { HomeComponent } from './home/home.component';
import { PayComponent } from './pay/pay.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'pay', component: PayComponent },
  { path: 'advent-of-code', component: AdventOfCodeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

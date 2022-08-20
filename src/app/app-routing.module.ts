import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PayComponent } from './pay/pay.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'pay', component: PayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

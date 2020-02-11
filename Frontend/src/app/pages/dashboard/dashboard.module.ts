import { NgModule } from '@angular/core';
import { NbCardModule, NbLayoutModule, NbListModule, NbSpinnerModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

import { ChartModule } from 'angular2-chartjs';

@NgModule({
  imports: [
    NbCardModule,
    NbLayoutModule,
    NbListModule,
    NbSpinnerModule,
    ThemeModule,
    ChartModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }

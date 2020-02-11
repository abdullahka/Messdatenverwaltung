import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NbThemeService, NbColorHelper } from '@nebular/theme';


@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.css'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  loading = true;
  
  data: any;
  options: any;
  themeSubscription: any;

  dashboard_data: any;

  constructor(private http:HttpClient, private theme: NbThemeService){
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      
    this.data = {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [
        {
          label: "Last 7 Days Uploads",
          data: [0, 0, 0, 0, 0, 0, 0]
        }
      ]
    };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
                stepSize: 1,
                precision: 0,
              },
            },
          ],
        },
      };
    });
  }

  async ngOnInit(){
    let headers = {'Content-Type': 'application/json'};
    this.dashboard_data = await this.http.get('http://localhost:8000/dashboard', { headers:headers}).toPromise();
    this.data.datasets[0].data = this.dashboard_data.uploads.last_7days;

    this.loading = false;
  }

}

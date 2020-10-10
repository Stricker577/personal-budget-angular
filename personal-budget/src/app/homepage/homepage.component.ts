import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  dataSource = {
    datasets: [
        {
            data: [30, 350, 90],
            backgroundColor: [
                '#ffcd56',
                '#ff6843',
                '#36a2eb',
                '#6bc7d1',
                '#a9eb46',
                '#58d1a9',
                '#773cba',
            ],
        }
    ],
    labels : [
        'Eat out',
        'Rent',
        'Groceries'
    ]
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (let i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }
      this.createChart();
    });
  }

  createChart(){
    // tslint:disable-next-line: prefer-const
    let ctx = document.getElementById('myChart');
    let myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource
    });

  }
}

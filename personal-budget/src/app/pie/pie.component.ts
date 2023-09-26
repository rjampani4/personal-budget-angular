import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'pb-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})

  export class PieComponent implements OnInit {
    ngOnInit(): void {
      throw new Error('Method not implemented.');
    }
    private data = [
      {"Framework": "Vue", "Stars": 166443, "Released": "2014"},
      {"Framework": "React", "Stars": 150793, "Released": "2013"},
      {"Framework": "Angular", "Stars": 62342, "Released": "2016"},
      {"Framework": "Backbone", "Stars": 27647, "Released": "2010"},
      {"Framework": "Ember", "Stars": 21471, "Released": "2011"},
    ];

    private svg: any;
    private margin = 50;
    private width = 750;
    private height = 600;
    // The radius of the pie chart is half the smallest side
    private radius = Math.min(this.width, this.height) / 2 - this.margin;
    private colors: any;

}

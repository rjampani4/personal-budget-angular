import { Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {  HttpClient, HttpClientModule } from '@angular/common/http';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements AfterViewInit {
  @ViewChild('pieChart', { static: false })
  pieChartContainer!: ElementRef;

  private svg: any;
  private margin = 50;
  private width =350;
  private height =350;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors:any;


  constructor ( private http:HttpClient,private dataService: DataService ){

  }
  ngAfterViewInit(): void {
    this.dataService.fetchData().subscribe(()=>{

    this.createChart();
    this.createSvg();
  this.createColors();
  this.drawChart();
  })

  }


  createChart(){

    var ctx:any =document.getElementById('myChart');

    var myPieChart= new Chart(ctx,
      {
        type:'pie',
        data:this.dataService.dataSource
      });

  }
  createSvg(): void {
    // this.svg = d3.select("figure#pie")
    // .append("svg")
    // .attr("width", this.width)
    // .attr("height", this.height)
    // .append("g")
    // .attr(
    //   "transform",
    //   "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    // );

  const chartElement = this.pieChartContainer.nativeElement;
  this.svg = d3.select(chartElement)
    .append('svg')
    .attr('width', this.width)
    .attr('height', this.height)
    .append('g')
    .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
}

private createColors(): void {
  this.colors = d3.scaleOrdinal()
  .domain([...this.dataService.dataSource.labels])
  .range([...this.dataService.dataSource.datasets[0].backgroundColor]);

}
private drawChart(): void {
  // Compute the position of each group on the pie:
  const pie = d3.pie<any>().value((d: any) =>
    Number(d)
  );

  // Build the pie chart
  const pieData = pie(this.dataService.dataSource.datasets[0].data);

  // Build the pie chart
  this.svg
  .selectAll('pieces')
  .data(pieData)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(this.radius)
  )
  .attr('fill', (d: any, i: any) => this.colors(this.dataService.dataSource.labels[i]))
  // .attr('fill', (d: any, i: any) => (this.colors(i)))
  .attr("stroke", "#121926")
  .style("stroke-width", "1px");

  // Add labels
  const labelLocation = d3.arc()
  .innerRadius(100)
  .outerRadius(this.radius);

  this.svg
  .selectAll('pieces')
  .data(pieData)
  .enter()
  .append('text')
  // .text((d: any)=> d.data.Framework)
  .text((d: any, i: any) => this.dataService.dataSource.labels[i])
  .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
  // .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
  .style("text-anchor", "middle")
  .style("font-size", 15);
}
}

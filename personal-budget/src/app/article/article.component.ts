import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pb-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit{
  @Input() title='Title';
  @Input() content='Content';

  constructor(){}
    ngOnInit(): void {

    }



}

import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-cake-details',
  templateUrl: './cake-details.component.html',
  styleUrls: ['./cake-details.component.css']
})
export class CakeDetailsComponent implements OnInit, OnChanges {

  @Input() cakeToShow: any;

  constructor() { }

  ngOnInit() {
  }
  ratings = [];
  average: number;

  ngOnChanges() {
    this.cakeToShow.comments.forEach(comment => {
      this.ratings.push(comment.rating);
      let sum = 0;
      let count = 0;
      for (let rating of this.ratings) {
        sum += rating;
        count++;
      }
      this.average = sum/count;
      console.log(this.average);
    })
  }
}

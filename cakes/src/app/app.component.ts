import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpService } from './http.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

  cakes = [];
  ratings: number[] = [1, 2, 3, 4, 5];
  newCake: any;
  newComment: any;
  selectedCake: any;

  public constructor( private titleService: Title, private _httpService: HttpService ) { }

  ngOnInit(){
    this.setTitle('Rate My Cakes!');
    this.getAllCakes();
    this.newCake = { title: "", baker: "", imageURL: "" };
    this.newComment = { content: "", rating: "" };
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  getAllCakes(): void {
    this._httpService.getCakes()
      .subscribe(allCakes => this.cakes = allCakes['data']);
  }

  createCake(newCake: any) {
    this._httpService.createCake(newCake)
      .subscribe(cake => this.newCake = cake['data']);
    this.newCake = { title: "", baker: "", imageUrl: "" };
    this.getAllCakes();
  }

  createComment(newComment: any, cakeId: any) {
    const commentData = {
      content: newComment.content,
      rating: newComment.rating,
      cakeId: cakeId
    }
    this._httpService.createComment(commentData)
      .subscribe(comment => this.newComment = comment['data']);
    this.newComment = { content: "", rating: "" };
  }

  getCake(id: string){
    this._httpService.getCake(id)
    .subscribe(cake => this.selectedCake = cake['data']);
    this.selectedCake = null;

  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private _cakesURL: string = 'http://localhost:8000/cakes/';
  private _commentsURL: string = 'http://localhost:8000/comments/';

  constructor( private _http: HttpClient ) { }

  getCakes(){
    return this._http.get(this._cakesURL);
  }

  createCake(newCake: any){
    return this._http.post(this._cakesURL, newCake);
  }

  createComment(newCommentWithCake: any){
    return this._http.post(this._commentsURL, newCommentWithCake);
  }

  getCake(id: string){
    return this._http.get(this._cakesURL + id);
  }
}

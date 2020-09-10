import { environment } from 'src/environments/environment';
import { Observable, pipe } from 'rxjs';
import { Post, FbCreateResponse } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class PostsService{

  constructor(private http: HttpClient){}

  create(post: Post): Observable<Post>{
    return this.http.post(`${environment.fbDataBaseUrl}/posts.json`, post)
      .pipe(
        map((response: FbCreateResponse) => {
          return {
            ...post,
            id: response.name,
            date: new Date(post.date)
          }
        }),
        tap(p => console.log("Post with id:",p))
      )
  }

  getAll(): Observable<any>{
    return this.http.get(`${environment.fbDataBaseUrl}/posts.json`)
      .pipe(
        map((response: {[key:string]:any}) => {
          return Object.keys(response).map(key => {
            return {
              ...response[key],
              id: key,
              date: new Date(response[key].date)
            }
          })
        })
      )
  }

  getById(id:string): Observable<Post>{
    return this.http.get<Post>(`${environment.fbDataBaseUrl}/posts/${id}.json`)
      .pipe(
        map((post:Post) => {
          return {
            ...post,
            id,
            date: new Date(post.date)
          }
        }),
      )
  }

  remove(id: string): Observable<void>{
    return this.http.delete<void>(`${environment.fbDataBaseUrl}/posts/${id}.json`)
  }

  update(post: Post){
    return this.http.patch(`${environment.fbDataBaseUrl}/posts/${post.id}.json`, post)
  }
}

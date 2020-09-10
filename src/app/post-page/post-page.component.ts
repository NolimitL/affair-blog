import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../shared/posts.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<Post>

  constructor(
    private postsService: PostsService,
    private aciveRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.post$ = this.aciveRoute.params
      .pipe(
        switchMap((params:Params)=> {
          return this.postsService.getById(params['id'])
        })
      )
  }

}

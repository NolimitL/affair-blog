import { AlertService } from './../shared/services/alert.service';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  post: Post
  Sub: Subscription
  submitted = false

  constructor(
    private postsService: PostsService,
    private activRoute: ActivatedRoute,
    private alert: AlertService
  ) { }

  ngOnInit(): void {

    this.Sub = this.activRoute.params.pipe(
      switchMap((params:Params) => {
        return this.postsService.getById(params['id'])
      })
    ).subscribe((post:Post) => {
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    })

  }

  ngOnDestroy(){
    if (this.Sub) {
      this.Sub.unsubscribe()
    }
  }

  submit(){
    if (this.form.invalid) {
      return
    }
    this.submitted = false
    this.postsService.update({
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text
    }).subscribe(() => {
      this.submitted = true
      this.alert.success('Post has been updated')
    })
  }
}

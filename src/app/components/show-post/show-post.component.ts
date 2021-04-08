import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {

  post;
  constructor(private postService: PostService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    // this.route.paramMap.subscribe(param1 => {
    //   this.postService.getOne(param1.get('id'))
    //     .subscribe((param2) => {
    //       this.post = param2;
    //     });
    // });
    let id = this.route.snapshot.params.id;
    this.postService.getOne(id)
      .subscribe((param2) => {
        this.post = param2;
      });
  }

}

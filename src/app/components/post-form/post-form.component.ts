import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/modules/Post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  @Output() newPost: EventEmitter<Post> = new EventEmitter();
  @Output() updatedPost: EventEmitter<Post> = new EventEmitter();
  @Input() currentPost!:Post;
  @Input() isEdit!:boolean;

  constructor(private PostService:PostService) { }

  ngOnInit(): void {
  }

addPost(title:string, body:string)
{
  if(!title || !body)
  alert('Please add post');
  else
  this.PostService.savePost({title,body} as Post).subscribe(post=>{
  this.newPost.emit(post);
  })
}
updatePost(){
  this.PostService.updatePost(this.currentPost).subscribe((post: any)=>
  {
    this.isEdit=false;
    this.updatedPost.emit(post);
  }
  );
}



}

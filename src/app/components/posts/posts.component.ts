import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from '../../modules/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[]=[];
  currentPost: Post={
    id:0,
    title:'',
    body:''
  }
  isEdit: boolean=false;

  constructor(private PostService: PostService) { }


  ngOnInit(): void {
    this.PostService.getPosts().subscribe((posts: any)=>{
      this.posts=posts;
    });
  }
  onNewPost(post: Post)
  {
    this.posts.unshift(post);
  }
  
  editPost(post: Post)
  {
    this.currentPost=post;
  this.isEdit=true;
  }
  
  onUpdatedPost(post: Post)
  {
    this.posts.forEach((cur,index) => {
      if(post.id===cur.id){
        this.posts.splice(index,1);
        this.posts.unshift(post);
        this.isEdit=false;
        this.currentPost={
          id:0,
          title:'',
          body:''
        }
      }
    });
  }
  removePost(post: Post)
  {
    if(confirm('Are you sure to delete this post?'))
    {
      this.PostService.removePost(post.id).subscribe(()=>{
        this.posts.forEach((cur, index)=>{
          if(post.id===cur.id){
            this.posts.splice(index,1);
          }
          
  
      });
    });
    }
  }
}

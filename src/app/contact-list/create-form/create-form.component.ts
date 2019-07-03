import { Component, OnInit } from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact-list-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateForm implements OnInit {

  formModel: FormGroup;

  constructor(fb: FormBuilder) {  
    this.formModel = fb.group({
    userName: ['', Validators.required], 
    Email: ['',Validators.required],
    commentText: ['',Validators.required]
  
   });
  }

  onSubmit() {
      console.log(this.formModel.value);

      // postComment() {
      //   this.apiService.postComment(this.article.slug, this.commentBody).
      //     subscribe(comment => { 
      //       this.articleComments.unshift(comment);
      //       this.commentBody = null;
      //     });
      // }
  }
    // onSubmit(formData) {
    //   console.log(formData);
    // }
  

  // constructor() { }

  ngOnInit() {
  }

}

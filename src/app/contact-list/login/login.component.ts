import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class Login implements OnInit {

  // formModel: FormGroup;

  // constructor(fb: FormBuilder) {  
  //   this.formModel = fb.group({
  //   userName: ['', Validators.required], 
  //   Email: ['',Validators.required],
  //   commentText: ['',Validators.required]
  
  //  });
  // }
  constructor(
    private authService: AuthService,
    private router: Router,
    ) {}
  errors: string[] = [];
    
  onSubmit(value: any) {
      const {username, password} = value;
      // console.log("login", value);
      this.authService.logIn(username, password).subscribe(
        data => this.router.navigateByUrl('/'),
        httpError => { 
          console.log("login", httpError);
          const apiErrorObject = httpError.body.error;
          this.errors=[apiErrorObject]; 
          // this.errors = Object.keys(apiErrorObject).map(k => apiErrorObject[k].map(em => `${k} ${em}`)) 
        }
      )

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
  


  ngOnInit() {
  }

}

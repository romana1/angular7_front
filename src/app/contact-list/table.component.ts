import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CompanyService } from '../services/company.service';
import { ConfigService } from './configuration.service';
import { Columns, Event } from 'ngx-easy-table';

// import { Company, data } from '../../../assets/data';

// @Component({
//   selector: 'app-contact-list',
//   templateUrl: './contact-list.component.html',
//   styleUrls: ['./contact-list.component.css']
// })
// export class ContactListComponent implements OnInit {

//   contacts: any[] = [];
  

//   constructor(private contactService: ContactService) { }

//   ngOnInit() {
// 	this.contactService.getContacts().subscribe((data : any[])=>{
// 		console.log(data);
// 		this.contacts = data;
//     })
//   }


// }




@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [ConfigService, CompanyService],
})
export class TableComponent implements OnInit {
  // @ViewChild('phoneTpl', { static: true }) phoneTpl: TemplateRef<any>;
  @ViewChild('phoneTpl') phoneTpl: TemplateRef<any>;
  @ViewChild('statusTpl') statusTpl: TemplateRef<any>;
  @ViewChild('buttonTpl') buttonTpl: TemplateRef<any>;
  public columns: Columns[];
  data: Company[] = [];
  configuration;
  edit: number;
  pagination = {
    limit: 10,
    offset: 0,
    count: -1,
  };

constructor(private authService: AuthService, private companyService: CompanyService, ) {
    this.configuration = ConfigService.config;
    // this.data = data.message.tasks;
  }

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe(isAuthenticated => {
      if (isAuthenticated) this.columns = [
        { key: 'id', title: 'ID' },
        { key: 'username', title: 'Username' },
        { key: 'email', title: 'Email' },
        { key: 'text', title: 'Text', cellTemplate: this.phoneTpl },
        { key: 'status', title: 'STATUS', cellTemplate: this.statusTpl },
        { key: 'button', title: 'Update', cellTemplate: this.buttonTpl },
        
      ]; else {
        this.columns = [
          { key: 'id', title: 'ID' },
          { key: 'username', title: 'Username' },
          { key: 'email', title: 'Email' },
          { key: 'text', title: 'Text' },
          { key: 'status', title: 'STATUS' },
        ]
      }
      this.getData('');
    })
  }

  eventEmitted($event) {
    if ($event.event === Event.onDoubleClick) {
      this.edit = $event.value.rowId;
    }
    this.parseEvent($event);
  }

  update($event) {
    this.data[this.edit].text = $event.target.value;
    this.edit = -1;
  }

  updateCheckbox($event) {
    console.log("updateCheckbox",$event )
    // this.data[this.edit].status = $event.target.value ;
    console.log("this.data.status",this.data[this.edit] ? this.data[this.edit].status : $event.target  )
    this.edit = -1;
  }

  private parseEvent(obj: EventObject) {
    this.pagination.limit = obj.value.limit ? obj.value.limit : this.pagination.limit;
    this.pagination.offset = obj.value.page ? obj.value.page : this.pagination.offset;
    this.pagination = { ...this.pagination };
    const params = `&page=${this.pagination.offset}`;
    this.getData(params);
  }

  private getData(params: string) {
    this.configuration = ConfigService.config;
    console.log("we are 1")
    this.companyService.getCompanies(params)
      .subscribe((response) => {
        console.log("companyService", response);
          this.data = response.body.message.tasks;
          // ensure this.pagination.count is set only once and contains count of whole array not just paginated one
          this.pagination.count = (this.pagination.count === -1) ? response.body.message.total_task_count/3 : this.pagination.count;
          this.pagination = { ...this.pagination };
        },
        (error) => {
          console.error('ERROR: ', error);
        });
  }

}

interface EventObject {
  event: string;
  value: any;
}

interface Company {
  id: number;
  username: string;
  // address?: { street: string, number?: number };
  email: string;
  text: string;
  status: number;
  img_path?: string;
}

const data = 
{
  "status": "ok",
  "message": {
      "tasks": [
          {
              "id": 5073,
              "username": "Test User",
              "email": "test_user_1@example.com",
              "text": "Hello, world!",
              "status": 10,
              "image_path": "https://uxcandy.com/~shapoval/test-task-backend/upload/user_images/1107fb5b/1524207101_avatarDoter.jpg"
          },
          {
              "id": 5074,
              "username": "Test User 2",
              "email": "test_user_2@example.com",
              "text": "Hello from user 2!",
              "status": 0,
              "image_path": "https://uxcandy.com/~shapoval/test-task-backend/upload/user_images/1107fb5b/1524207101_avatarDoter.jpg"
          },
          {
              "id": 5075,
              "username": "Test User 3",
              "email": "test_user_3@example.com",
              "text": "Hello from user 3!",
              "status": 0,
              "image_path": "https://uxcandy.com/~shapoval/test-task-backend/upload/user_images/1107fb5b/1524207101_avatarDoter.jpg"
          }
      ],
      "total_task_count": "5"
  }
};
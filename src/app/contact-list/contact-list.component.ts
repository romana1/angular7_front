import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ContactService } from '../contact.service';
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
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ConfigService],
})
export class ContactListComponent implements OnInit {
  // @ViewChild('phoneTpl', { static: true }) phoneTpl: TemplateRef<any>;
  @ViewChild('phoneTpl') phoneTpl: TemplateRef<any>;
  public columns: Columns[];
  data: Company[] = [];
  configuration;
  edit: number;

constructor() {
    this.configuration = ConfigService.config;
    this.data = data.message.tasks;
  }

  ngOnInit(): void {
    this.columns = [
      { key: 'id', title: 'ID' },
      { key: 'username', title: 'Username' },
      { key: 'email', title: 'Email' },
      { key: 'text', title: 'Text', cellTemplate: this.phoneTpl },
      { key: 'status', title: 'STATUS' },
    ];
  }

  eventEmitted($event) {
    if ($event.event === Event.onDoubleClick) {
      this.edit = $event.value.rowId;
    }
  }

  update($event) {
    this.data[this.edit].text = $event.target.value;
    this.edit = -1;
  }
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
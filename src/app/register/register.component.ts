import { DataService } from './../services/data.service';
import { Register } from './register.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register = new Register();
  message: any;
  data: any;
  status: any;
  confirmpassword: any;
  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
  }

  submit()
  {
    this.dataservice.registerUser(this.register).subscribe(res => {
      this.data = res;
      this.message = this.data.message;
      this.status = this.data.status;
      this.register = new Register();
    });
  }

}

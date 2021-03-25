import { Router } from '@angular/router';
import { DataService } from './../services/data.service';
import { LoginModel } from './login.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new LoginModel();
  data: any;
  status: any;
  message: any;
  token: any;
  constructor(private dataservice: DataService, private route: Router) { }

  ngOnInit(): void {
  }

  submit()
  {
    this.dataservice.login(this.login).subscribe((res: any) => {
      this.data = res;
      this.status = res.status;
      if (this.status == 1) {
        this.token = this.data.token;
        localStorage.setItem('token', this.token);
        this.route.navigate(['/']);
      } else {
        this.message = res.message;
      }
      });
  }

}

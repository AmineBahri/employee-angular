import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  token: any;
  userdata: any;
  username: any;
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userdata = jwt_decode(this.token);
    this.username = this.userdata.name;
    console.log(this.userdata);
  }

  logout()
  {
    localStorage.removeItem('token');
    this.route.navigate(['login']);
  }

}

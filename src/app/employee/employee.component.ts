import { Employee } from './employee.model';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  dataArr: any;
  employee = new Employee();
  selectedHobby: any = [];
  contryArr: any;
  stateArr: any;
  cityArr: any;
  files: any;
  imageDirectoryPath: any = 'http://localhost:8000/public/image/';
  page: any = 1;
  limit: any = 4;
  skip: any;
  total: any;
  hobbyArr = [
    {
      "key": "cricket",
      "value": "cricket"
    },
    {
      "key": "chess",
      "value": "chess"
    },
    {
      "key": "dance",
      "value": "dance"
    }
  ];
  constructor(private dataService: DataService, private spinner: NgxSpinnerService,
    private title: Title, private meta: Meta) { }

  ngOnInit(): void
  {
    this.title.setTitle('Home Page');
    this.meta.addTag({name: 'description', content: 'description'});
    this.getEmployeeData();
    this.getCountry();
  }

  getEmployeeData()
  {
    this.spinner.show();
    if (this.page == 1)
    {
      this.skip = 0;
    } else
    {
      this.skip = (this.page - 1) * this.limit;
    }
    var requestObj = {
         'limit': this.limit,
         'skip': this.skip
    };
    this.dataService.getData(requestObj).subscribe((res: any) => {
      this.spinner.hide();
      this.dataArr = res.employeeModel;
      this.total = res.total;
    });
  }

  getCountry()
  {
    this.dataService.getCountry().subscribe(res => {
      this.contryArr = res;
    });
  }

  insertData()
  {
    this.employee.hobby = this.selectedHobby.toString();
    let formdata = new FormData();
    formdata.append("file", this.files, this.files.name);
    formdata.append("data", JSON.stringify(this.employee));
    this.dataService.insertData(formdata).subscribe(res => {
      this.getEmployeeData();
    });
  }

  imageUpload(event)
  {
     this.files = event.target.files[0];
     //console.log(this.files);
  }

  getState(event)
  {
    var obj = {
      country_id: event.target.value
    };
    this.dataService.getState(obj).subscribe(res => {
      this.stateArr = res;
    });
  }

  getCity(event)
  {
    var obj = {
      state_id: event.target.value
    };
    this.dataService.getCity(obj).subscribe(res => {
      this.cityArr = res;
    });
  }

  deleteData(id)
  {
    this.dataService.deleteData(id).subscribe(res => {
      this.getEmployeeData();
    });
  }

  hobbyChange(event)
  {
    let index = this.selectedHobby.indexOf(event.target.value);
    if (index == -1)
    {
      this.selectedHobby.push(event.target.value);
    }else{
      this.selectedHobby.splice(index, 1);
    }
    console.log(this.selectedHobby);
  }

}

import { Employee } from './../employee/employee.model';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: any;
  employee = new Employee();
  data: any;
  selectedHobby: any = [];
  contryArr: any;
  stateArr: any;
  cityArr: any;
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
  constructor(private route: ActivatedRoute, private dataservice: DataService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getData();
    this.getCountry();
  }

  getData()
  {
    this.dataservice.getOneEmployee(this.id).subscribe(res => {
      this.data = res;
      this.employee = this.data;
      if (this.employee.country)
      {
         this.getState(this.employee.country);
      }
      if (this.employee.state)
      {
         this.getCity(this.employee.state);
      }
      this.selectedHobby = this.employee.hobby.split(",");
    }, error => console.log(error.status));
  }

  updateData()
  {
    this.employee.hobby = this.selectedHobby.toString();
    this.dataservice.updateData(this.id, this.employee).subscribe(res => {

    });
  }

  getCountry()
  {
    this.dataservice.getCountry().subscribe(res => {
      this.contryArr = res;
    });
  }

  getState(event)
  {
    var obj = {
      country_id: event
    };
    this.dataservice.getState(obj).subscribe(res => {
      this.stateArr = res;
    });
  }

  getCity(event)
  {
    var obj = {
      state_id: event
    };
    this.dataservice.getCity(obj).subscribe(res => {
      this.cityArr = res;
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

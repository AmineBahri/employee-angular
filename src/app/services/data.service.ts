import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: any;
  header = new HttpHeaders({
    'token': localStorage.getItem('token')
  });
  constructor(private httpClient: HttpClient) { }

  getData(data)
  {
    return this.httpClient.post('http://localhost:8000/employee', data);
  }

  insertData(data)
  {
    return this.httpClient.post('http://localhost:8000/addemployee', data);
  }

  deleteData(id)
  {
    return this.httpClient.delete('http://localhost:8000/deleteemployee/' + id);
  }

  getOneEmployee(id)
  {
    return this.httpClient.get('http://localhost:8000/getoneemployee/' + id, {headers: this.header});
  }

  updateData(id, data)
  {
    return this.httpClient.patch('http://localhost:8000/updateemployee/' + id, data);
  }

  getCountry()
  {
    return this.httpClient.get('http://localhost:8000/country');
  }

  getState(data)
  {
    return this.httpClient.post('http://localhost:8000/state', data);
  }

  getCity(data)
  {
    return this.httpClient.post('http://localhost:8000/city', data);
  }

  registerUser(data)
  {
    return this.httpClient.post('http://localhost:8000/user', data);
  }

  login(data)
  {
    return this.httpClient.post('http://localhost:8000/login', data);
  }
}

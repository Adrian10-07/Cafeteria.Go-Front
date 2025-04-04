import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Robots } from './robots';

@Injectable({
  providedIn: 'root'
})
export class ServiceRobotsService {

  private apiUrl = 'http://localhost:8081/robot/'; // URL base de la API

  constructor(private http: HttpClient) { }

  getRobots(): Observable<Robots[]> {
    return this.http.get<Robots[]>(this.apiUrl);
  }

  getRobotById(idRobot: number): Observable<Robots> {
    const url = `${this.apiUrl}${idRobot}`;
    return this.http.get<Robots>(url);
  }

  addRobot(robot: Robots): Observable<Robots> {
    return this.http.post<Robots>(this.apiUrl, robot);
  }

  deleteRobot(idRobot: number): Observable<void> {
    const url = `${this.apiUrl}${idRobot}`;
    return this.http.delete<void>(url);
  }

  updateRobot(idRobot: number, robot: Robots): Observable<Robots> {
    const url = `${this.apiUrl}${idRobot}`;
    return this.http.put<Robots>(url, robot);
  }
}

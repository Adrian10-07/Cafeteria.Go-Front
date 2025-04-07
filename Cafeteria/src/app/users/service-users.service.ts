import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user'; // Assuming you have a User model

@Injectable({
  providedIn: 'root'
})
export class ServiceUsersService {
  private apiUrl = 'http://107.23.119.217:8080/usuarios/'; // Base API URL

  constructor(private http: HttpClient) { }

  // Get all users
  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Get user by ID
  getUserById(id: number): Observable<User> {
    const url = `${this.apiUrl}${id}`;
    return this.http.get<User>(url);
  }

  // Save new user
  save(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Update existing user
  updateUser(id: number, user: User): Observable<User> {
    const url = `${this.apiUrl}${id}`;
    return this.http.put<User>(url, user);
  }

  // Delete user
  deleteUser(id: number): Observable<void> {
    const url = `${this.apiUrl}${id}`;
    return this.http.delete<void>(url);
  }

  // Login user
  login(email: string, password: string): Observable<{user: User, token: string}> {
    const url = `${this.apiUrl}login`;
    return this.http.post<{user: User, token: string}>(url, { email, password });
  }

  // Get user by email
  getUserByEmail(email: string): Observable<User> {
    const url = `${this.apiUrl}email/${email}`;
    return this.http.get<User>(url);
  }
}
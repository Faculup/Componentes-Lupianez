import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];
  private currentId = 0;
  private usersSubject = new BehaviorSubject<User[]>([]);

  constructor() {
    this.initUsers(); // Initialize users with random data
  }

  private initUsers(): void {
    for (let i = 0; i < 15; i++) {
      const score = Math.floor(Math.random() * 101); // Random score between 0 and 100
      this.users.push({
        id: this.currentId++,
        name: `Estudiante ${i + 1}`,
        score: score,
      });
    }
    this.usersSubject.next(this.users);
  }

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  addUser(user: User): Observable<User> {
    user.id = this.currentId++; // Assign a new ID
    this.users.push(user);
    this.usersSubject.next(this.users);
    return of(user).pipe(delay(500)); // Simulate a network delay
  }

  updateUser(user: User): Observable<User> {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index > -1) {
      this.users[index] = user;
      this.usersSubject.next(this.users);
    }
    return of(user).pipe(delay(500)); // Simulate a network delay
  }

  deleteUser(userId: number): Observable<boolean> {
    const index = this.users.findIndex((u) => u.id === userId);
    if (index > -1) {
      this.users.splice(index, 1);
      this.usersSubject.next(this.users);
      return of(true).pipe(delay(500)); // Simulate a network delay
    }
    return of(false).pipe(delay(500));
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface User {
  name: string;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUsers(): Observable<User[]> {
    const users: User[] = [];
    for (let i = 0; i < 15; i++) {
      const score = Math.floor(Math.random() * 101); // Random score between 0 and 100
      users.push({
        name: `Estudiante ${i + 1}`,
        score: score,
      });
    }
    return of(users);
  }
}

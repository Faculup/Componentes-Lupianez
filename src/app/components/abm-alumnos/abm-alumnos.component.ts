import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService, User } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatPaginatorModule,
  ],
})
export class AbmAlumnosComponent {
  studentForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    score: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
    ]),
    approved: new FormControl(false),
  });

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  addStudent(): void {
    if (this.studentForm.valid) {
      this.userService
        .addUser(this.studentForm.value as unknown as User)
        .subscribe({
          next: (user) => {
            this.snackBar.open('Student added successfully!', 'Close', {
              duration: 3000,
            });
            this.studentForm.reset();
          },
          error: (err) => {
            console.error('Error adding student', err);
            this.snackBar.open('Failed to add student.', 'Close', {
              duration: 3000,
            });
          },
        });
    }
  }

  updateStudent(): void {
    if (this.studentForm.valid) {
      this.userService
        .updateUser(this.studentForm.value as unknown as User)
        .subscribe({
          /* ... */
        });
    }
  }

  deleteStudent(): void {
    const id = this.studentForm.get('id')?.value;
    if (id) {
      this.userService.deleteUser(id).subscribe({
        /* ... */
      });
    }
  }
}

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user-service.service';

interface User {
  name: string;
  score: number;
}

@Component({
  selector: 'app-lista-de-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './lista-de-usuarios.component.html',
  styleUrl: './lista-de-usuarios.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaDeUsuariosComponent implements OnInit {
  displayedColumns: string[] = ['name', 'score', 'approved'];
  dataSource = new MatTableDataSource<User>();
  filterValue: string | undefined;

  searchControl = new FormControl('');

  @ViewChild(MatPaginator) paginator: MatPaginator | null | undefined;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users: any) => {
      this.dataSource.data = users;
    });

    this.searchControl.valueChanges.subscribe((value) => {
      this.dataSource.filter = value?.trim()?.toLowerCase() || '';
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

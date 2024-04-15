import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ListaDeUsuariosComponent } from '../lista-de-usuarios/lista-de-usuarios.component';
import { AbmAlumnosComponent } from '../abm-alumnos/abm-alumnos.component';

interface GitHubProject {
  name: string;
  html_url: string;
  description: string;
}

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    ListaDeUsuariosComponent,
    AbmAlumnosComponent,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContentComponent {
  constructor(private http: HttpClient) {}

  ngOnInit() {}
}

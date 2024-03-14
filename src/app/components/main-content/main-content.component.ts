import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Observable, map } from 'rxjs';

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
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContentComponent {
  public projects$: Observable<GitHubProject[]> | undefined;

  public userAvatarUrl$: Observable<string> | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.projects$ = this.http.get<GitHubProject[]>(
      'https://api.github.com/users/faculup/repos'
    );

    this.fetchUserAvatar('faculup');
  }

  fetchUserAvatar(username: string) {
    this.userAvatarUrl$ = this.http
      .get<any>(`https://api.github.com/users/${username}`)
      .pipe(map((user) => user.avatar_url));
  }
}

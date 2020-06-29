import { Component, OnInit } from '@angular/core';

declare const M;
declare const $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'shopeable';

  ngOnInit(): void {
    (M as any).AutoInit();
  }
  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}

import { Component, OnInit } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";


@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  standalone: true,
  imports: [MatBadgeModule, MatButtonModule, MatIconModule, MatCardModule],
  })
export class AppBadgeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}

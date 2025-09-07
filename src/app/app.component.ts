import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, MatToolbarModule]
})
export class AppComponent {
  title = 'Angular Inventory Management';
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemListingComponent } from "./item-listing/item-listing.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ItemListingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'item-list-app';
}

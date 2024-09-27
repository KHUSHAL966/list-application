import {} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ItemService } from '../services/item.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-item-listing',
  standalone: true,
  imports: [ CommonModule,  FormsModule ],//import common module and form module
  templateUrl: './item-listing.component.html',
  styleUrl: './item-listing.component.css'
})
export class ItemListingComponent {
  items: any[] = [];
  filteredItems: any[] = [];
  filterTerm: string = '';
  sortOrder: string = 'asc';// by default it show in asc order
  errorMessage: string = ''; // To display error messages


  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  async loadItems() {
    // usetry cstch for error handling
    try {
      this.itemService.getItems().subscribe({
        next: (data: any[]) => {
          this.items = data; // storing fetch item in array
          this.filteredItems = [...this.items]; //Initial filtered items are the same as original
        },
        error: (err: string) => {
          this.errorMessage = err; // Handle error message here
          console.error('Error fetching items:', err);
        }
      });
    } catch (error) {
      this.errorMessage = 'An unexpected error occurred.';
      console.error('Unexpected error:', error);
    }
  }

  filterItems() {
    this.filteredItems = this.items.filter(item =>
      item.title.toLowerCase().includes(this.filterTerm.toLowerCase())// filtering the data in case sensitive
    );
  }
// here we are doing sorting
  sortItems() {
    this.filteredItems.sort((a, b) => {
      // it check the condtion sort order is asc or desc
      if (this.sortOrder === 'asc') { // used spread operator
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  }
}



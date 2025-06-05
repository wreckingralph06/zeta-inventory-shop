import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocalStorage } from '../../services/local-storage';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory {
  selectedImage: string = '';

  inventoryList: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private localStorageService: LocalStorage) {
    this.loadFromLocalStorage();
  }

  get paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.inventoryList.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.inventoryList.length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  
  confirmDelete(item: any) {
    const confirmed = confirm(`Are you sure you want to delete "${item.productName}"?`);
    if (confirmed) {
      this.deleteItem(item);
    }
  }

  deleteItem(item: any) {
    this.inventoryList = this.inventoryList.filter(p => p !== item);
    this.saveToLocalStorage();
  }

  openImageModal(imageUrl: string): void {
    this.selectedImage = imageUrl;
    const modal = new (window as any).bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
  }

  toggleDescription(item: any, event: Event) {
    event.preventDefault();
    item.showFullDesc = !item.showFullDesc;
  }

  private saveToLocalStorage() {
    this.localStorageService.setItem('inventoryList', this.inventoryList);
  }

  private loadFromLocalStorage() {
    const stored = this.localStorageService.getItem<any[]>('inventoryList');
    if (stored) {
      this.inventoryList = stored;
    }
  }
}

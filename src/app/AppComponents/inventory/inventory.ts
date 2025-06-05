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
  inventoryData = {
    productId: '',
    productName: '',
    quantity: 0,
    reorderPoint: 0
  };

  inventoryList: any[] = [];

  constructor(private localStorageService: LocalStorage) {
    this.loadFromLocalStorage();
  }

  onSubmit() {
    this.inventoryList.push({ ...this.inventoryData });
    this.saveToLocalStorage();
    this.inventoryData = { productId: '', productName: '', quantity: 0, reorderPoint: 0 };
  }

  editItem(item: any) {
    console.log('Edit:', item);
    // Add your edit logic here
  }

  deleteItem(item: any) {
    this.inventoryList = this.inventoryList.filter(p => p !== item);
    this.saveToLocalStorage();
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

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
    description: '',
    price: 0,
    image: ''  // Base64 image string
  };

  selectedImage: string = '';

  inventoryList: any[] = [];

  constructor(private localStorageService: LocalStorage) {
    this.loadFromLocalStorage();
  }

  onSubmit() {
    this.inventoryList.push({ ...this.inventoryData });
    this.saveToLocalStorage();
    this.inventoryData = { productId: '', productName: '', quantity: 0, description: '', price: 0, image: '' };
  }

  editItem(item: any) {
    console.log('Edit:', item);
    // Add your edit logic here
  }
  
  confirmDelete(item: any) {
    const confirmed = confirm(`Are you sure you want to delete "${item.productName}"?`);
    if (confirmed) {
      this.deleteItem(item);
    }
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.inventoryData.image = reader.result as string;
      };
      reader.readAsDataURL(file);
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

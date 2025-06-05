import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorage } from '../../services/local-storage';

@Component({
  selector: 'app-inventory-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inventory-create.html',
  styleUrl: './inventory-create.css'
})
export class InventoryCreate {
  inventoryData = {
    productId: '',
    productName: '',
    quantity: 0,
    description: '',
    price: 0,
    image: ''  // Base64 image string
  };

  constructor(private localStorageService: LocalStorage, private router: Router) {}
  
  onSubmit() {
    const list = this.localStorageService.getItem<any[]>('inventoryList') || [];
    list.push(this.inventoryData);
    this.localStorageService.setItem('inventoryList', list);
    this.router.navigate(['/inventory']);  // Redirect after creating
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
}

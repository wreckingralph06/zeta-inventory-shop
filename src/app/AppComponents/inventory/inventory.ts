import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-inventory',
  imports: [FormsModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory {
  newProduct = {
    productId: '',
    productName: '',
    quantity: 0,
    reorderPoint: 0
  };

  inventoryList = [
    // Example product
    { productId: 'PRD001', productName: 'Widget A', quantity: 100, reorderPoint: 20 }
  ];

  onSubmit(): void {
    if (this.newProduct.productId && this.newProduct.productName) {
      this.inventoryList.push({ ...this.newProduct });
      this.newProduct = { productId: '', productName: '', quantity: 0, reorderPoint: 0 };
    }
    alert("Form submitted Successfully");
  }

  editItem(item: any) {
    // Logic to edit item
    console.log('Edit:', item);
  }

  deleteItem(item: any) {
    this.inventoryList = this.inventoryList.filter(p => p !== item);
  }
}

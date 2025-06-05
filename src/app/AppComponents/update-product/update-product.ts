import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage } from '../../services/local-storage';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css'
})
export class UpdateProduct implements OnInit {
  product: any = {
    productId: '',
    productName: '',
    quantity: 0,
    description: '',
    price: 0,
    image: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorage
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.queryParamMap.get('productId');
    const inventoryList = this.localStorageService.getItem<any[]>('inventoryList') || [];
    const match = inventoryList.find(p => p.productId === productId);
    if (match) {
      this.product = { ...match };
    }
  }

  onUpdate(): void {
    const inventoryList = this.localStorageService.getItem<any[]>('inventoryList') || [];
    const index = inventoryList.findIndex(p => p.productId === this.product.productId);
    if (index !== -1) {
      inventoryList[index] = { ...this.product };
      this.localStorageService.setItem('inventoryList', inventoryList);
      this.router.navigate(['/inventory']);
    }
  }

  onImageChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.product.image = reader.result as string; // Base64 string
    };

    reader.readAsDataURL(file);
  }
}
}

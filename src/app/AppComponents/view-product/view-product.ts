import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  imports: [],
  templateUrl: './view-product.html',
  styleUrl: './view-product.css'
})
export class ViewProduct {
  product: any;

  constructor(private route: ActivatedRoute) {
    const productId = this.route.snapshot.queryParamMap.get('productId');
    const storedProducts = JSON.parse(localStorage.getItem('inventoryList') || '[]');
    this.product = storedProducts.find((p: any) => p.productId === productId);
  }

  addToCart() {
    console.log('Added to cart:', this.product);
  }

  addToWishlist() {
    console.log('Added to wishlist:', this.product);
  }
}

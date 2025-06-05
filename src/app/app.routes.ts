import { Routes } from '@angular/router';
import { Inventory } from './AppComponents/inventory/inventory';
import { UpdateProduct } from './AppComponents/update-product/update-product';

export const routes: Routes = [
    {path: 'inventory', component: Inventory },
    {path: 'update-product', component: UpdateProduct },
];

import { Routes } from '@angular/router';
import { Inventory } from './AppComponents/inventory/inventory';
import { UpdateProduct } from './AppComponents/update-product/update-product';
import { ViewProduct } from './AppComponents/view-product/view-product';
import { InventoryCreate } from './AppComponents/inventory-create/inventory-create';

export const routes: Routes = [
    {path: 'inventory', component: Inventory },
    {path: 'create-product', component: InventoryCreate },
    {path: 'update-product', component: UpdateProduct },    
    {path: 'view-product', component: ViewProduct }
];

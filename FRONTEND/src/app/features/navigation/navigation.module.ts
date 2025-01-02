import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { SearchbarComponent } from './menu/searchbar/searchbar.component';
import { CategoriesComponent } from './menu/categories/categories.component';
import { CardsComponent } from './menu/cards/cards.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './menu/cart/cart.component';

const routes: Routes = [
  { path: '', component: MenuComponent }
];

@NgModule({
  declarations: [
    MenuComponent,
    SearchbarComponent,
    CategoriesComponent,
    CardsComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterOutlet,
    FormsModule
  ],
  exports: [
    MenuComponent,
    RouterModule,
    SearchbarComponent,
    CategoriesComponent,
    CardsComponent,
    RouterOutlet,
    FormsModule
  ]
})
export class NavigationModule { }

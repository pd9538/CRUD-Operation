import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';


const routes: Routes = [
  {path:'',redirectTo:'/shopping-list',pathMatch:'full'},
  {path:'shopping-list',loadChildren:()=> import('./shopping-list/shopping-list.module').then(m=>m.ShoppingListModule)},
  {path:'auth',loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

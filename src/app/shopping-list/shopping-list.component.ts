import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription,Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
import { Ingredients } from '../ingredients.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients: Observable<{ingredients:Ingredients[]}> ;
  private idChangedSub:Subscription;
  constructor(private store:Store<fromApp.AppState>,
              ) { }

  ngOnInit(): void {
   this.ingredients= this.store.select('shoppingList');
  }

  onEditItem(index:number){
   //this.shoppinglist.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
//    this.idChangedSub.unsubscribe();
}
}

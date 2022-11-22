import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
import { Ingredients } from 'src/app/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slform:NgForm;
  subscription:Subscription;
  editMode=false;
  editedItem:Ingredients;

  constructor(private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription=this.store.
    select('shoppingList').
    subscribe(stateData=>{
      if(stateData.editedIngredientIndex > -1){
        this.editMode=true;
        this.editedItem=stateData.editedIngredient;
        this.slform.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        });
      }else{
        this.editMode=false;
      }
    });
  }

  onSubmit(form:NgForm){
    const value=form.value;
    const newIngredient=new Ingredients(value.name,value.amount);
    if(this.editMode){
      //this.shoppinglist.updateIngredient(this.editedItemIndex,newIngredient)
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient))
    }
    else{
    //this.shoppinglist.addIngredients(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
  }
      this.slform.reset();
      this.editMode=false;
  }

  onDelete(){
//    this.shoppinglist.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient())
    this.onClear();
  }

  onClear(){
    this.slform.reset();
    this.editMode=false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

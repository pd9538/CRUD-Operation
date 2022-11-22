import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
    selector : 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy{
    isLoginMode=true;
    isLoading=false;
    error:string=null;
    @ViewChild(PlaceholderDirective) alertHost:PlaceholderDirective;
    private closeSub:Subscription;
    private storeSub:Subscription;

    constructor(
        private componentFactoryResolver:ComponentFactoryResolver,
        private store:Store<fromApp.AppState>
        ){}

        ngOnInit(){

            this.storeSub=this.store.select('auth').subscribe(authState=>{
                this.isLoading=authState.loading;
                this.error=authState.authError;
                if(this.error){
                  this.showErrorAlert(this.error);
                }
              }
            )
        }
        onSwitchMode(){
            this.isLoginMode= !this.isLoginMode;
    }

    onSubmit(form:NgForm){
        if(!form.valid){
            return;
        }
        const email=form.value.email;
        const password=form.value.password;


        if(this.isLoginMode){
            this.store.dispatch(new AuthActions.LoginStart({email:email,password:password}))
            form.reset();
        }else{
            this.store.dispatch(new AuthActions.SignupStart({email:email,password:password}));
            }
            form.reset();
        }

        private showErrorAlert(message:string){
          // const alertCmpt=new AlertComponent();
         const alertComponentFact=this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
         const hostViewContainerRef=this.alertHost.viewcontainerref;
         hostViewContainerRef.clear();

        const componentRef= hostViewContainerRef.createComponent(alertComponentFact);
          componentRef.instance.message=message;
         this.closeSub=componentRef.instance.close.subscribe(()=>{
           this.closeSub.unsubscribe();
          hostViewContainerRef.clear();
          });
     }

    onHandleError(){
        this.store.dispatch(new AuthActions.ClearError());
    }


   ngOnDestroy(){
       if(this.closeSub){
           this.closeSub.unsubscribe();
        }
        if(this.storeSub){
            this.storeSub.unsubscribe();
        }
   }
}

import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NgModule } from "@angular/core";
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports: [
        CommonModule,
    ],
    exports:[
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule,
    ],
})
export class SharedModule{}

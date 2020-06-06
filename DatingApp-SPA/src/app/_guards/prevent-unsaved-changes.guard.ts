import { Injectable } from "@angular/core";
import { CanActivate, CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import {ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';

@Injectable()
export class PreventUnsavedChanged implements CanDeactivate<MemberEditComponent>{
    canDeactivate(component: MemberEditComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot ) :boolean{
        if(component.editForm.dirty){
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost ')
        }
        return true;
    }
   

}
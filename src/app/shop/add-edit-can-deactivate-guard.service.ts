import { CanDeactivate } from '@angular/router';
import { AddEditShopComponent } from './add-edit-shop.component';
import { Injectable } from '@angular/core';

@Injectable()
export class AddEditShopCanDeactivateGuardService implements CanDeactivate<AddEditShopComponent>
{
    canDeactivate(component: AddEditShopComponent): boolean {
        if(component.addEditShopForm.dirty){
            return confirm('Are you sure to discard your changes?')
        }
        return true;
    }
}
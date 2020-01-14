import { Component, OnInit, Inject } from '@angular/core';
import { Shop } from '../model/shop';

@Component({
    selector: 'app-add-edit--shop',
    templateUrl: 'add-edit-shop.component.html',
    styleUrls: ['add-edit-shop.component.scss']    
})

export class AddEditShopComponent implements OnInit {
    error: string;
    shop : Shop;
    constructor() { }

    ngOnInit() {this.shop=new Shop(); }

    

    add() {
        // if (this.data.name) { this._dialogRef.close(this.data.name); }
        // else { this.error = "Please enter a name for the shop." };
    }
}
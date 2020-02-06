import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Shop } from '../model/shop';
import { ShopService } from '../core/shop.service';
import { Utils } from '../core/utils';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-add-edit-shop',
    templateUrl: 'add-edit-shop.component.html',
    styleUrls: ['add-edit-shop.component.scss']    
})

export class AddEditShopComponent implements OnInit {
    @ViewChild('shopForm', {static: true})
    public addEditShopForm : NgForm;
    shopId : number;
    error : string;
    shop : Shop;
    constructor(private _shopService: ShopService,
        private _router: Router,
        private _route: ActivatedRoute) { }

    ngOnInit() {       
        let parmShopId=this._route.snapshot.params.shopId;
        if(parmShopId !== undefined) {
            this.shopId = parseInt(parmShopId);
            this._shopService.getShop(this.shopId).subscribe(s => {
                this.shop = s;
            }, error => (this.error = Utils.formatError(error)));
        }
        else{
            this.shop = new Shop();
        }        
     }    

    addShop(shop:Shop) {      
        this._shopService.addShop(shop).subscribe(shop => {
            this._router.navigate(['/shops']); 
          }, error => this.error = Utils.formatError(error));       
    }
    editShop(shop:Shop) {
        if(shop.id)
        this._shopService.updateShop(shop).subscribe(shop => {
            this._router.navigate(['/shops']); 
          }, error => this.error = Utils.formatError(error));       
    }
}
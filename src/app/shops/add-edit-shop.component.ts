import { Component, OnInit, Inject } from '@angular/core';
import { Shop } from '../model/shop';
import { ShopService } from '../core/shop.service';
import { Utils } from '../core/utils';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-edit-shop',
    templateUrl: 'add-edit-shop.component.html',
    styleUrls: ['add-edit-shop.component.scss']    
})

export class AddEditShopComponent implements OnInit {
    shopId: number;
    error: string;
    shop : Shop;
    constructor(private _shopService: ShopService,
        private _router: Router,
        private _route: ActivatedRoute) { }

    ngOnInit() {
        //this.shop=new Shop();
        this.shopId = parseInt(this._route.snapshot.params.shopId);

        this._shopService.getShop(this.shopId).subscribe(s => {
          this.shop = s;        
        }, error => (this.error = Utils.formatError(error)));
     }

    

    addShop(shop) {
        this._shopService.addShop(shop).subscribe(shop => {
            this._router.navigate(['/shops']); 
          }, error => this.error = Utils.formatError(error));
        // if (this.data.name) { this._dialogRef.close(this.data.name); }
        // else { this.error = "Please enter a name for the shop." };
    }
}
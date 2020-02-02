import { Component, OnInit, Inject } from '@angular/core';
import { Shop } from '../model/shop';
import { ShopService } from '../core/shop.service';
import { Utils } from '../core/utils';
import {Router} from '@angular/router';

@Component({
    selector: 'app-add-edit--shop',
    templateUrl: 'add-edit-shop.component.html',
    styleUrls: ['add-edit-shop.component.scss']    
})

export class AddEditShopComponent implements OnInit {
    error: string;
    shop : Shop;
    constructor(private _shopService: ShopService,
        private router: Router) { }

    ngOnInit() {this.shop=new Shop(); }

    

    addShop(shop) {
        this._shopService.addShop(shop).subscribe(shop => {
            this.router.navigate(['/shops']); 
          }, error => this.error = Utils.formatError(error));
        // if (this.data.name) { this._dialogRef.close(this.data.name); }
        // else { this.error = "Please enter a name for the shop." };
    }
}
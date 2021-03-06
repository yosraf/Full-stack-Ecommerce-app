import { Component, OnInit, OnChanges,SimpleChanges } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit,OnChanges {

  products: Product[];
  currentCategoryId: number;
  searchMode: boolean;
  productNumber =0;
  productPrice =0;

  constructor(private productListService: ProductService, private route: ActivatedRoute) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handlesSearchProduct();

    } else {
      this.handlesListProduct();
    }


  }

  handlesListProduct() {
    const hasIdValue: boolean = this.route.snapshot.paramMap.has('id');
    if (hasIdValue) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }
    this.productListService.getProductList(this.currentCategoryId).subscribe(data => {
      this.products = data;
    });
  }

  handlesSearchProduct() {
    const keyWord: string = this.route.snapshot.paramMap.get('keyword');
    this.productListService.searchProduct(keyWord).subscribe(data => {
      this.products = data;
    });
  }
  addToCart(product :Product) {
    this.productNumber++;
    this.productPrice += product.unitPrice;
    this.productListService.addProductToCart(this.productNumber, this.productPrice);

  }
  ngOnInit(): void {

    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }


}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../product';

@Component({
  selector: 'router-outlet',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products!: Product[];
	selectedProduct: Product = { id : null, name: null, price: null, mrp: null, quandity: null}
	constructor(private apiService: ApiService) {
		this.apiService.readProducts().subscribe((products: Product[])=>{
		this.products = products;
		console.log(this.products);
	}) }
	ngOnInit()
	{
	}
	createOrUpdateProduct(form: { value: Product; }){
		form.value.id = this.selectedProduct.id;
		form.value.name = this.selectedProduct.name;
		form.value.price = this.selectedProduct.price;
		form.value.mrp = this.selectedProduct.mrp;
		form.value.quandity = this.selectedProduct.quandity;

		if(this.selectedProduct && this.selectedProduct.id){
			this.apiService.updateProduct(form.value).subscribe((product: Product)=>{
			console.log("Product updated" , product);
			this.apiService.readProducts().subscribe((products: Product[])=>{
				this.products = products;
			})
		});
	}
	else{
		this.apiService.createProduct(form.value).subscribe((product: Product)=>{
			console.log("Product created, ", product);
			this.apiService.readProducts().subscribe((products: Product[])=>{
				this.products = products;
			})
		});
	}
}

selectProduct(product: Product){
	this.selectedProduct = product;
}

deleteProduct(id:number){
	this.apiService.deleteProduct(id).subscribe((product: Product)=>{
		console.log("Product deleted, ", product);
		this.apiService.readProducts().subscribe((products: Product[])=>{
			this.products = products;
		})
	});
}
}

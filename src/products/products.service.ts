import { Injectable , NotFoundException} from '@nestjs/common';
import { Product } from './product.model';
import {v4 as uuidv4} from 'uuid';

@Injectable()

export class ProductsService{
    private products: Product[] = [];

    insertProduct(title: string,desc: string, price:string){
        const prodId = uuidv4().toString()
        const creation= Date().toString()
        const newProduct = new Product(prodId, title,desc,price,creation)
        this.products.push(newProduct);
        return prodId
    }

    getProducts(){
        return [...this.products];
    }

    getSingleProduct(productId: string){
        const product = this.findProduct(productId);
        return {...product};
    }

    updateProduct(productId : string, title: string, desc: string, price: string,creation:string){
        const [product,index]= this.findProduct(productId);
        const updatedProduct= {...product};
        if (title){
            updatedProduct.task= title
        }

        if (desc){
            updatedProduct.description= desc
        }

        if (price){
            updatedProduct.status= price
        }
        this.products[index] = updatedProduct;

    }
        
    deleteProduct(prodId : string){

        const index = this.findProduct(prodId)[1];
        this.products.splice(index,1);

    }


    private findProduct(id: string): [Product,number]{
        const productIndex = this.products.findIndex(prod => prod.id === id)
        const product = this.products[productIndex];
        if(!product){
            throw new NotFoundException('couldnot find the product');
        }
        return [product, productIndex];

    }
}
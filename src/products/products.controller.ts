import { Controller, Post , Body , Get, Param, Patch, Delete, UseGuards} from '@nestjs/common';
import { ProductsService } from  './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class ProductsController {
  constructor(private readonly productsService: ProductsService){}

  @Post()
  addProduct(@Body('task') prodTitle : string,
  @Body('description') prodDesc : string,
  @Body('status') prodPrice : string
   ): any {

    const generatedId = this.productsService.insertProduct(prodTitle,
    prodDesc,
    prodPrice);
    return {id: generatedId};
    
  }
  
  @Get()
  getAllProducts(){
    return this.productsService.getProducts();
  }


  @Get(':id')
  getProduct(@Param('id') prodId : string,){
    return this.productsService.getSingleProduct(prodId);
  }



  @Patch(':id')
  updateProduct(@Param('id') prodId : string, 
  @Body('task') prodTitle: string, 
  @Body ('description') prodDesc : string,
   @Body('status') prodPrice: string,
   @Body('creation') creation : string
   ){
     this.productsService.updateProduct(prodId,prodTitle,prodDesc,prodPrice,creation)
     return null;

  }


 @Delete(':id')
  removeProduct(@Param('id') prodId : string){
    this.productsService.deleteProduct(prodId);
    return null;


  }
}
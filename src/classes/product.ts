export class Product {
   constructor(
       public id = '',
       public data = new ProductData()
   ) {
   }
}

export class ProductData {
   constructor(
       public category = '',
       public description = '',
       public title = '',
       public employee = '',
       public price = 0,
       public reviews = ['']

   ) {
   }
}

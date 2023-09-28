export class Product {
   constructor(
       public id = '',
       public data = new ProductData()
   ) {
   }
}

export class ProductData {
   constructor(
       public reviews = ['Test'],
       public price = 5000,
       public description = 'Test',
       public title = 'Test',
       public category = 'Test',
       public employee = 'Test'
   ) {
   }
}

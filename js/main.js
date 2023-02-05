let app = new Vue({
   el: '#app',
   data: {
       product: "Socks",
       brand: 'Vue Mastery',
       image: "./assets/vmSocks-green-onWhite.jpg",
       selectedVariant: 0,
       altText: "A pair of socks",
       details: ['80% cotton', '20% polyester', 'Gender-neutral'],
       onSale: "qew",
variants: [
   {
       variantId: 2234,
       variantColor: 'green',
       variantImage: "./assets/vmSocks-green-onWhite.jpg",
       variantQuantity: 10,
       onSale: "Распродажа",
   },
   {
       variantId: 2235,
       variantColor: 'blue',
       variantImage: "./assets/vmSocks-blue-onWhite.jpg",
       variantQuantity: 0,
       onSale: "",
   }
],

       cart: 0,

   },
   methods: {
       addToCart() {
           this.cart += 1
       },
updateProduct(index) {
   this.selectedVariant = index;
   console.log(index);
}

   },
   computed: {
   title() {
       return this.brand + ' ' + this.product + "  " +this.variants[this.selectedVariant].onSale;
   },
   image() {
   return this.variants[this.selectedVariant].variantImage;
},
inStock(){
   return this.variants[this.selectedVariant].variantQuantity
}


}

})

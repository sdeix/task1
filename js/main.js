let eventBus = new Vue({


})
eventBus.$on('review-submitted', function (productReview) {
   this.reviews.push(productReview)
}.bind(this))

eventBus.$on('review-submitted', function (productReview) {
   this.reviews.push(productReview)
}.bind(this))

Vue.component('product-review', {
   template: `

<form class="review-form" @submit.prevent="onSubmit">

<p v-if="errors.length">
 <b>Please correct the following error(s):</b>
 <ul>
   <li v-for="error in errors">{{ error }}</li>
 </ul>
</p>

 <p>
   <label for="name">Name:</label>
   <input id="name" v-model="name" placeholder="name">
 </p>

 <p>
   <label for="review">Review:</label>
   <textarea id="review" v-model="review"></textarea>
 </p>

 <p>

   <p>Rating: </p>
   <input type="radio"  value="1" v-model="rating">
    <label>1</label>

    <input type="radio"  v-model="rating" value="2">
    <label>2</label>

        <input type="radio"  v-model="rating" value="3">
    <label>3</label>
            <input type="radio"  v-model="rating" value="4">
    <label>4</label>
            <input type="radio" id="rate1" v-model="rating" value="5">
    <label for="rate1">5</label>


 </p>

 <p>
   <input type="submit" value="Submit">
 </p>

</form>
 `,
   data() {
       return {
           name: null,
           review: null,
           rating: null,
           errors: []
       }
   },
   methods:{
       onSubmit() {
           if(this.name && this.review && this.rating) {
               let productReview = {
                   name: this.name,
                   review: this.review,
                   rating: this.rating
               }
               eventBus.$emit('review-submitted', productReview)
               this.name = null
               this.review = null
               this.rating = null
           } else {
               if(!this.name) this.errors.push("Name required.")
               if(!this.review) this.errors.push("Review required.")
               if(!this.rating) this.errors.push("Rating required.")
           }
       }
   }
})

Vue.component('product', {
mounted() {
   eventBus.$on('review-submitted', productReview => {
       this.reviews.push(productReview)
   })
},
   props: {
       premium: {
           type: Boolean,
           required: true
       }
   },
   template: `
   <div class="product">
    <div class="product-image">
           <img :src="image" :alt="altText"/>
       </div>

       <div class="product-info">
           <h1>{{ title }}</h1>
           <p v-if="inStock">In stock</p>
           <p v-else>Out of Stock</p>

           <div
                   class="color-box"
                   v-for="(variant, index) in variants"
                   :key="variant.variantId"
                   :style="{ backgroundColor:variant.variantColor}"
                   @mouseover="updateProduct(index)"

           ><p class="qww" @mouseover="updateProduct(index)"> {{variant.price}} ????????????</p></div>

           <button
                   v-on:click="addToCart"
                   :disabled="!inStock"
                   :class="{ disabledButton: !inStock }"
           >
               Add to cart
           </button>
       </div>

<product-tabs :reviews="reviews" :shipping="shipping" :details="details"></product-tabs>
       </div>
 `,
   data() {
       return {
           product: "Socks",
           brand: 'Vue Mastery',
           selectedVariant: 0,
           altText: "A pair of socks",
           details: ['80% cotton', '20% polyester', 'Gender-neutral'],
           variants: [
               {
                   price: 100,
                   variantId: 2234,
                   variantColor: 'green',
                   variantImage: "./assets/vmSocks-green-onWhite.jpg",
                   variantQuantity: 10
               },
               {
                   price: 90,
                   variantId: 2235,
                   variantColor: 'blue',
                   variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                   variantQuantity: 1
               }
           ],
           reviews: []
       }
   },
   methods: {
       addToCart() {
           this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId, this.variants[this.selectedVariant].price);
       },
       updateProduct(index) {
           this.selectedVariant = index;
       },

   },
   computed: {
       title() {
           return this.brand + ' ' + this.product;
       },
       image() {
           return this.variants[this.selectedVariant].variantImage;
       },
       inStock() {
           return this.variants[this.selectedVariant].variantQuantity
       },
       shipping() {
           if (this.premium) {
               return "Free";
           } else {
               return 2.99
           }
       }
   }
})



Vue.component('product-tabs', {
  template: `
     <div>
       <ul>
         <span class="tab"
               :class="{ activeTab: selectedTab === tab }"
               v-for="(tab, index) in tabs"
               @click="selectedTab = tab"
         >{{ tab }}</span>
       </ul>
       <div v-show="selectedTab === 'Make a Review'">
         <p v-if="!reviews.length">There are no reviews yet.</p>
         <ul>
           <li v-for="review in reviews">
           <p>{{ review.name }}</p>
           <p>Rating: {{ review.rating }}</p>
           <p>{{ review.review }}</p>
           </li>
         </ul>
       </div>
       <product-review  v-show="selectedTab === 'Reviews'"></product-review>

       <p  v-show="selectedTab === 'Shipping'" >Shipping: {{ shipping }}</p>

          <ul v-show="selectedTab === 'Details'">
               <li v-for="detail in details">{{ detail }}</li>
           </ul>
     </div>
`,

   data() {
       return {
           tabs: ['Reviews', 'Make a Review', 'Shipping', 'Details'],
           selectedTab: 'Reviews'  // ?????????????????????????????? ?? ?????????????? @click,
       }
   },
   props: {
   reviews: {
       type: Array,
       required: false
   },
   shipping: String,
   details: Array,
},


})






let app = new Vue({
   el: '#app',
   data: {
       premium: true,
       cart: [],
       sum:0
   },
   methods: {
       updateCart(id, price) {
           this.cart.push(id);
           this.sum+=price;
       },


   }
})

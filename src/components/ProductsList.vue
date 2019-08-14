<template>
	<section class="products-container">
		<div v-for="product in products" :key="product.id">
			<img v-if="product.photos" :src="product.photos[0].src" :alt="product.photos[0].title">
			<p class="price">{{product.price}}</p>
			<h2 class="title">{{product.name}}</h2>
			<p>{{product.description}}</p>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			products: null
		}
	},
	methods: {
		getProducts() {
			fetch("http://localhost:3000/product")
				.then(r => r.json())
				.then(r => {
					this.products = r;
				})
		}
	},
	created() {
		this.getProducts();
	}
}
</script>

<style>

</style>
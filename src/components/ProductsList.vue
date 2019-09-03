<template>
	<section class="products-container">
		<transition mode="out-in">
			<div v-if="products && products.length" class="products" key="products">
				<div v-for="(product, index) in products" :key="index" class="product">
					<router-link :to="{name: 'product', params: {id: product.id}}">
						<img v-if="product.photos" :src="product.photos[0].src" :alt="product.photos[0].title">
						<p class="price">{{product.price | currencyStyle}}</p>
						<h2 class="title">{{product.name}}</h2>
						<p>{{product.description}}</p>
					</router-link>
				</div>
				<ProductsPagination :productsTotal="productsTotal" :productsPerPage="productsPerPage"/>
			</div>

			<div v-else-if="products && products.length === 0" class="no-results" key="no-results">
				<p>Busca sem resultados. Tente buscar outro termo.</p>
			</div>

			<PageLoading v-else key="loading"/>

		</transition>
	</section>
</template>

<script>
import ProductsPagination from "@/components/ProductsPagination.vue";
import { api } from "@/services.js";
import { serialize } from "@/helpers.js";

export default {
	data() {
		return {
			products: null,
			productsPerPage: 9,
			productsTotal: 0,
		}
	},
	components: {
		ProductsPagination
	},
	computed: {
		url() {
			const query = serialize(this.$route.query);
			return `/product?_limit=${this.productsPerPage}${query}`;
		}
	},
	methods: {
		getProducts() {
			this.products = null;
			api.get(this.url)
				.then(r => {
					this.products = r.data;
					this.productsTotal = Number(r.headers['x-total-count']);
				});
		}
	},
	watch: {
		url() {
			this.getProducts()
		}
	},
	created() {
		this.getProducts();
	}
}
</script>

<style scoped>
.products-container {
	max-width: 1000px;
	margin: 0 auto;
}

.products {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 30px;
	margin: 30px;
}

@media screen and (max-width: 500px) {
	.products {
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 10px;
		margin: 10px;
	}
}

.product {
	box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
	padding: 10px;
	background: #fff;
	border-radius: 4px;
	transition: all .2s;
}

.product:hover {
	box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
	transform: scale(1.1);
	position: relative;
	z-index: 1;
}

.product img {
	border-radius: 4px;
	margin-bottom: 20px;
}

.product .title {
	margin-bottom: 10px;
}

.product .price {
	color: #e80;
	font-weight: bold;
}

.no-results {
	text-align: center;
}
</style>
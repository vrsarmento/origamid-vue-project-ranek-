<template>
	<section>
		<h2>Vendas</h2>
		<div v-if="sales">
			<div class="products-wrapper" v-for="(sale, index) in sales" :key="index">
				<ProductItem v-if="sale.product" :product="sale.product">
					<p class="seller"><span>Comprador: </span>{{sale.buyer_id}}</p>
				</ProductItem>
				<div class="delivery">
					<h3>Entrega: </h3>
					<ul v-if="sale.address">
						<li v-for="(value, key) in sale.address" :key="key">
							{{key}}: {{value}}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import { api } from "@/services.js";
import { mapState } from "vuex";

export default {
	name: 'UserSales',
	components: {
		ProductItem
	},
	data() {
		return {
			sales: null,
		}
	},
	computed: {
		...mapState(["user", "login"]),
	},
	methods: {
		getSales() {
			api.get(`/transaction?type=seller_id`).then(r => {
				this.sales = r.data;
			})
		}
	},
	watch: {
		login() {
			this.getSales();
		}
	},
	created() {
		if(this.login) {
			this.getSales();
		}
	}
};
</script>

<style scoped>
.product_wrapper {
	margin-bottom: 40px;
}

.seller span {
	color: #e80;
}

h2 {
	margin-bottom: 20px;
}

.delivery {
	display: grid;
	grid-template-columns: minmax(100px, 200px) 1fr;
	grid-gap: 20px;
	margin-bottom: 60px;
}

h3 {
	justify-self: end;
	margin: 0;
}

@media screen and (max-width: 500px) {
	.delivery {
		grid-template-columns: 1fr;
		grid-gap: 10px;
	}

	h3 {
		justify-self: start;
	}
}
</style>
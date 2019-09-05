<template>
	<section>
		<h2>Compras</h2>
		<div v-if="purchases">
			<p v-if="purchases.length == 0">Você ainda não vendeu nenhum produto.</p>
			<div v-else class="products-wrapper" v-for="(purchase, index) in purchases" :key="index">
				<ProductItem v-if="purchase.product" :product="purchase.product">
					<p class="seller"><span>Vendedor: </span>{{purchase.seller_id}}</p>
				</ProductItem>
			</div>
		</div>
		<PageLoading v-else/>
	</section>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import { api } from "@/services.js";
import { mapState } from "vuex";

export default {
	name: 'UserPurchases',
	components: {
		ProductItem
	},
	data() {
		return {
			purchases: null,
		}
	},
	computed: {
		...mapState(["user", "login"]),
	},
	methods: {
		getPurchases() {
			api.get(`/transaction?type=buyer_id`).then(r => {
				this.purchases = r.data;
			})
		}
	},
	watch: {
		login() {
			this.getPurchases();
		}
	},
	created() {
		if(this.login) {
			this.getPurchases();
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
</style>

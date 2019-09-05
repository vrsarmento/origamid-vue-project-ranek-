<template>
	<section>
		<h2>Endereço de Envio</h2>
		<ErrorNotification :errors="errors"/>
		<UserForm>
			<button class="btn" @click.prevent="checkOut">Finalizar Compra</button>
		</UserForm>
	</section>
</template>

<script>
import UserForm from "@/components/UserForm.vue";
import { api } from "@/services.js";
import { mapState } from "vuex";

export default {
	name: 'CheckOut',
	props: ["product"],
	components: {
		UserForm
	},
	data() {
		return {
			errors: []
		}
	},
	computed: {
		...mapState(["user"]),
		purchase() {
			return {
				buyer_id: this.$store.state.user.email,
				seller_id: this.product.user_id,
				product: this.product,
				address: {
					zipcode: this.user.zipcode,
					address: this.user.address,
					number: this.user.number,
					district: this.user.district,
					city: this.user.city,
					state: this.user.state,
				}
			}
		},
	},
	methods: {
		createTransaction() {
			return api.post("transaction", this.purchase).then(() => {
				this.$router.push({name: "user-purchases"});
			}).catch(error => {
				this.errors.push(error.response.data.message);
			});
		},
		async createUser() {
			try {
				await this.$store.dispatch("createUser", this.user);
				await this.$store.dispatch("loginUser", this.user);
				await this.$store.dispatch("getUser");
				await this.createTransaction();
			} catch(error) {
				this.errors.push(error.response.data.message);
			}
		},
		async checkOut(event) {
			this.errors = [];
			const button = event.currentTarget;
			button.value = "Finalizando...";
			button.setAttribute("disabled", "");
			if(this.$store.state.login) {
				await this.createTransaction();
			} else {
				await this.createUser();
			}
			button.value = "Finalizar Compra";
			button.removeAttribute("disabled");
		}
	}
};
</script>

<style scoped>
h2 {
	margin-top: 40px;
	margin-bottom: 20px;
}

.btn {
	background: #e80;
}
</style>
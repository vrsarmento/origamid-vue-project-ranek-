<template>
	<form>
		<template v-if="showLoginData">
			<label for="name">Nome</label>
			<input type="text" id="name" name="name" v-model="name">
			<label for="name">E-mail</label>
			<input type="email" id="email" name="email" v-model="email">
			<label for="name">Senha</label>
			<input type="password" id="password" name="password" v-model="password">
		</template>

		<label for="name">CEP</label>
		<input type="text" id="zipcode" name="zipcode" v-model="zipcode" @keyup="fillZipCode">
		<label for="name">Logradouro</label>
		<input type="text" id="address" name="address" v-model="address">
		<label for="name">Número / Compl.</label>
		<input type="text" id="number" name="number" v-model="number">
		<label for="name">Bairro</label>
		<input type="text" id="district" name="district" v-model="district">
		<label for="name">Cidade</label>
		<input type="text" id="city" name="city" v-model="city">
		<label for="name">Estado</label>
		<input type="text" id="state" name="state" v-model="state">
		
		<div class="button">
			<slot></slot>
		</div>
	</form>
</template>

<script>
import { mapFields } from "@/helpers.js";
import { getZipCode } from "@/services.js";

export default {
	name: "UserForm",
	computed: {
		...mapFields({
			fields: ["name", "email", "password", "zipcode", "address", "number", "district", "city", "state"],
			base: "user",
			mutation: "UPDATE_USER"
		}),
		showLoginData() {
			return !this.$store.state.login || this.$route.name === "user-edit";
		}
	},
	methods: {
		fillZipCode() {
			const zipcode = this.zipcode.replace(/\D/g, "");
			if(zipcode.length === 8) {
				getZipCode(zipcode).then(r => {
					this.address = r.data.logradouro;
					this.district = r.data.bairro;
					this.city = r.data.localidade;
					this.state = r.data.uf;
				})
			}
		}
	}
}
</script>

<style scoped>
form {
	display: grid;
	grid-template-columns: 90px 1fr;
	align-items: center;
}

.button {
	grid-column: 2;
	margin-top: 10px;
}
</style>
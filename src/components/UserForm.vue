<template>
	<form>
		<label for="name">Nome</label>
		<input type="text" id="name" name="name" v-model="name">
		<label for="name">E-mail</label>
		<input type="email" id="email" name="email" v-model="email">
		<label for="name">Senha</label>
		<input type="password" id="password" name="password" v-model="password">
		<label for="name">CEP</label>
		<input type="text" id="zipcode" name="zipcode" v-model="zipcode">
		<label for="name">Rua</label>
		<input type="text" id="address" name="address" v-model="address">
		<label for="name">Número</label>
		<input type="text" id="number" name="number" v-model="number">
		<label for="name">Cidade</label>
		<input type="text" id="nacityme" name="city" v-model="city">
		<label for="name">Estado</label>
		<input type="text" id="state" name="state" v-model="state">
		
		<div class="button">
			<slot></slot>
		</div>
	</form>
</template>

<script>
import { mapFields } from "@/helpers.js";

export default {
	name: "UserForm",
	computed: {
		...mapFields({
			fields: ["name", "email", "password", "zipcode", "address", "number", "city", "state"],
			base: "user",
			mutation: "UPDATE_USER"
		}),
	}
}
</script>

<style scoped>
form {
	display: grid;
	grid-template-columns: 80px 1fr;
	align-items: center;
}

.button {
	grid-column: 2;
	margin-top: 10px;
}
</style>
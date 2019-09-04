<template>
	<form class="add-product">
		<label for="name">Nome</label>
		<input type="text" id="name" name="name" v-model="product.name">
		<label for="price">Preço (R$)</label>
		<input type="number" id="price" name="price" v-model="product.price">
		<label for="photos">Fotos</label>
		<input type="file" id="photos" name="photos" ref="photos" multiple>
		<label for="description">Descrição</label>
		<textarea id="description" name="description" v-model="product.description"></textarea>

		<input type="button" value="Adicionar produto" @click.prevent="addProduct" class="btn">
	</form>
</template>

<script>
import { api } from "@/services.js";

export default {
	name: 'ProductAdd',
	data() {
		return {
			product: {
				name: "",
				price: "",
				description: "",
				photos: null,
				sold: "false"
			}
		}
	},
	methods: {
		formatProduct() {
			const form = new FormData();
			const files = this.$refs.photos.files;
			for(let i = 0; i < files.length; i++) {
				form.append(files[i].name, files[i]);
			}
			form.append("name", this.product.name);
			form.append("price", this.product.price);
			form.append("description", this.product.description);
			form.append("sold", this.product.sold);
			form.append("user_id", this.$store.state.user.id);
			return form;
		},
		async addProduct(event) {
			const product = this.formatProduct();
			const button = event.currentTarget;
			button.value = "Adicionando...";
			button.setAttribute("disabled", "");

			await api.post("/product", product);
			await this.$store.dispatch("getUserProducts");
			
			button.value = "Adicionar Produto";
			button.removeAttribute("disabled");
		}
	}
};
</script>

<style scoped>
.add-product {
	display: grid;
	grid-template-columns: 100px 1fr;
	align-items: center;
	margin-bottom: 60px;
}

.btn {
	grid-column: 2;
}
</style>

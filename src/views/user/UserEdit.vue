<template>
	<section>
		<h2>Editar Usuário</h2>
		<UserForm>
			<button @click.prevent="updateUser" class="btn">Salvar</button>
		</UserForm>
	</section>
</template>

<script>
import UserForm from "@/components/UserForm.vue";
import { api } from "@/services.js";

export default {
	name: 'UserEdit',
	components: {
		UserForm
	},
	methods: {
		updateUser() {
			api.put(`/user/${this.$store.state.user.id}`, this.$store.state.user).then(() => {
				this.$store.dispatch("getUser");
			}).catch(error => {
				//console.log(error.response);
			});
		}
	}
};
</script>

<style scoped>
h2 {
	margin-bottom: 40px;
}
</style>

<template>
	<section>
		<h2>Editar Usuário</h2>
		<UserForm>
			<button @click.prevent="updateUser" class="btn">Salvar</button>
		</UserForm>
		<ErrorNotification :errors="errors"/>
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
	data() {
		return {
			errors: []
		}
	},
	methods: {
		updateUser() {
			this.errors = [];
			api.put(`/user`, this.$store.state.user).then(() => {
				this.$store.dispatch("getUser", this.$store.state.user.id);
			}).catch(error => {
				this.errors.push(error.response.data.message);
				this.$store.dispatch("getUser", this.$store.state.user.id);
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

<template>
	<section>
		<h2>Crie a sua Conta</h2>
		<transition mode="out-in">
			<button v-if="!create" @click="create = true" class="btn">Criar Conta</button>
			<UserForm v-else>
				<button class="btn btn-form">Criar Usuário</button>
			</UserForm>
		</transition>

	</section>
</template>

<script>
import UserForm from "@/components/UserForm.vue";

export default {
	name: "LoginCreate",
	data() {
		return {
			create: false,
		}
	},
	components: {
		UserForm
	}
}
</script>

<style scoped>
h2 {
	text-align: center;
	margin-top: 40px;
	margin-bottom: 10px;
}

.btn {
	width: 100%;
	max-width: 300px;
	margin-left: auto;
	margin-right: auto;
}

.btn-form {
	max-width: 100%;
}
</style>
<template>
	<section class="user">
		<nav class="sidenav">
			<ul>
				<li>
					<router-link :to="{name: 'user'}">Produtos</router-link>
				</li>
				<li>
					<router-link :to="{name: 'user-purchases'}">Compras</router-link>
				</li>
				<li>
					<router-link :to="{name: 'user-sales'}">Vendas</router-link>
				</li>
				<li>
					<router-link :to="{name: 'user-edit'}">Editar usuário</router-link>
				</li>
				<li>
					<button @click.prevent="logout" class="btn">Sair</button>
				</li>
			</ul>
		</nav>

		<transition mode="out-in">
			<router-view></router-view>
		</transition>
	</section>
</template>

<script>
export default {
	name: "User",
	methods: {
		logout() {
			this.$store.dispatch("logOutUser");
			this.$router.push({name: "login"});
		}
	}
}
</script>

<style>

</style>
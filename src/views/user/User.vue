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
					<button @click="logout">Sair</button>
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
			this.$store.dispatch("logoutUser");
			this.$router.push({name: "login"});
		}
	},
	created() {
		document.title = "Ranek - Página do Usuário";
	}
}
</script>

<style scoped>
.user {
	display: grid;
	grid-template-columns: minmax(140px, 200px) 1fr;
	grid-gap: 30px;
	max-width: 900px;
	margin: 40px auto;
	padding: 20px;
}

@media screen and (max-width: 500px) {
	.user {
		grid-template-columns: 1fr;
		margin: 0 auto;
	}
}

.sidenav a,
.sidenav button {
	padding: 10px;
	display: block;
	color: #345;
	background: #f4f7fc;
	margin-bottom: 10px;
	border-radius: 4px;
}

.sidenav a.router-link-exact-active,
.sidenav a:hover,
.sidenav button:hover {
	background: #87f;
	color: #fff;
}

.sidenav button {
	border: none;
	width: 100%;
	font-size: 1rem;
	text-align: left;
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	cursor: pointer;
}
</style>
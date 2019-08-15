<template>
	<form>
		<input type="text" name="search" id="search" v-model="search">
		<input type="submit" id="magnifier" value="Buscar" @click.prevent="searchProducts">
	</form>
</template>

<script>
export default {
	data() {
		return {
			search: null
		}
	},
	methods: {
		searchProducts() {
			this.$router.push({query: {
				q: this.search
			}});
		}
	}
}
</script>

<style>

</style>
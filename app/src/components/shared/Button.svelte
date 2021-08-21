<script lang="ts">
	export let text: string;
</script>

<button on:click>{text}</button>

<style lang="scss">
	button {
		cursor: pointer;
		transition: all 250ms;

		height: 56px;
		width: 240px;

		background: #c82e53;
		box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.25);
		border-radius: 12px;
		// border: 2px solid white;
		border: none;

		color: white;
		font-size: 1.5em;
		font-weight: 600;

		&:hover {
			background: #be274a;
			box-shadow: 0px 2px 4px 4px rgba(0, 0, 0, 0.3);
		}
	}
</style>

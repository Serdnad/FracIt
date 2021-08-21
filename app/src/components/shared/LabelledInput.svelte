<script lang="ts">
	export let label: string;
	export let placeholder: string;
	export let hint: string | undefined;
</script>

<div>
	<p>{label}</p>
	<input {placeholder} />

	{#if hint}
		<p class="hint">{hint}</p>
	{/if}
</div>

<style lang="scss">
	div {
		text-align: start;
	}

	p {
		color: white;
		font-size: 1.25em;
		font-weight: 600;
		margin-bottom: 4px;
	}

	input {
		color: white;
		background: rgba(0, 0, 0, 0.2);
		border: 2px solid #ffffff;
		box-sizing: border-box;
		border-radius: 6px;
		height: 32px;
		width: 100%;

		:focus,
		:active,
		:hover {
			border: none;
		}
		// width: 240px;
	}

	.hint {
		color: #cccccc;
		font-size: 0.8em;
		font-weight: 400;

		margin-top: 4px;
		width: 100%;
	}
</style>

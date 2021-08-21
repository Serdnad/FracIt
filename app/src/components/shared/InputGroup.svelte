<script lang="ts">
    export let label: string
</script>

<div>
    <p>{label}</p>
    <slot />
</div>

<style lang="scss">
    div {
        margin-bottom: 12px;
    }

	p {
		color: white;
		font-size: 1.25em;
		font-weight: 600;
		margin-bottom: 4px;
        text-align: start;
        margin: 0 0 -8px 0;
	}
</style>
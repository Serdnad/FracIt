<script lang="ts">
    export let visible = false
    export let title: string
    export let body: string
</script>

{#if visible}
    <div class="background" on:click={() => visible = false}>
        <div class="popup" on:click={(e) => e.stopPropagation()}>
            <h2>{title}</h2>
            <p>{body}</p>

            <div class="accent"/>
        </div>
    </div>
{/if}

<style lang="scss">
    .background {
        z-index: 1000;
        transition: all 0.3s;

        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000000cc;
    }

    .popup {
        position: relative;
        background: white;
        margin: 64px auto;
        padding: 32px 32px;
        width: 400px;
        border-radius: 12px;

        .accent {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;

            height: 32px;
            background: green;
            border-radius: 12px 12px 0 0;
        }
    }
</style>
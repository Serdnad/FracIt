<script lang="ts">
    export let title: string
    export let body: string
</script>

<div>
    <h4>{title}</h4>
    <p>{body}</p>
</div>

<style lang="scss">
    div {
        width: 100%;
        text-align: start;
    }

    h4 {
        color: white;
        font-size: 22px;
        margin-bottom: 0;
    }
    p {
        color: white;
        font-size: 14px;
        margin-top: 4px;
    }
</style>

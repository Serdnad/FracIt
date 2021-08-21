<script lang="ts">
    import { Page, page } from "../../stores/navigation";

    function navigate(to: Page) {
        page.set(to)
        window.history.pushState("", to.valueOf(), to.valueOf())
    }
</script>

<header>
  <div class="logo">
      <img src="images/logo.svg" alt="logo" />
      <h1>Frac It</h1>
  </div>

  <nav>
      <a on:click={() => navigate(Page.fractionalize)}>Fractionalize</a>
      <a on:click={() => navigate(Page.redeem)}>Redeem</a>
      <a on:click={() => navigate(Page.about)}>About</a>
  </nav>
</header>

<style lang="scss">header {
  display: flex;
  justify-content: space-between;

  background: rgba(37, 4, 64, 0.37);

  .logo {
      display: flex;
      align-items: center;
      margin-left: 16px;

      h1 {
          margin: 0px;
          color: white;
          font-size: 1.75em;
          font-weight: 600;
          margin-left: 16px;
      }
  }

  nav {
      display: flex;

      h1 {
          font-size: medium;
      }

      a {
          cursor: pointer;
          color: white;
          font-size: 18px;
          font-weight: 600;
          text-decoration: none;
          padding: 0.5em 1em;
          margin: 0.5em 1em;
      }
  }
}</style>
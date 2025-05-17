<script>
    import bmtLogo from './assets/bmtlogo1.png'
    import { ClerkProvider, SignIn, UserButton, SignedIn, SignedOut} from './lib/clerk/index.js';

    let url = new URL(window.location);
    let page = url.pathname;
</script>

<main>
  <ClerkProvider />
  <span style="float: right;">
  <UserButton
    userProfileMode="modal"
  />
  </span>
  <span class="heading">
    <div style="width: 25%;">
      <a href="https://www.badmovietwins.com" target="_blank" rel="noreferrer">
        <img src={bmtLogo} class="logo bmt" alt="BMT Logo" />
      </a>
    </div>
    <h1 style="width: 50%;">BMT Cycles</h1>
    <h1 style="width: 25%;"></h1>
  </span>
  <SignedOut>
    <SignIn />
  </SignedOut>
  <SignedIn>
  <span class="mean">
  <a class="btn" href="/wiki"><button>Wikipedia</button></a>
  </span>
  </SignedIn>
</main>

<style>
  .logo {
    height: 100px;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo.bmt:hover {
    filter: drop-shadow(0 0 2em #117bb7aa);
  }
  .heading {
    display: flex;
    justify-content: space-between;
    width: 825px;
    margin: 0 auto;
  }
</style>

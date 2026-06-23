<script lang="ts">
  import RegistrationForm from '../../components/RegistrationForm.svelte';
</script>

<svelte:head>
  <title>Register — BEEE Spectacular Chess Championship</title>
  <meta name="description" content="Register your child for the BEEE T.E.A.M.U.P. programme and Spectacular Chess Championship." />
</svelte:head>

<div class="register-page">
  <div class="container" style="padding-top: 96px; padding-bottom: 64px">
    <RegistrationForm />
  </div>
</div>

<style>
  .register-page {
    min-height: 100vh;
    background: var(--canvas);
  }
  .container {
    width: min(1200px, calc(100% - 48px));
    margin: 0 auto;
  }

</style>

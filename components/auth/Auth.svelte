<script>
  import { onMount } from 'svelte';
  import PocketBase from 'pocketbase';
  import appRouteStore from '$lib/stores/appRouteStore';
  import Loading from '$lib/ui/Load1.svelte';

  let pb;
  let username = '';
  let password = '';
  let isAuthenticated = false;
  let isAuthorized = false;
  let isLoading = false; // Set initially to false
  let errorMessage = '';
  let authData;

  onMount(async () => {
    pb = new PocketBase('https://appz.pockethost.io/');
    isAuthenticated = Boolean(localStorage.getItem('auth'));
    isAuthorized = Boolean(localStorage.getItem('authorized'));
  });

  async function loginWithCredentials() {
    isLoading = true;
    
    logout();
    console.log('Start Fresh');

    errorMessage = '';
    try {
      const authRecord = await pb.collection('users').authWithPassword(username, password);
      if(authRecord) {
        // Enrich the authRecord with appRoute details
        // Ensure that route_access is defined and is an array before attempting to map over it
        if (Array.isArray(authRecord.record.route_access)) {
          const enrichRoutes = await appRouteStore.enrichRouteAccess(authRecord.record.route_access);
          authRecord.record.route_access_details = enrichRoutes;
        } else {
          console.error('Route access details are missing or not in the expected format', authRecord.record.route_access);
          // Consider how you'd like to handle this error. For now, setting it to an empty array.
          authRecord.record.route_access_details = [];
        }

        const timestamp = new Date().toISOString();

        const authDataWithTimestamp = { ...authRecord, timestamp };
        localStorage.setItem('auth_data', JSON.stringify(authDataWithTimestamp));
        localStorage.setItem('auth', 'true');
        localStorage.setItem('authorized', 'true');

        isAuthenticated = true;
        isAuthorized = true;
        authData = JSON.parse(localStorage.getItem('auth_data'));
      } else {
        errorMessage = 'E-mail of wachtwoord onjuist!';
      }
    } catch (error) {
      console.error('Error during login:', error);
      errorMessage = 'Er is een probleem opgetreden tijdens het inloggen.';
    } finally {
      isLoading = false;
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_data');
    localStorage.removeItem('auth');
    localStorage.removeItem('authorized');
  };
</script>

{#if isLoading && !isAuthenticated}
  <div class="uk-flex uk-flex-center">
    <Loading />

    <a href="#logout" class="uk-icon-link uk-margin-small-right"
      style="position:absolute;top:12px;right:12px;z-index:1999;"
      uk-icon="sign-out"
      on:click|preventDefault={logout} uk-tooltip="title: Log uit; pos: top">
    </a>

  </div>
{:else}
  {#if !isAuthenticated && !authData}
    <div class="uk-section uk-section-muted uk-flex uk-flex-middle uk-animation-fade" uk-height-viewport>
      <div class="uk-width-1-1">
        <div class="uk-container">
          <div class="uk-grid-margin uk-grid uk-grid-stack" uk-grid>
            <div class="uk-width-1-1@m">
              <div class="uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large">
                <h3 class="uk-card-title uk-text-center">Welkom terug!</h3>
                <p class="uk-text-center">Log hier in op onze rapportage hub.</p>
                <br />
                <form on:submit|preventDefault={loginWithCredentials}>
                  <div class="uk-margin">
                    <div class="uk-inline uk-width-1-1">
                      <input class="uk-input" bind:value={username} type="email" name="email" placeholder="naam@domein.nl" required>
                    </div>
                  </div>
                  <div class="uk-margin">
                    <div class="uk-inline uk-width-1-1">
                      <input class="uk-input" bind:value={password} type="password" name="password" placeholder="Type hier je wachtwoord" required>
                    </div>
                  </div>
                  <div class="uk-margin">
                    <button class="uk-button uk-button-primary uk-button-large uk-width-1-1">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p>{errorMessage}</p>
  {:else if isAuthenticated && !isAuthorized}
    <div class="uk-flex uk-flex-center">
      <div class="uk-card uk-card-default uk-card-body" style="margin-top:10%;text-align:center;">
        <h4 style="font-size:1em !important;">Je account is nog niet geautoriseerd door de beheerder.</h4>
        <p>Je hebt pas toegang nadat dit verleend is.</p>
      </div>
    </div>
  {:else if isAuthorized}
    <div>
      <slot />
    </div>
  {/if}
{/if}

<style>
input::placeholder {
  font-size: 0.8em; 
  transition: opacity 0.3s ease; /* Smooth transition for opacity change */
}

/* Make placeholder invisible on input focus */
input:focus::placeholder {
  opacity: 0;
}
</style>

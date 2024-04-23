<script>
  import { onMount } from 'svelte';
  import { dataStore } from '$lib/stores/dataStore.js';
  import NavMenu from "$lib/ui/NavMenu.svelte";
  import { EvidenceDefaultLayout } from '@evidence-dev/core-components';
  import '@evidence-dev/tailwind/fonts.css';
  import '../app.css';
  import "$lib/uikit-3.17.11/css/uikit.min.css";
  import "$lib/uikit-3.17.11/js/uikit.min.js";
  import "$lib/uikit-3.17.11/js/uikit-icons.min.js";
  import "$lib/css/style.css";
  import "$lib/css/accordion_table.css";
  import Loading from "$lib/ui/Load1.svelte";
  
  export let data;
  let isLoading = true; // Initialize loading state

  const performAuthCheck = async () => {
    dataStore.set(data);
    console.log('data:', data);
    isLoading = false; // Updates the loading state after method execution
  };

  onMount(() => {
    performAuthCheck();
  });
</script>

<svelte:head>
	<title>Patrick Tehubijuluw</title>
</svelte:head>

{#if isLoading}
  <Loading />
{:else}

    <EvidenceDefaultLayout {data}
      title='PTW'
      neverShowQueries=true
      fullWidth=true
      githubRepo='https://github.com/hoipippeloi/patrick.te9.nl'
      hideSidebar=true
      builtWithEvidence=true
      maxWidth=1440
      >

      <NavMenu {data} />
      <slot slot="content" />
    </EvidenceDefaultLayout>

{/if}

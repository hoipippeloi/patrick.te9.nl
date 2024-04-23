<script>
    import { dataStore } from '$lib/stores/dataStore.js';
    import { onDestroy, onMount } from 'svelte';

    let localData;

    // Subscribe to the store
    const unsubscribe = dataStore.subscribe(data => {
        localData = data; // Assign it to a local variable for use within this component
    });

    let routes = localData.pagesManifest.children;

    //console.log('routes', routes);

    // Clean up the subscription
    onDestroy(() => {
        unsubscribe(); // Unsubscribe when the component is destroyed to avoid memory leaks
    });

    function capitalizeFirstLetter(string) {
        if (!string) return string; // Return the original string if it's falsy (e.g., "", null, undefined)
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let authData;
    let routeRefs;
    let userRole;

    onMount(async () => {
        authData = JSON.parse(localStorage.getItem('auth_data'));
        //console.log('authDataOnNav:', authData);

        routeRefs = authData.record.route_access_details.map(item => item.route);
        //console.log('routeRefs:', routeRefs);

        userRole = authData.record.role;
    });


</script>
<!--
<button class="uk-button uk-button-default" type="button" uk-toggle="target: #offcanvas-nav">Default Nav</button>
<a href="#" class="uk-icon-link uk-margin-small-right" uk-icon="copy"></a>
<a style="position:absolute;top:6px;left:6px;z-index:1999;" href class="uk-icon-button uk-margin-small-right" uk-toggle="target: #offcanvas-nav" uk-icon="instagram"></a>
-->

<span style="position:fixed;top:14px;left:14px;" 
    class="uk-icon-link uk-margin-small-right print-hide" 
    uk-toggle="target: #offcanvas-nav" 
    uk-icon="grid" uk-tooltip="title: Bekijk hier de inhoudsopgave; pos: top">
</span>

{#if routes && routeRefs && userRole}

<div id="offcanvas-nav" uk-offcanvas="overlay: true; mode: slide;">
    <div class="uk-offcanvas-bar">
        <h4>Table of Content</h4>
        <hr />
        <ul class="uk-nav uk-nav-default" uk-nav>
            {#each routes as item}
                {#if item.children.length === 0 && item.label != '403'}
                    <li><a href={item.href}>{capitalizeFirstLetter(item.label)}</a></li>
                {/if}
                {#if item.children.length > 0}
                    <li class="uk-parent">
                        <a href="javascript:void(0)">{capitalizeFirstLetter(item.label)} <span uk-nav-parent-icon></span></a>
                        <ul class="uk-nav-sub">
                            {#each item.children as child}
                                {#if child.label}
                                    <li><a href={child.href}>{capitalizeFirstLetter(child.label)}</a></li>
                                {/if}
                            {/each}
                        </ul>
                    </li>
                {/if}
            {/each}
        </ul>
        <button class="uk-offcanvas-close" type="button" uk-close></button>
    </div>
</div>


{/if}

<style>
span.uk-icon-link {
    z-index:999 !important;
    cursor: pointer;
}
@media print {
    .print-hide {
        display: none !important;
    }
}
</style>
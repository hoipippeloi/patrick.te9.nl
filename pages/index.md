---
title: My Hub
hide_title: true
---

```recs
select * from csv_data.home
```

{#if recs && recs.length > 0}

    <div uk-tooltip="title: Find more info using the nav menu.">

        <h1><Value data={recs.filter(item => item.key === 'Title')} column=value /></h1>

        <Value data={recs.filter(item => item.key === 'About')} column=value />

        <br /><br /><br /><br />
        <div class="uk-background-contain uk-height-large uk-panel uk-flex uk-flex-center uk-flex-middle uk-width-3-5@m uk-width-1-1@s" 
        style="background-image: url(/img/business-analytics.gif);">
            <p class="uk-h4"></p>
        </div>

    </div>

{:else}
<p>Loading data...</p>
{/if}

<style>
span.big {
    font-size:2em;
    color:#222;
    font-weight:bold;
}
span.small {
    font-size:0.6em;
    color:#c0c0c0;
}
h1 {
    font-family: 'Inter', 'Arial', sans-serif !important;
    font-size:3em !important;
}
</style>
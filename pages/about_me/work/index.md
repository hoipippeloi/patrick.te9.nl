<script>

    import Loading from "$lib/ui/Load1.svelte";

    function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getUTCMonth() + 1),
        day = '' + d.getUTCDate(),
        year = d.getUTCFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
    }

</script>

```work
select * from csv_data.experience
```

# My past experiences
Below you can find a timeline of my past work experiences and employers.
<hr />

{#if work && work.length > 0}

{#each work as work}

    <article class="uk-article">
    {#if work.logo_url && work.logo_url.length > 6}<img class="logo" src="{work.logo_url}" alt="{work.employer}" />{/if}

        <h1 class="uk-article-title">{work.job_title}</h1>
        <h2><span uk-icon="icon: home; ratio: 0.8"></span> {work.employer}</h2>
        
        <p class="uk-article-meta">From {formatDate(work.start_date)} till {formatDate(work.end_date)}</p>

        <p class="uk-text-lead">{work.description}</p>
        
            {#if work.employer_url && work.employer_url.length > 6}
            <div>
                <a class="uk-button uk-button-text uk-align-right" href="#">Visit &rarr; {work.employer_url}</a>
                <br />
            </div>
            {/if}

        <hr />

    </article>

{/each}

{:else}
    <Loading />
{/if}

<style>
h1.uk-article-title {
    font-size:2.5em !important;
    margin:5px 0 !important;
}
h2 {
    font-size:1.8em !important;
    margin:5px 0 !important;
}
a.link {
    float:right;
}
.logo {
    float:right;
    position:relative;
    top:10px;
    height:40px;
}
</style>
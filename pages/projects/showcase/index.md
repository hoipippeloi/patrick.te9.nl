<script>

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

```projects
select * from csv_data.showcase
```

# Projects
<p>Here are a few projects I published online that are relevant to this showcase.</p>
<hr />

{#if projects && projects.length > 0}

    {#each projects as pr}

        <article class="uk-article">

            <h1 class="uk-article-title">{pr.title}</h1>
            <hr />
            <div class="uk-cover-container">
                <canvas width="400" height="610"></canvas>
                <img src="{pr.image_url}" alt="" uk-cover>
            </div>
            <hr />
            <p class="uk-text-lead">{pr.description}</p>
            
            <div>
                <a class="uk-button uk-button-text uk-align-right" target="_blank" href="{pr.url}">Visit &rarr; {pr.title}</a>
                <br />
            </div>


            <hr />

        </article>

    {/each}

{:else}
<p>Loading data...</p>
{/if}

<style>
h1.uk-article-title {
    font-size:2em !important;
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
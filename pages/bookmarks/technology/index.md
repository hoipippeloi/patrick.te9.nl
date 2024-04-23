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

```tech
select * from csv_data.tech_bookmarks
where tags is not null
and cover is not null
```

# Bookmarks
<p>Here are a bunch of tech bookmarks I have been collecting over the years. All these bookmarks sounded interesting at that point in time. I still maintain this collection because of my interest in technology. I want to keep up with the market week over week to see what is new.</p>

<iframe style="border: 0; width: 100%; height: 610px;" allowfullscreen frameborder="0" src="https://raindrop.io/Creatuluw/digital-products-21185539/embed"></iframe>

<!--
<div class="uk-child-width-1-4@m uk-grid-small" uk-grid="masonry: pack">
{#each tech as te}
    <div>
        <a href="{te.url}" target="_blank">
        <div class="uk-card uk-card-hover uk-card-default">
            <div class="uk-card-media-top" style="height:150px;">
                <img src="{te.cover}" width="100%" height="150" alt="">
            </div>
            <div class="uk-card-body">
                <h3 class="uk-card-title">{te.title}</h3>
                <p>{te.excerpt}</p>
            </div>
        </div>
        </a>
    </div>
{/each}
</div>
-->

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
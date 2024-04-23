```music
with cte as (
SELECT
    to_timestamp(CAST(date_uts AS BIGINT)) AS listen_date,
    last_day(CAST(to_timestamp(CAST(date_uts AS BIGINT)) AS TIMESTAMP)) AS month_date,
    *
FROM csv_data.last_fm_tracks
)
select *, left(listen_date,4)::integer as year from cte
```

```trend_totals
SELECT
    month_date,
    COUNT(*) AS tracks,
    AVG(COUNT(*)) OVER (
        ORDER BY month_date 
        ROWS BETWEEN 5 PRECEDING AND CURRENT ROW
    ) AS six_month_rolling
    
FROM ${music}
GROUP BY 1
ORDER BY 1
```

```artist_totals
SELECT
    artist_text as artist,
    COUNT(*) AS tracks

FROM ${music}
GROUP BY 1
ORDER BY 1
```

```top20_artists
SELECT
    artist_text as artist,
    COUNT(*) AS tracks

FROM ${music}
GROUP BY 1
ORDER BY 2 desc
LIMIT 20
```

```years
select distinct year as yr FROM ${music}
```

```yearly_top10
WITH RankedMusic AS (
  SELECT
    year,
    artist_text AS artist,
    COUNT(*) AS tracks,
    RANK() OVER (PARTITION BY year ORDER BY COUNT(*) DESC) as rank
  FROM ${music}
  GROUP BY year, artist_text
)
SELECT
    year,
    artist,
    tracks
FROM RankedMusic
WHERE rank <= 10
ORDER BY year DESC, rank ASC
```

# My Music
<p>I really enjoy listening to music. Most of the times when people ask you 'What music do you listen to?', then coming up with one simple answer isn't really enough, don't you think? So below you will find a bit more info on the topic.</p>

<hr />

{#if music && music.length > 0 && yearly_top10 && yearly_top10.length > 0}

#### Listening trends
<p>How many tracks do I listen to on a monthly basis?</p>

<LineChart 
    data={trend_totals}  
    x="month_date"
    y={["tracks", "six_month_rolling"]}
    markers=true
    markerShape=emptyCircle
    markerSize=7
    chartAreaHeight=320
    colorPalette={
        [
        '#FE6C2D',
        '#aaa',
        '#333',
        ]
    }
/>

<hr />

#### Top 20 artists of all time
<p>Which artists did I listen to most from 2014 untill now?</p>

<BarChart 
    data={top20_artists}
    x=artist 
    y=tracks 
    swapXY=true
    chartAreaHeight=320
    labels-=true
    colorPalette={
        [
        '#777',
        '#aaa',
        '#333',
        ]
    }
/>

<hr />

<Grid cols=2>
{#each years as year}

<div class="uk-width-1-1">

#### Top 10 &rarr; {year.yr}

    <BarChart 
        data={yearly_top10.filter(item => item.year === year.yr)}
        x=artist 
        y=tracks 
        swapXY=true
        chartAreaHeight=320
        labels-=true
        colorPalette={
            [
            '#777',
            '#aaa',
            '#333',
            ]
        }
    />
<hr />
</div>

{/each}
</Grid>

{:else}
<p>Loading data...</p>
{/if}

<!--
<div>
    <DataTable data={music} />
</div>
-->
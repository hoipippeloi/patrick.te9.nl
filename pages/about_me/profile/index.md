```recs
select * from csv_data.profile
```

```about_me
select * from csv_data.about
```

# About me

At my core, I possess a genuine passion for transforming data into meaningful insights. This is a conviction that navigating the complex world of data-driven solutions demands a multifaceted approach, one that requires both dedication and a profound understanding of the nuances involved. It’s about appreciating the craft that goes into making informed learning and decision-making tools, a journey I find both challenging and rewarding.

Crafting the perfect solution is pretty much like piecing together a detailed puzzle. It's all about a deep dive into how we handle and make sense of data, which then allows us to piece together all the happenings and bits of information. Approaching this from a big-picture angle ensures we don't miss out on anything crucial. As a data architect and developer who loves digging into data and analytics, I always aim to get the full story and the logic that holds it together. This bigger-picture way of thinking helps me to shape analyses that guide us from the general down to the nitty-gritty, ending up with a clear and cohesive story or conclusion.

<hr />

# My Beliefs

**Adoption** hinges on the user experience. Without clarity and ease of use, even the most sophisticated tool loses its value.

**Design** decisions should be informed by a thorough understanding of the data's underlying logic. Without this groundwork, we cannot hope to unravel the story the data is telling us.

**Starting with the End in Mind** reminds us that data's real worth is revealed in its ability to facilitate learning and decision-making. Drawing meaningful conclusions is the first step in crafting effective designs.

**Simplicity** should be our guiding principle. The notion that complexity is inevitable is a challenge to be embraced, with the aim of pivoting towards simplicity in our designs and solutions.

**Encouraging Curiosity** acknowledges that we're often unaware of our own blind spots. By fostering a culture of exploration and experimentation, we open doors to new insights and perspectives.

**Valuing Time** underpins everything we do. In a world where the demand for time far outstrips supply, the importance of keeping our deliverables concise and on point cannot be overstated.

This ethos not only defines my approach to data and analytics but also serves as the foundation for cultivating meaningful and impactful solutions. I carry these things into any end-to-end solution, backend to frontend.

<hr />

# General info

<Grid cols=2>
    <Grid cols=2>

        <BigValue 
        data={recs.filter(item => item.key === 'Name')}
        title='Name'
        value=value
        />

        <BigValue 
        data={recs.filter(item => item.key === 'Email')}
        title='Email'
        value=value
        />

        <BigValue 
        data={recs.filter(item => item.key === 'Phone')}
        title='Phone'
        value=value
        />

        <BigValue 
        data={recs.filter(item => item.key === 'City')}
        title='City'
        value=value
        />

        <BigValue 
        data={recs.filter(item => item.key === 'Country')}
        title='Country'
        value=value
        />

        <BigValue 
        data={recs.filter(item => item.key === 'Kids')}
        title='Kids'
        value=value
        />

    </Grid>

    <div class="uk-width-1-1">
        <iframe width="100%" height="480" src="https://www.openstreetmap.org/export/embed.html?bbox=6.857936382293701%2C53.10147117747983%2C6.893770694732666%2C53.11293567936491&amp;layer=transportmap&amp;marker=53.10720381043257%2C6.875853538513184" style="border: 1px solid black"></iframe>

        <small><a target="_blank" href="https://www.openstreetmap.org/#map=12/53.0806/6.8390">View Larger Map</a></small>
    </div>
</Grid>




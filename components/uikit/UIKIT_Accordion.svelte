<script>
    export let title;
    export let multiple = true;
</script>

<div class={`uk-accordion ${multiple ? 'multiple: true' : ''}`} uk-accordion>
    <li>
        <a class="uk-accordion-title" href>
            <!--<span uk-icon="icon: triangle-down; ratio: 0.9" style="float:right;color:#999;margin-top:5px;"></span>-->
            <h3>
                {title}
            </h3>
        </a>
        <div class="uk-accordion-content">
            <slot></slot>
        </div>
    </li>
</div>

<style>
a.uk-accordion-title {
    color: #111;
    border-bottom: 1px solid #ccc;
    padding: 8px;
    background: #fff;
}
.uk-accordion-content {
    margin-bottom:40px !important;
    border-bottom: 1px solid #eee;
}
h3 {
    font-size: 1em !important;
    color:#777;
    padding-top:6px;
}
a:hover {
    background-color: #fafafa;
}
</style>

<!--
    Usage:

    <Collapse multiple={true} title="Data">
    </Collapse>
-->
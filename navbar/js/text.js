const textBlocks = {
    'id-start': '\
    <p>\
        <b>nav.css</b> lets you create navigation bars/menubars at the top of your HTML page and sidebars using CSS and Javascript.\
        It avoids using generic div tags and instead employs custom HTML elements like &lt;drop&gt; and &lt;down&gt; for a more semantic approach.\
    </p>\
    <p>\
        To use nav.css, simply copy the css into your project or insert <a href="https://mo-hi.github.io/navbar/css/navColors.css"> nav.css </a> into your HTML page.\
        Colors are defined in a separate <a href="https://mo-hi.github.io/navbar/css/navColors.css"> navColors.css </a>.\
    </p>\
    <codeblock><pre>\
    &lt;link rel="stylesheet" href="https://mo-hi.github.io/navbar/css/nav.css"&gt;\n\
    &lt;link rel="stylesheet" href="https://mo-hi.github.io/navbar/css/navColors.css"&gt;</pre>\
    </codeblock>\
    <br>\
    <p>\
        In your HTML, you can create your personalized navbar or sidebar, where the menu items are represented by &lt;a&gt; elements (or &lt;li&gt elements in case of a sidebar).\
        Use each &lt;a&gt; element either as link (href) or to call a function (onclick) and remove the other attribute. If you use an &lt;a&gt; element to call a function and keep the href attribute\
        then the function call wont work.\
    </p>',


    'id-fixed': '\
        <p>\
        The navbar is inside a wrapping element with style property "position:fixed".\
        Since the width will be reduced after you added the position:fixed property. the width has to be set again.\
    </p>\
    ',

    'id-click': '\
        <p>\
        The onclick behavior is realized by the onclick="toggleDown(this) to the &lt;a&gt; element child of &lt;drop&gt;. \
        The javascript is kept to a minimum of 5 lines of code:\
    </p>\
    <codeblock><pre>\
    function toggleDown(a) {\n\
        let down = a.parentElement.querySelector("down")\n\
        down.style.display = wenn(down.style.display == "block", "none", "block")}\n\
    \n\
    function wenn(condition, trueValue, falseValue) {\n\
        return condition ? trueValue : falseValue;}</pre>\
    </codeblock>\
    ',
}
class FooterJS extends HTMLElement {
    //connectedCallback() is a reserved method, the browser calls it automatically
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <br/>
                <hr>
                <section>
                    <p>
                        Back to <a href="../index.html" class="mr-20"> mo-hi </a>  |  
                        Link to <a href="https://github.com/mo-hi/mo-hi.github.io">github repo</a>
                    </p>
                </section>
                <div class="h-30"></div>
            </footer>
        `;
    }
}

class TextareaJS extends HTMLElement {
    connectedCallback() {
        let type = this.getAttribute('type') || 'css';
        
        let content = ``; let name = ``
        if (type === 'css') {
            content = `<link rel="stylesheet" href="https://mo-hi.github.io/basis/css/b.css">\n<link rel="stylesheet" href="https://mo-hi.github.io/navbar/css/nav.css">`;
            name = `CSS`
        }    
        if (type === 'js') {
            content = `<script src="https://mo-hi.github.io/basis/js/b.js"></script>\n<script src="https://mo-hi.github.io/navbar/js/nav.js"></script>`;
            name = `JavaScript`
        }

        this.innerHTML = `
            <p class="m-0 mb-5i">
                ${name} of THIS navbar:
            </p>
            <div class="h-100 w-80 js-fill mb-20i">
                <textarea class="code" spellcheck="false" style="width: 100%; height: 100%;">${content}</textarea>
            </div>
        `;
    }
}

customElements.define('footer-js', FooterJS);
customElements.define('textarea-js', TextareaJS);
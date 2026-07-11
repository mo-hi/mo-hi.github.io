class FooterJS extends HTMLElement {
    connectedCallback() {
        const footer = document.createElement('footer');
        footer.innerHTML = `
            <br/>
            <hr>
            <section>
                <p>
                    Back to <a href="../index.html" class="mr-20"> mo-hi </a>  |  
                    Link to <a href="https://github.com/mo-hi/mo-hi.github.io">github repo</a>
                </p>
            </section>
            <div class="h-30"></div>
        `;

        this.replaceWith(footer);
    }
}
customElements.define('footer-js', FooterJS);



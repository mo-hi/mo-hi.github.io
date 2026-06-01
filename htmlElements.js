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

customElements.define('footer-js', FooterJS);
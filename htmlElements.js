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


class SelectionPill extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // 1. Attribute auslesen und Standardwerte festlegen
        const name = this.getAttribute('name') || 'pill-input';
        const type = this.getAttribute('type') || 'radio'; // 'radio' oder 'checkbox'
        const checkedValue = this.getAttribute('checked');
        
        // JSON-String aus dem 'options'-Attribut in ein echtes Array umwandeln
        let options = [];
        try {
            options = JSON.parse(this.getAttribute('options') || '[]');
        } catch (e) {
            console.error(`Fehler beim Parsen der Optionen für ${name}:`, e);
            return;
        }

        // 2. Das umschließende Form-Element erstellen
        const form = document.createElement('form');
        form.id = `id-form-${name}`;
        form.className = 'selection-pill mr-30';
        
        // Event-Forwarding: Wenn sich im Formular etwas ändert, 
        // rufen wir deine globale Update()-Funktion auf
        form.addEventListener('change', (event) => {
            if (typeof Update === 'function') {
                Update(event);
            }
        });

        // 3. HTML für jede Option generieren
        options.forEach((optionText, index) => {
            // Eindeutige ID für das Label-Mapping (z.B. id-slimMode-1)
            const inputId = `id-${name}-${index}`;
            
            // Input-Element erstellen
            const input = document.createElement('input');
            input.type = type;
            input.name = name;
            input.id = inputId;
            input.value = optionText.toLowerCase(); // Wert oft klein geschrieben

            // Prüfen, ob dieses Element standardmäßig ausgewählt sein soll
            // Entweder durch das 'checked'-Attribut oder standardmäßig das erste Element bei Radios
            if (checkedValue) {
                if (optionText.toLowerCase() === checkedValue.toLowerCase()) {
                    input.checked = true;
                }
            } else if (type === 'radio' && index === 0) {
                input.checked = true;
            }

            // Label-Element erstellen
            const label = document.createElement('label');
            label.setAttribute('for', inputId);
            label.innerHTML = optionText; // Erlaubt auch HTML-Entities wie &#x25BC;

            // Input und Label in das Formular einfügen
            form.appendChild(input);
            form.appendChild(label);
        });

        // 4. Das generierte Formular in das Custom Element einhängen
        this.appendChild(form);
    }
}

// Das Element im Browser registrieren
customElements.define('selection-pill', SelectionPill);
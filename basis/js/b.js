// ####################################################################################################
// region basis_basis                                                                                     #
// ####################################################################################################

/**
returns the type of a variable as a string. The following types are recognized:
 list, div, dict, str, int, float, bool, null, undefined and functions
*/
function typ(variable) {
    if (Array.isArray(variable)) {
        return 'list'} // javascript 'Array'
    if (variable instanceof HTMLElement) {
        return 'div'}
    if (typeof variable === 'object' && variable !== null) {
        return 'dict'} // javascript 'Object'
    if (typeof variable === 'string') {
        return 'str'}
    if (typeof variable === 'number') {
        return Number.isInteger(variable) ? 'int' : 'float'}
    if (typeof variable === 'boolean') {
        return 'bool'}
    if (variable === null) {
        return 'null'}
    if (variable === undefined) {
        return 'undefined'}
    if (typeof variable === 'function') {
        return 'function'}


    throw new Error('Unknown type of variable: ' + variable)
}

function typOf(variable) {return typ(variable)}

/**
is a short hand notation / better readability for 'return condition ? trueValue : falseValue';
*/
function wenn(condition, trueValue, falseValue) {
    return condition ? trueValue : falseValue;}

/**
throws an error if the condition is false
*/
function assert(condition, message) {
    if (condition) return
    if (message == undefined) message = "Assertion failed"
    
    throw new Error(message)
}


function ValidateSCHEMA(config, SCHEMA) {
    let allowedKeys = Object.keys(SCHEMA)

    for (let key of Object.keys(config)) {
        if (!allowedKeys.includes(key)) {
            console.log("Key not allowed in config: " + key)
            return false;}

        if (typOf(config[key]) != SCHEMA[key].typOf) {  
            console.log("Key " + key + " has wrong type. Expected: " + SCHEMA[key].typOf + ", found: " + typOf(config[key]))
            return false;}
    }

    for (let key of allowedKeys) {
        if (SCHEMA[key].required && config[key] === null) {     // null includes undefined, but not vice versa
            console.log("Key " + key + " is required but not provided.")
            return false;
        }
    }
    return true;
}


/**
returns true if all values are equal
 */
function allEqual(...values) {
    return values.every(value => value === values[0]);
}
   

/**
creates a hard copy of a variable (instead of just creating a reference in case of list and dictionaries). 
It is equivalent to structuredClone and mimics the 'byVal' operater in VBA, hence the name
*/
function byVal(data) {
    // If it's a primitive (string, number, boolean, null, undefined), 
    // it's passed by value automatically. Otherwise, deep clone it.
    if (data === null || typeof data !== "object") {
        return data;
    }
    
    return structuredClone(data);
}


class clsBasis {
    // You can leave this completely empty 
    // or put global variables/core settings here
}

class clsDOM {
    // Class to manipulate the DOM, e.g., insert rows into tables, create textareas, etc.
}
  
// ####################################################################################################
// region class_divHandler                                                                                #
// ####################################################################################################

/*
headers: array of strings, representing the headers of the table
cols: array of arrays of strings, representing the columns of the table, where the first array is the first column
rows: array of arrays of strings, representing the rows of the table, where the first array is the first row

You can provide headers. If not, then ["header 1", "header 2", "header 3"] will be set by default
You can provide rows or cols, but not both. If you provide neither, an empty table with four empty rows will be created.
*/
class clsDivBuilder {
    static BuildTable(config) {
        let SCHEMA = {
            headers: {typOf: 'list', required: false},
            cols: {typOf: 'list', required: false},
            rows: {typOf: 'list', required: false},
            json: {typOf: 'list', required: false}
        }
        if (ValidateSCHEMA(config, SCHEMA) == false) return;

        let headers = ["header 1", "header 2", "header 3"]
        let rows = [["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]]
        let json = [
            {"header 1": "", "header 2": "", "header 3": ""},
            {"header 1": "", "header 2": "", "header 3": ""},
            {"header 1": "", "header 2": "", "header 3": ""},
            {"header 1": "", "header 2": "", "header 3": ""}
        ]

        if (config.json && (config.cols || config.rows)) 
            return null
        if (config.json && !config.headers) 
            headers = this._AllKeysFromJSON(config.json)
        if (config.headers) 
            headers = config.headers;
        if (config.cols && config.rows)
            return null
        if (config.rows) 
            rows = config.rows;
        if (config.cols)
            rows = config.cols.transpose();
        if (config.json) {
            rows = []
            for (let item of config.json) {
                let row = [];
                for (let header of headers) {
                    row.push(item[header] || "");}
                rows.push(row);}
        }

        let table = document.createElement("table");
        table.appendChild(this._tableHeaders(headers));
        table.appendChild(this._tableBody(rows));
        return table;
    }

    static _tableHeaders(headers) {
        let thead = document.createElement("thead");
        thead.appendChild(this._tableRow(headers, "th"));
        return thead;
    }

    static _tableBody(rows) {
        let tbody = document.createElement("tbody");
        rows.forEach(row => {tbody.appendChild(this._tableRow(row, "td"));});
        return tbody;
    }

    static _tableRow(values, tx) {
        const tr = document.createElement("tr");
        values.forEach(value => {tr.appendChild(this._tableCell(value, tx));});
        return tr;
    }

    static _tableCell(value, tag) {
        const cell = document.createElement(tag);
        cell.textContent = value;
        return cell;
    }

    static _AllKeysFromJSON(json) {
        let allKeys = new Set();
        json.forEach(item => {
            Object.keys(item).forEach(key => allKeys.add(key));
        });
        return Array.from(allKeys);
    }


    static BuildTextArea(config) {
        let SCHEMA = {
            id: {typOf: 'str', required: false},
            className: {typOf: 'str', required: false},
            value: {typOf: 'str', required: false},
            spellcheck: {typOf: 'bool', required: false},
            width: {typOf: 'str', required: false},
            height: {typOf: 'str', required: false}
        };
        if (ValidateSCHEMA(config, SCHEMA) == false) return;

        let textarea = document.createElement("textarea");
        textarea.id = config.id || "";
        textarea.className = config.className || "";
        textarea.spellcheck = config.spellcheck || false;
        textarea.style.width = config.width || "100%";
        textarea.style.height = config.height || "100%";
        textarea.value = config.value || "";
        return textarea;
    }
}



class clsDivHandler {

    static _InsertRow_Validate(table, rowAsListOrDict, index) {
        if (!(table instanceof HTMLTableElement)) {
            console.error("The provided table is not a valid HTMLTableElement.");
            return;}
        if (rowAsListOrDict == null || (typOf(rowAsListOrDict) != 'list' && typOf(rowAsListOrDict) != 'dict')) {
            console.error("The provided row is not a valid list or dict.");
            return;}
        if (index !== undefined && (typOf(index) != 'int' || index < 0 || index > table.rows.length)) {
            console.error("The provided index is not valid.");
            return;}
    }

    static InsertRow(table, rowAsListOrDict, index) {
        this._InsertRow_Validate(table, rowAsListOrDict, index)
        
        let rowIndex = wenn(index === undefined,table.rows.length-1, index) 
        let headers = Array.from(table.querySelectorAll('thead th')).map(th => th.innerHTML);
        let tbody = table.querySelector('tbody');
        let row = tbody.insertRow(rowIndex);
        
        // Handle dictionary row. Cells will be filled according to header names.
        // Dictionary must not match headers exactly. Missing keys will result in empty cells.
        if (typOf(rowAsListOrDict) == 'dict') {
            for (let j = 0; j < headers.length; j++) {
                let cell = row.insertCell();
                let key = headers[j];
                cell.innerHTML = rowAsListOrDict[key] || "";
            }
            return;
        }

        // Handle list row. Cells will be filled in order.
        // List (order of entries) must match headers exactly
        if (typOf(rowAsListOrDict) == 'list') {
            if (rowAsListOrDict.length != headers.length) {
                console.error("The provided row list length does not match the number of table headers.");
                return;}

            for (let j = 0; j < rowAsListOrDict.length; j++) {
                let cell = row.insertCell();
                cell.innerHTML = rowAsListOrDict[j];
            }
            return;
        }
    }

    static _RemoveRow_Validate(table, index) {
        if (!(table instanceof HTMLTableElement)) {
            console.error("The provided table is not a valid HTMLTableElement.");
            return;}
        if (index !== undefined && (typOf(index) != 'int' || index < 0 || index > table.rows.length)) {
            console.error("The provided index is not valid.");
            return;}
    }

    static RemoveRow(table, index) {
        this._RemoveRow_Validate(table, index);

        let tbody = table.querySelector('tbody');
        if (!tbody || tbody.rows.length === 0) return;

        let rowIndex = wenn(index === undefined, tbody.rows.length - 1, index);

        tbody.deleteRow(rowIndex);
        }


    static MakeRowsEditable(table, options) {
        let SCHEMA = {
            rowIndexes: {typOf: 'list', required: false}
            //other schemas my be added
        }
        if (ValidateSCHEMA(options, SCHEMA) == false) return;

        if (options.rowIndexes) {
            for (let i = 0; i < options.rowIndexes.length; i++) {
                let rowIndex = options.rowIndexes[i];
                let row = table.rows[rowIndex];
                for (let j = 0; j < row.cells.length; j++) {
                    let cell = row.cells[j];
                    cell.contentEditable = true;
                }
            }
        }
    }

    static SetTableStyle(table, options) {
        let SCHEMA = {
            colWidths: {typOf: 'list', required: false}
            //other schemas my be added
        }
        if (ValidateSCHEMA(options, SCHEMA) == false) return;

        if (options.colWidths) {
            if (options.colWidths.length != table.rows[0].cells.length) {
                console.error("The provided colWidths list length does not match the number of table headers.");
                return;}

            // Ensure percentage widths work as expected
            table.style.tableLayout = 'fixed';
            table.style.width = '100%';

            for (let i = 0; i < options.colWidths.length; i++) {
                // Ensure valid layout: ["50%", "30%", "20%"]
                if (typOf(options.colWidths[i]) !== 'str' && !options.colWidths[i].includes('%')) {
                    console.error("The provided colWidths list contains non-percentage values.");
                    return;}

                table.rows[0].cells[i].style.width = options.colWidths[i]
            }
        }
    }
}
   //MOHI: replaces protoDivTable and protoDOMTable functions
// ####################################################################################################
// region clsBasis_Files                                                                                  #
// ####################################################################################################

/**
triggers a download of a file with the specified content and filename. The mimeType can be specified, default is 'text/plain;charset=utf-8'.
*/
clsBasis.download= function(fileContent, filename, mimeType = 'text/plain;charset=utf-8') {
        // fileContent can be string, ArrayBuffer, Uint8Array or Blob
        const blob = fileContent instanceof Blob
            ? fileContent
            : new Blob([fileContent], { type: mimeType });

        const url = URL.createObjectURL(blob);
        const element = document.createElement('a');
        element.style.display = 'none';
        element.href = url;
        element.download = filename || 'download';

        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        // Release ObjectURL after short time
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

clsBasis._readFiles = function(files) {
        const readers = Array.from(files).map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = e => resolve({ file: file, content: e.target.result }); // ev.target === this === reader
                reader.onerror = () => resolve(null);
                reader.readAsText(file);
            });
        }); 
    return Promise.all(readers);
}

/**
triggers a file upload dialog and returns a Promise of a listof dictionaries [{file, content}, {...}, .... ]. If multiple is true, multiple files can be selected.
*/ 
clsBasis.upload = function(multiple=false) {
        return new Promise(function (resolve) {
            // Create a hidden file input element
            var input = document.createElement('input');
            input.type = 'file';
            if (multiple) input.multiple = true
            input.style.display = 'none';

            // Add an event listener to handle file selection
            input.addEventListener('change', async function (e) {
                if (!input.files || input.files.length === 0) {
                    input.remove(); resolve([]); return;}
                
                let files = input.files;
                input.remove();

                let result = await clsBasis._readFiles(files);
                resolve(result);
            }, { once: true }); // Use { once: true } to ensure the event listener is removed after it' is called once

            // Trigger the file input dialog
            document.body.appendChild(input);
            input.click();
            });
    }
// ####################################################################################################
// region clsBasis_helpers                                                                                #
// ####################################################################################################

/**
delays a function call.
*/
clsBasis.debounce = function(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}


// ####################################################################################################
// region clsBasis_popup                                                                                  #
// ####################################################################################################

/**
creates a pop-up window with a header and message. The pop-up can be closed by clicking the close button, clicking outside the pop-up, or pressing the Escape key.
*/
clsBasis.popup = function(header, message) {
        if (header === undefined) header = "Pop-up";
        if (message === undefined) message = "This is a pop-up message.";

        const popup = document.createElement("div");
        popup.id = "myPopup";
        popup.className = "popup-container";
        popup.innerHTML = `
            <div class="popup-content">
                <span class="popup-close-button">&times;</span>
                <h2>${header}</h2>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(popup);
        popup.classList.add("active");

        const popupContainer = document.getElementById("myPopup");
        const popupCloseButton = popupContainer.querySelector(".popup-close-button");

        const closePopup = () => {
            popup.classList.remove("active");
            popupContainer.removeEventListener("click", handlePopupClick);
            document.removeEventListener("keydown", handleEscKey);
            setTimeout(() => popup.remove(), 300);
        };

        const handlePopupClick = (event) => {
            if (event.target === popupContainer || event.target === popupCloseButton) {
                closePopup();
            }
        };

        const handleEscKey = (event) => {
            if (event.key === "Escape") {
                closePopup();
            }
        };

        popupContainer.addEventListener("click", handlePopupClick);
        document.addEventListener("keydown", handleEscKey);
    }
// ####################################################################################################
// region clsDOM_AutoFill                                                                                 #
// ####################################################################################################

/**
Modifies your HTML page by filling in the values of the provided list of dictionaries.<br>
1) Reads div(elementId).innerHTML as template <br>
2) Clears div(elementId).innerHTML = '' <br>
3) Fills everything in one pass by replacing {{key}} with the corresponding value from each dictionary<br>
Options:<br>
  - append: boolean, if true, appends to existing content instead of clearing it first<br>
 */
clsDOM.AutoFill = function(listOfDictionaries, elementId, config) {
    const input_norm = clsDOM._Auto_Fill_Harmonize(listOfDictionaries, elementId, config);
    if (input_norm === null) 
        return;
    
    const {
        container: div,
        data: listOfDicts,
        opts: options
    } = input_norm;

    // Store template as div-container attribute
    if (!div._autoFillTemplate) div._autoFillTemplate = div.innerHTML;
    const template = div._autoFillTemplate; 
    
    // Clear only if not appending and if content is different from template
    if (!options.append || div.innerHTML == div._autoFillTemplate) {
        div.innerHTML = ""; 
    }

    // PERFORMANCE FIX: Accumulate strings in memory
    let accumulatedHTML = "";

    listOfDicts.forEach(item => {
        let nextString = template;
    
        for (let key in item) {
            const safeKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
            nextString = nextString.replace(new RegExp(`{{${safeKey}}}`, 'g'), item[key]);
        }     

        accumulatedHTML += nextString;
    });

    // Commit to the DOM exactly once
    div.innerHTML += accumulatedHTML;
};


// ==========================================
// HIDDEN/INTERNAL METHODS ON CLSDOM
// ==========================================

clsDOM._Auto_Fill_Harmonize = function(data, elementId, opts) {
    if (opts === undefined) opts = {};
    if (opts.append === undefined) opts.append = false;

    // Get the container div using the hidden method
    let container = clsDOM._Auto_Fill_Harmonize_Container(elementId);
    if (!container) return null;

    // Harmonize input data to be always a list
    if (!['list', 'dict'].includes(typOf(data))) return null;
    if (typOf(data) == 'dict') data = [data];

    return {
        container,
        data,
        opts
    };
};

clsDOM._Auto_Fill_Harmonize_Container = function(elementId) {
    if (elementId === undefined) elementId = "";
    let container = null;
    
    if (elementId === "") container = document.body;
    else container = document.getElementById(elementId);
    
    if (!container) return null;
    if (!container.classList.contains('js-fill')) {
        console.log('WARNING! The target div does not have the class "js-fill"');
    }
    return container;
};
// ####################################################################################################
// region clsDOM_Download                                                                                 #
// ####################################################################################################

/**
Downloads the current HTML document as a file with the specified filename.
 */
clsDOM.DownloadHTML = function(filename = 'document.html') {
    const html = document.documentElement.outerHTML;
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const element = document.createElement('a');
    element.style.display = 'none';
    element.href = url;
    element.download = filename;

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setTimeout(() => URL.revokeObjectURL(url), 1000);
};
// ####################################################################################################
// region clsDOM_Expose                                                                                   #
// ####################################################################################################


/**
Exposes the HTML of a given element (div, script) in a textarea, allowing for easy viewing of its content. 
The function takes a configuration object that specifies the div to expose, the div to append the textarea to, and various options for formatting and behavior.
 */
clsDOM.ExposeHTML = function(config) {
    let SCHEMA = {
        divToExpose: {typOf: 'div', required: true},
        stringToExpose: {typOf: 'str', required: false},
        divToAppend: {typOf: 'div', required: true},
        id: {typOf: 'str', required: false},
        outer: {typOf: 'bool', required: false},
        pretty: {typOf: 'bool', required: false},
        textAreaClassName: {typOf: 'str', required: false},
        synchWithTarget: {typOf: 'bool', required: false},
        lineNumbers: {typOf: 'bool', required: false}, 
        defineRows: {typOf: 'bool', required: false}
    };
    if (ValidateSCHEMA(config, SCHEMA) == false) return;

    let divToExpose = config.divToExpose;
    let divToAppend = config.divToAppend;
    let stringToExpose = config.stringToExpose || "";
    let id = config.id || "";
    let outer = config.outer || false;
    let pretty = config.pretty || false;
    let textAreaClassName = config.textAreaClassName || "";
    let synchWithTarget = config.synchWithTarget || false;
    let lineNumbers = config.lineNumbers || false;
    let defineRows = config.defineRows || false;

    let textarea = clsDivBuilder.BuildTextArea({
        id: id, className: textAreaClassName, spellcheck: false, 
        width: '100%', height: '100%'});

    let htmlSource = undefined
    if (stringToExpose != "") {
        htmlSource = config.stringToExpose;
    } else {
        if (outer) {
            htmlSource = divToExpose.outerHTML;
        } else {
            htmlSource = divToExpose.innerHTML;}
    }
    if (htmlSource == undefined) 
        return
    if (divToExpose.tagName.toLowerCase() === 'script')
        textarea.classList.add('script') 

    if (pretty) {
        let flatHTML = htmlSource.replace(/[\n\t\r]/g, "").replace(/\s+/g, " ").trim();
        htmlSource = formatHTML(flatHTML);
    }
    if (synchWithTarget) {
        textarea.addEventListener('input', () => {
            divToExpose.innerHTML = textarea.value;
        });
    } else {
        textarea.readOnly = true
    }
    
    textarea.value = _filteredLines(htmlSource, '#IGNORE')
    if (!divToAppend.classList.contains('js-fill')) console.log('WARNING! The target div does not have the class "js-fill"')
    
    if (lineNumbers) {
        let lineNumbersDiv = document.createElement('div');

        lineNumbersDiv.classList.add('line-numbers-for-textarea');
        let linesArr = Array.from({ length: textarea.value.split("\n").length}, (_, i) => i + 1);
        lineNumbersDiv.innerHTML = linesArr.join("<br>");
        divToAppend.classList.add('flex');
        divToAppend.appendChild(lineNumbersDiv);
    }
    
    let DescendantTextAreas = divToAppend.querySelector('textarea')
    if (DescendantTextAreas) {
        DescendantTextAreas.remove();
    }

    if (defineRows) {
        let lineCount = (textarea.value.match(/\n/g) || []).length;
        textarea.rows = lineCount + 1;
    }

    divToAppend.appendChild(textarea);   
    return textarea                                                                                                                                        
}
// ####################################################################################################
// region clsDOM_Remove                                                                                   #
// ####################################################################################################

/**
Removes all elements from the DOM that have the specified class name.
*/
clsDOM.RemoveWithClass = function(className) {
    const elements = Array.from(document.querySelectorAll('*'));
    const targetClass = className.trim();

    elements.forEach(element => {
        if (element.classList && element.classList.contains(targetClass)) {
            element.remove();
        }
    });
}
// ####################################################################################################
// region customElements_SelectionPill                                                                    #
// ####################################################################################################

/**
erstellt eine Auswahl von Optionen in Form von "Pills" (Schaltflächen).
 */
class SelectionPill extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // 1. Attribute aus html tag auslesen und Standardwerte festlegen
        const name = this.getAttribute('name') || 'pill-input';
        const type = this.getAttribute('type') || 'radio'; // 'radio' oder 'checkbox'
        const checkedValue = this.getAttribute('checked') || null; 
        let options = this.getAttribute('options') || '[]'; // JSON-String, z.B. '["Option 1", "Option 2"]'
        
        // JSON-String aus dem 'options'-Attribut in ein echtes Array umwandeln
        let optionsJSON;
        try {
            optionsJSON = JSON.parse(options);
        } catch (e) {
            console.error(`Fehler beim Parsen der Optionen für ${name}:`, e);
            return;
        }

        // 2. Das umschließende Form-Element erstellen
        const form = document.createElement('form');
        form.id = `id-form-${name}`;
        form.className = 'selection-pill mr-30';  // css for style in b.css
        

        // 3. HTML für jede Option generieren
        optionsJSON.forEach((optionText, index) => {
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
// ####################################################################################################
// region dom_basis                                                                                       #
// ####################################################################################################

/**
 * Returns the DOM element where the event was triggered. When a className is provided, the its closest parent containing the className.

 */
function ElementFromJSEvent(event, className = '') {
    let element = event instanceof Element ? event : event?.target;

    if (!element || typeof element.closest !== 'function') return null;

    if (!className) return element;

    let selector = className.startsWith('.') ? className : `.${className}`;
    return element.closest(selector);
}

/**
returns all event listeners of the current page. The function uses the native getEventListeners function of Chrome DevTools. 
The function is for develooment purposes only and should not be used in production code.
This function can only be used within the Chrome DevTools.
*/
function getAllEventListeners() {
    function xdivStr(element) {
        if (element === document) return "document"
        if (element === window)  return "window"
        if (element.id) return element.id
        if (element.className) return element.className.replace(/\s+/g, '.');
        return element.tagName.toLowerCase(); // Fallback to tag name
    }
    const allElements = document.querySelectorAll('*');
    let eventListeners = {};

    allElements.forEach(element => {
      const elementListeners = getEventListeners(element); // Native Chrome's getEventListeners
      if (Object.keys(elementListeners).length > 0) eventListeners[xdivStr(element)] = elementListeners;
    });
  
    return eventListeners;
  }
// ####################################################################################################
// region _Array                                                                                     #
// ####################################################################################################

/** 
returns the max depth of an array.
As this function uses recursion you can limit the level of recursions, default limit is 9.
*/
Object.defineProperties(Array.prototype, {
    depth: {
        value: function(limit_Recursions) {

            function _recursiveDepth(arr) {
                if (limit_Recursions == undefined) limit_Recursions = 9
                if (!Array.isArray(arr)) return 0
                let ret = 0;
                for (let item of arr) {
                    ret = Math.max(ret, _recursiveDepth(item));
                    if (ret >= limit_Recursions) {
                        ret = limit_Recursions-1
                        break}}
                return ret + 1
            }

            return _recursiveDepth(this)
        }
    }
});


/** 
returns the number of occurances of an item in an array. Identity is checked with the '===' operator.
*/
Object.defineProperties(Array.prototype, {
    count: {
        value: function(item) {
            var ret = 0;
            for(let itemm of this)
                if (itemm===item) ret++;
            return ret;
        }
    }
});

/** 
replaces the string for each of its items, according to the inputs 're' and 'place'. 
It will only be applied to elements of the ego array which are of type string. 
When the optional parameter wholeItem is set to true, then the complete element string must be equal to 're'. 
This function uses recursion, which is limited to 100 iterations.
*/
Object.defineProperties(Array.prototype, {
    replace: {
        value: function(re, place, wholeItem = false, recursion = 0) {
            let ret = []; let tmp = ''
            for (let item of this) {
                if (typOf(item) != 'str') continue
                if (wholeItem) {
                    tmp = wenn(item == re, place, item)
                } else {
                    tmp = item.replace(re,place)
                    if (tmp.includes(re) && recursion < 99) tmp = [tmp].replace(re,place, wholeItem, recursion+1)[0]
                }
                ret.push(tmp)
            }
            return ret    
        }
    } 
});

/** 
adds to each of its items a 'prefix' and a 'postfix'.
It will only be applied to elements of the ego array which are of type string. 
*/
Object.defineProperties(Array.prototype, {
    prepost: {
        value: function(prefix, postfix) {
            if (prefix == undefined) prefix = ''
            if (postfix == undefined) postfix = ''
            let ret = []
            for (let item of this) {
                if (typOf(item) != 'str') continue
                ret.push(prefix + item + postfix)}
            return ret    
        }
    } 
});

/** 
adds to the value of the specified key of each of its items a 'prefix' and a 'postfix'.
Will only be applied to elements of the ego array which are of type dictionary.
Wil only be applied to values of the ego dictionary which are of type string.
This is a wrapper for the dictionary function prepost.
*/
Object.defineProperties(Array.prototype, {
    prepostKey: {
        value: function(key, prefix, postfix) {
            if (key == undefined) return
            if (prefix == undefined) prefix = ''
            if (postfix == undefined) postfix = ''
            for (let item of this) {
                if (typOf(item) != 'dict') continue
                item.prepost(key, prefix, postfix)}
        }
    } 
});

/** 
returns a list/array with the values to the provided 'key' for all dictionary items of the ego array.
It will only be applied to elements of the ego array which are of type dictionary/object.
*/
Object.defineProperties(Array.prototype, {
    keyValues: {
        value: function(key) {
            if (key == undefined) return
            
            let ret = []
            for (let item of this) {
                if (typOf(item) != 'dict') continue
                if (!Object.keys(item).includes(key)) continue
                ret.push(item[key])}
            return ret    
        }
    } 
});

/** 
returns a reduced list/array of the ego array, where all elements the occur multiple times are removed.
*/
Object.defineProperties(Array.prototype, {
    removeDuplicates: {
        value: function() {
            let ret = []
            for (let item of this) {
                if (ret.includes(item)) continue
                ret.push(item)}
            return ret    
        }
    } 
});

/** 
returns a new array with modified keys and old values. 
This is a wrapper for the dictionary function with the same name MeWithNewKeys.
Will only be applied to elements of the ego array which are of type dictionary.
*/
Object.defineProperties(Array.prototype, {
    MeWithNewKeys: {
        value: function(oldKeys, newKeys) {
            let ret = []
            for (let item of this) {
                if (typOf(item) != 'dict') continue
                ret.push(item.MeWithNewKeys(oldKeys, newKeys))}
            return ret    
        }
    } 
});

/** 
adds a new item to the Array if the item is not already in the Array.
*/
Object.defineProperties(Array.prototype, {
    pushX: {
        value: function(newItem) {
            if (!this.includes(newItem)) {
                this.push(newItem);
            }
        }
    } 
});

/** 
returns a new array with all items of the ego array which are not in the list2.
*/
Object.defineProperties(Array.prototype, {
    ItemsNotIn: {
        value: function(list2) {
            let set2 = new Set(list2)
            return this.filter(item => !set2.has(item))
        }
    } 
});

/** 
returns a new array with all items of the ego array flatten in a 1D array.
*/
Object.defineProperties(Array.prototype, {
    flatten: {
        value: function(limit_Recursions) {
            let ret = []
            function _recursiveFlat(arr, limit_Recursions) {
                if (limit_Recursions == undefined) limit_Recursions = 9
                
                if (!Array.isArray(arr)) {
                    ret.push(arr)
                    return}

                for (let item of arr) {
                    _recursiveFlat(item, limit_Recursions-1)}
            }

            _recursiveFlat(this, limit_Recursions)
            return ret
        }
    }
});

/** 
removes elements from the array when they exist
*/
Object.defineProperties(Array.prototype, {
    removeX: {
        value: function(item) {
            for (let i = 0;i< this.length; i++) {
                if (this[i] == item) {
                    this.splice(i, 1);
                    i--; // Adjust index after removal
                }
            }
        }
    }
});

/** 
returns a 2D list. To each of the ego elements the split function with seperator sep is applied.
Will only run if the ego array is a 1D list with string elements.
*/
Object.defineProperties(Array.prototype, {
    massSplit: {
        value: function(sep = ',') {
            if (this.length == 0) return
            if (this.depth()!= 1) return

            for (let item of this) {
                if(typOf(item) != 'str') return}
            
            return this.map(item => {
                return item.split(sep);})
        }
    }
});

/** 
Obsolete. Use 'typOf(arr.Shape()) == 'list' instead.
*/
Object.defineProperties(Array.prototype, {
    Is2DTable: {
        value: function() {
            return typOf(this.Shape()) == 'list'
        }
    }
});

/** 
return a list with the number of elements in the first dimension and the number of elements in the second dimension and so on.
The shape of a 1D array is [n], the shape of a 2D array is [n, m], and so on
Shape checks if all subarrays are of the same shape and returns false if not. If false is returned, you can use .depth() to check the depth of the array.
*/
Object.defineProperties(Array.prototype, {
    Shape: {
        value: function() {
            function _getShape(arr) {
                if (!Array.isArray(arr)) return null;
                let shape = [arr.length];
                if (arr.length > 0) {
                    let firstSubShape = _getShape(arr[0]);
                    if (firstSubShape === null) return shape;
                    for (let item of arr) {
                        let subShape = _getShape(item);
                        if (JSON.stringify(subShape) !== JSON.stringify(firstSubShape)) return false;
                    }
                    shape = shape.concat(firstSubShape);
                }
                return shape;
            }

            return _getShape(this);
        }
    }
});


/** 
returns a string, representing the array content similar to <i>String(array)</i>.
Stringify will not put brackets at the end or beginning of an array or subarray. Stringify expects as 
many separators as the depth of the ego array.
*/
Object.defineProperties(Array.prototype, {
    stringify: {
        value: function(...seperators) {
            if (seperators.length == 0) seperators = [',']
            if (this.length == 0) return ''
            assert (seperators.length = this.length)

            function _recursiveStringify(arr, depth) {
                if (!Array.isArray(arr)) return String(arr)
                let sep = seperators[Math.min(depth, seperators.length - 1)]
                return arr.map(item => _recursiveStringify(item, depth + 1)).join(sep)
            }

            return _recursiveStringify(this, 0)
        }
    }
});


/**
removes all occurances of the specified element from the array.
This function modifies the original array.
 */
Object.defineProperties(Array.prototype, {
    removeAll: {
        value: function(elements) {
            if (typOf(elements) == 'str' || typOf(elements) == 'int') elements = [elements]
            if (typOf(elements) != 'list') return

            for (let element of elements) {
                if (typOf(element) != 'str' && typOf(element) != 'int') continue
                let n = this.count(element)
                for (let i = 0; i<n;i++) {
                    this.removeX(element)}
            }
        }
    }
});

/**
return a collection representing the array content. The ego content must be a list of dictionaries.
 */
Object.defineProperties(Array.prototype, {
    AsCollection: {
        value: function() {
            let ret = new Collection()
            for (let item of this) {
                assert (typOf(item) == 'dict')
                ret.push(item)
            }
            return ret
        }
    }
});

/**
 * return the transposed version of a 2D array. The array must be rectangular and have only two dimensions.
 */
Object.defineProperties(Array.prototype, {
    transpose: {
        value: function() {
            if (this.length == 0) 
                return []
            if (this.Shape() == false) {
                console.log('Array is not rectangular')   
                return null}
            if (this.depth() != 2) {
                console.log('Array is not 2D')   
                return null}
            
            // logic: Array of rows -> Array of columns
            let transposed = []
            for (let i = 0; i < this.Shape()[1]; i++) {
                transposed.push([])
                for (let j = 0; j < this.Shape()[0]; j++) {
                    transposed[i].push(this[j][i])
                }
            }
            return transposed
        }
    }
});


Object.defineProperties(Array.prototype, {
    _toDictionary: {
        value: function(values) {
            if (this.length !== values.length) {
                throw new Error('"_toDictionary": Length of keys and values must be equal');
            }
            return Object.fromEntries(this.map((key, i) => [key, values[i]]));
        },
        enumerable: false,   // Hides it from for...in loops
        writable: true,      // Allows it to be overwritten if needed (good for tests)
        configurable: true   // Allows it to be deleted or redefined later
    }
});

Object.defineProperties(Array.prototype, {
    _fromTo: {
        value: function(from, to) {
            let isInverse = from > to;
            let length = isInverse ? (from - to + 1) : (to - from + 1);

            // Array.from generates the array directly based on length and a mapping function
            return Array.from({ length }, (_, i) => {
                return isInverse ? (from -i) :  (from + i);
            });
        },
        enumerable: false,
        writable: true,
        configurable: true
    }
});
// ####################################################################################################
// region _Collection                                                                                #
// ####################################################################################################

class Collection extends Array {
    constructor(...args) {
        super(...args);
    }
        /** 
    Collection
    A collection is a list of dictionaries (technically array of objects).
    */
    aboutMe() {
        // i do nothing
    }

        /** 
    Collection
    returns all items in form of a 2D array. The first row of the 2D array are the dictionary keys. in case a key is provided, then a 1D array is provided
    that contains all values of the corresponding key. 
    */
    asList(key) {
        let ret = [];

        if (key == undefined) {
            let headers = this._headers150()
            ret.push(headers)

            this.forEach(item => {
                ret.push(this._pushX150(item, headers))
            })
            
        }
        
        if (typOf(key) == 'str') {
            this.forEach(item => {
                ret.push(item[key])
            });
        }
        return ret
    }

    /**
    Collection
    adds a new key-value pair to all items. This is equivalent to adding a new column to a table. 
    If force is set to false, then the new key is only added to items if key exists in the item.
    Force is set to true by default and will add the new key with an empty string in case the key does not exist.
    */
    copyKey(key, newKey, force=true) {
        assert (typOf(key) == 'str')
        assert (typOf(newKey) == 'str')
        assert (typOf(force) == 'bool')
        this.forEach(item => {
            if (item[key]) item[newKey] = item[key]
            else if (force) item[newKey] = ""
        });
    }

    /** 
    Collection
    with an additional check that the item(s) pushed are of type dictionary
    */
    push(...items) {
        for (let item of items) {
            assert (typOf(item) == 'dict')
        }
        super.push(...items);
    }

    /** 
    Collection
    pushed the elements of a odanariy list of dictionaries. 
    */
    pushJSON(items) {
        assert (typOf(items) == 'list')
        for (let item of items) {
            assert (typOf(item) == 'dict')
            super.push(item)
        }
    }

    /** 
    Collection
    pushes the rows of the array. The array must be a 2D array, where the first row (array[0]) are the keys.
    */
    pushArray(array2D) {
        assert (typOf(array2D) == 'list')
        assert (array2D.depth() == 2)

        let keys = array2D[0]
        for (let i = 1; i<array2D.length; i++) {
            this.push(keys._toDictionary(array2D[i]))
        }
    }

    /** 
    Collection
    pushes the elements represented by a JSOn String. The JSON string must be a list of dictionaries.
    */
    pushString(jsonString) {
        if (!jsonString.isJSON) return 

        let jsonObject = JSON.parse(jsonString);
        jsonObject.forEach(item => {this.push(item)})
    }

    /**
    Collection
    removes for all items the key-value pair of a specified key. This is equivalent to removing a column in a table.
    */
    removeKey(key) {
        assert (typOf(key) == 'str')
        this.forEach(item => {
            if (item[key] != undefined) delete item[key]
        });
    }

    /** 
    Collection
    returns the ego data in a JSON string, like JSON.stringify()
    */
    stringify() {
        let jsonObject = []
        this.forEach(item => {
            jsonObject.push(item)
        });
        return JSON.stringify(jsonObject);
    }

    /** 
    Collection
    like stringify() just in a nice formatted way with new lines and tabs
    */
    stringifyFormatted() {
        let jsonObject = []
        this.forEach(item => {
            jsonObject.push(item)
        });
    return JSON.stringify(jsonObject, null, 4);
    }

    /** 
    Collection
    returns the ego data as a string in a excel-ready formatted 2D array
    */
    stringifyTable() {
        return this.asList().stringify('\n', '\t')
    }

    /**
    Collection
    returns a new collection with the subset of elements which have the specified keys
    */
    subsetKeys(keys) {
        assert (typOf(keys) == 'list')
        return this.filter(item => keys.every(key => item.keys().includes(key)))
    }

    /**
    Collection
    returns a new collection with the subset of elements which have the specified key-value pair
    */
    subsetValues(key, values) {
        assert (typOf(key) == 'str')
        assert (typOf(values) == 'list')
        return this.filter(item => values.includes(item[key]))
    }

    /**
    Collection
    will change for all items the key of oldKey to newKey. The values stay the same. Note: This function will change the order of the keys, newKey will be the last key.
    */
    renameKey(oldKey, newKey) {
        assert (typOf(oldKey) == 'str')
        assert (typOf(newKey) == 'str')
        this.forEach(item => {
            if (item[oldKey] != undefined) {
                item[newKey] = item[oldKey]
                delete item[oldKey]
            }
        });
    }

    /**
    Collection
    adds to each item of the collection the corresponding value of the array.
    Collection item 'i-1' will get the new key-value pair arr[0]:arr[i], as arr[0] is interpeted as the new key for all items.
    arr must be the length of the ego colllection plus 1.
    */
    addKey(arr) {
        assert (arr.length == this.length + 1)

        for (let i = 1; i < this.length +1; i++) {
            this[i-1][arr[0]] = arr[i]
        }
    }

    /**
    Collection
    deletes all items in the collection
    */
    reset() {
        this.length = 0
    }

    /**
    Collection
    removes all items from the collection which are empty (i.e. have no keys)
    */
    removeEmptyEntries() {
        this.forEach((item, index) => {
            let hasValue = false
            for (let key of item.keys()) {
                if (typOf(item[key]) == 'list') {
                    if (item[key].length > 0) {
                        hasValue = true
                        break
                    }
                }
                if (item[key] != null && item[key] != "" && item[key] != undefined){
                    hasValue = true
                    break
                }
            }
            if (!hasValue) this.splice(index, 1)
        })
    }

    sortByKey(key, ascending=true, numeric=false) {
        assert (typOf(key) == 'str')
        assert (typOf(ascending) == 'bool')
        assert (typOf(numeric) == 'bool')

        if (!numeric) {
            this.sort((a, b) => {
                if (String(a[key]) < String(b[key])) return ascending ? -1 : 1
                if (String(a[key]) > String(b[key])) return ascending ? 1 : -1
                return 0
            })
            return
        }
        
        if (numeric) {
            this.sort((a, b) => {
                if (a[key] < b[key]) return ascending ? -1 : 1
                if (a[key] > b[key]) return ascending ? 1 : -1
                return 0
            })
            return
        }
    }

    _headers150() {
        let headers = []
        this.forEach(item => {
            for (let key of item.keys()) {
                headers.pushX(key)
            }
        })
        return headers
    }

    _pushX150(item, headers150) {
        let tmp = new Array(headers150.length).fill(null)
        for (let key of item.keys()) {
            tmp[headers150.indexOf(key)] = item[key]
        }
        return tmp
    }


}
// ####################################################################################################
// region _Dictionary                                                                                #
// ####################################################################################################

/**
returns an array of the object's own keys.
 */
Object.defineProperties(Object.prototype, {
    keys: {
        value: function() {
              return Object.keys(this)
            }  
    } 
}); 

/**
returns true if the dictionary contains the specified key, returns false if not.
Is a short version of 'Object.keys(this).includes(key)'
*/
Object.defineProperties(Object.prototype, {
    includes: {
        value: function(key) {
              return Object.keys(this).includes(key)
            }  
    } 
}); 

/**
returns a new dictionary with the modified keys and their old values.
*/
Object.defineProperties(Object.prototype, {
    MeWithNewKeys: {
        value: function(oldKeys, newKeys) {
            if (oldKeys.length != newKeys.length) return 
            let thisKeys = Object.keys(this)
            for (let thisKey of thisKeys) {
                if (!oldKeys.includes(thisKey)) {
                    oldKeys.push(thisKey)
                    newKeys.push(thisKey)}
            }  

            let newDict = {}
            for (let i = 0; i < oldKeys.length; i++) {
                newDict[newKeys[i]] = this[oldKeys[i]]
            }
            return newDict
            }  
    } 
}); 

/**
modifies the value of the specified key by adding a prefix and a postfix.
Will only be applied if the value to the provided key is of type string.
*/
Object.defineProperties(Object.prototype, {
    prepost: {
        value: function(key, prefix, postfix) {
            if (key == undefined) return
            if (prefix == undefined) prefix = ''
            if (postfix == undefined) postfix = ''
            this[key] = prefix + this[key] + postfix
            }  
    } 
}); 

/**
returns the first key of the dictionary that has the specified value.
*/
Object.defineProperties(Object.prototype, {
    KeyByValue: {
        value: function(value) {
            for (let key of this.keys()) {
                if (this[key] == value) return key}
            return undefined
            } 
    } 
}); 

/**
returns a new dictionary with the provided keys (in the order the keys are provided. Note: keys are generally not ordered in a dictionary.)
*/
Object.defineProperties(Object.prototype, {
    KeySubsetAndOrder: {
        value: function(keys) {
            let ret = {}
            for (let key of keys) {
                if(this.hasOwnProperty(key)) ret[key] = this[key]
            } 
            return ret
        }
    } 
}); 
// ####################################################################################################
// region _DIV                                                                                       #
// ####################################################################################################

/**
returns all descendats (children and grandchildren) of a div that have a certain className
*/
Element.prototype.DescendantsWithClass = function(className) {
    if (!className.startsWith('.')) throw new Error('className must start with a "."');
    className = className.after(".")

    let results = [];
  
    function traverse(element) {
        if (element.classList && element.classList.contains(className)) results.push(element)
        for (const child of element.children) {
            traverse(child)}
        }
  
    traverse(this); 
  
    return results;
  };

/**
returns all descendats (children and grandchildren) of a div that have a certain tag
*/
Element.prototype.DescendantsWithTag = function(tagName) {
    let validTags = ['textarea', 'p', 'a', 'table', 'li', 'ul', 'ol', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'button', 'input', 'select', 'option'];
    assert (validTags.includes(tagName))

    let results = [];

    function traverse(element) {
        if (element.tagName.toLowerCase() == tagName) results.push(element)
        for (const child of element.children) {
            traverse(child)}
        }

    traverse(this); 

    return results;
};

/**
returns the first ancestor of a div that has a certain className
*/
Element.prototype.AncestorWithClass = function(className) {
    if (!className.startsWith('.')) throw new Error('className must start with a "."');
    className = className.after(".")

    let currentElement = this.parentElement;
    
    while (currentElement) {
        if (currentElement.classList.contains(className)) return currentElement;
        currentElement = currentElement.parentElement}
    
    return null; // No ancestor found with the specified class
    }


/**
returns true if the ego div is a decendant of a div that containts the ancestorClass
*/
Element.prototype.IsDescendantOfClass = function(ancestorClass) {
  if (!ancestorClass.startsWith('.')) throw new Error('className must start with a "."');
  ancestorClass = ancestorClass.after(".")

  let current = this;
  while (current && current !== document.body) { 
    if (current.classList && current.classList.contains(ancestorClass)) {
      return true;
    }
    current = current.parentElement;
  }
  return false;
};

/**
returns true if the ego div is a decendant of the ancestor div. The function looks up 20 generations, which can be changed by the iterations parameter.
*/
Element.prototype.IsDescendantOf = function(ancestor, iterations = 20) {
          let ego = this
          for (i = 0; i<iterations; i++) {
              if (ego.tagName == "BODY") {
                  return false}
              if (ego.parentElement === null) {
                  return false}
              if (ego === ancestor) {
                  return true}
              ego = ego.parentElement
          }
          return false
      };

/**
adds a 'click' and a 'touchstart' evenlistener event to the ego element. The ego element must have the class 'js-event'
*/
Element.prototype.addEventListener_ClickAndTouch = function(functionName) {
  if (!this.classList.contains("js-event")) return

  this.addEventListener('click', functionName)
  this.addEventListener('touchstart', function(event) {
      event.preventDefault(); // Prevent mouse events
      functionName(event);     // Call your function
      });
};

/**
adds a single class to a div if not already present
*/
Element.prototype.addClassX = function(className) {
    if (!this.classList.contains(className)) {
        this.classList.add(className);
    }
};


/**
adds a single class to a div if not already present
*/
Element.prototype.removeClassX = function(className) {
    if (this.classList.contains(className)) {
        this.classList.remove(className);
    }
};
// ####################################################################################################
// region _DivTables                                                                                 #
// ####################################################################################################

/** 
sets the table headers innerHTML. The headers must be provided as list/array (hence liste)
The length of liste must equal to the table cols length.
*/
Element.prototype.b_divTable_SetHeaders = function(liste) {
    assert(this.tagName == 'TABLE')
    assert(this.rows[0].cells.length == liste.length)

    let headerRow = this.querySelector('thead tr');
    let headerCells = headerRow.cells;

    for (let i = 0; i < headerCells.length; i++) {
        headerCells[i].innerHTML = liste[i]}
}

/**
return the index of the header with the given name.
If the header is not found, it returns -1.
 */

Element.prototype.b_HeaderIndex = function(headerName, CaseSensitive=false) {
    assert(this.tagName == 'TABLE');
    let headers = Array.from(this.querySelectorAll('thead th'));
    for (let i = 0; i < headers.length; i++) {
        if (CaseSensitive) {
            if (headers[i].innerHTML == headerName) return i;
        } else {
            if (headers[i].innerHTML.toLowerCase() == headerName.toLowerCase()) return i;
        }
    }
    return -1; // Header not found
}
// ####################################################################################################
// region _DOMTables                                                                                 #
// ####################################################################################################

/** 
sets the table headers innerHTML. The headers must be provided as list/array (hence liste)
The length of liste must equal to the table cols length.
*/
Object.defineProperties(Object.prototype, {
    bSetHeaders: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows[0].cells.length == liste.length)

            let headerRow = this.querySelector('thead tr');
            let headerCells = headerRow.cells;

            for (let i = 0; i < headerCells.length; i++) {
                headerCells[i].innerHTML = liste[i]}
        }
    }
});


/** 
sets the table header ids. The header ids must be provided as list/array (hence liste)
The length of liste must equal to the table cols length.
*/
Object.defineProperties(Object.prototype, {
    bSetHeadersID: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows[0].cells.length == liste.length)

            let headerRow = this.querySelector('thead tr');
            let headerCells = headerRow.cells;

            for (let i = 0; i < headerCells.length; i++) {
                headerCells[i].id = liste[i]}
        }
    }
});

/** 
sets the table header classNames (i. e. the complete string). The header classnames must be provided as list/array (hence liste)
The length of liste must equal to the table cols length.
*/
Object.defineProperties(Object.prototype, {
    bSetHeadersClass: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows[0].cells.length == liste.length)

            let headerRow = this.querySelector('thead tr');
            let headerCells = headerRow.cells;

            for (let i = 0; i < headerCells.length; i++) {
                headerCells[i].className = liste[i]}
        }
    }
});

/** 
sets the thead id.
*/
Object.defineProperties(Object.prototype, {
    bSetTHeadID: {
        value: function(id) {
            assert(this.tagName == 'TABLE')
            assert(typOf(id) == 'str')

            let thead = this.querySelector('thead');
            thead.id = id
        }
    }
});

/** 
sets the thead className (i. e. the complete string).
*/
Object.defineProperties(Object.prototype, {
    bSetTHeadClass: {
        value: function(classString) {
            assert(this.tagName == 'TABLE')
            assert(typOf(classString) == 'str')

            let thead = this.querySelector('thead');
            thead.className = classString
        }
    }
});

/** 
sets the thead row id.
*/
Object.defineProperties(Object.prototype, {
    bSetHRowID: {
        value: function(id) {
            assert(this.tagName == 'TABLE')
            assert(typOf(id) == 'str')

            let hrow = this.querySelector('thead tr');
            hrow.id = id
        }
    }
});

/** 
sets the header row className (i. e. the complete string).
*/
Object.defineProperties(Object.prototype, {
    bSetHRowClass: {
        value: function(classString) {
            assert(this.tagName == 'TABLE')
            assert(typOf(classString) == 'str')

            let hrow = this.querySelector('thead tr');
            hrow.className = classString
        }
    }
});

/** 
sets the tbody id.
*/
Object.defineProperties(Object.prototype, {
    bSetTBodyID: {
        value: function(id) {
            assert(this.tagName == 'TABLE')
            assert(typOf(id) == 'str')

            let tbody = this.querySelector('tbody');
            tbody.id = id
        }
    }
});

/** 
sets the tbody className (i. e. the complete string). Each row gets
*/
Object.defineProperties(Object.prototype, {
    bSetTBodyClass: {
        value: function(classString) {
            assert(this.tagName == 'TABLE')
            assert(typOf(classString) == 'str')

            let tbody = this.querySelector('tbody');
            tbody.className = classString
        }
    }
});

/** 
sets 
*/
Object.defineProperties(Object.prototype, {
    bSetRowsID: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows.length -1 == liste.length )    // excluding the header row

            let tbody = this.querySelector('tbody');

            for (let i = 0; i < tbody.rows.length; i++) {
                tbody.rows[i].id = liste[i]}
        }
    }
});

/** 
sets the rows className. The row clasNames must be provided as a string or as a list/array. If provided as a string, all rows receive this className. 
If provided as a list, the length of the list must equal the table's number of rows
*/
Object.defineProperties(Object.prototype, {
    bSetRowsClass: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows.length -1 == liste.length || typOf(liste) == 'str')     // excluding the header row

            let tbody = this.querySelector('tbody');

            if (typOf(liste) == 'str') {

            }
            for (let i = 0; i < tbody.rows.length; i++) {
                if (typOf(liste) == 'str') tbody.rows[i].className = liste
                if (typOf(liste) == 'list') tbody.rows[i].className = liste[i]}
        }
    }
});

/** 
sets 
*/
Object.defineProperties(Object.prototype, {
    bSetCells: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows.length -1 == liste.length)

            let tbody = this.querySelector('tbody');

            for (let i = 0; i < tbody.rows.length; i++) {
                assert(tbody.rows[i].cells.length == liste[i].length)
                for (let j = 0; j < tbody.rows[i].cells.length; j++) {
                    tbody.rows[i].cells[j].innerHTML = liste[i][j]}
                }
        }
    }
});

/** 
sets 
*/
Object.defineProperties(Object.prototype, {
    bSetCellsID: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows.length -1 == liste.length)

            let tbody = this.querySelector('tbody');

            for (let i = 0; i < tbody.rows.length; i++) {
                assert(tbody.rows[i].cells.length == liste[i].length)
                for (let j = 0; j < tbody.rows[i].cells.length; j++) {
                    tbody.rows[i].cells[j].id = liste[i][j]}
                }
        }
    }
});

/** 
adds a class to all cells of the table. The class must be provided as a string (hence classe).
The class is added to all cells of the table (including headers) if includeHeaders is set to true.
*/
Object.defineProperties(Object.prototype, {
    bAddClassToCells: {
        value: function(className, includeHeaders = false) {
            assert(typOf(className) == 'str')
            let classen = className.split(' ')

            for (let cls of classen) {
                assert(typOf(cls) == 'str')
                assert(cls.containsOnlyAbc123('-'))}

            let cells = this.getElementsByTagName('td');
            for (let i = 0; i < cells.length; i++) {
                for (let classe of classen) {
                   if (!cells[i].classList.contains(classe)) cells[i].classList.add(classe)
                   }
            }

            if (includeHeaders) {
                let cells = this.getElementsByTagName('th');
                for (let i = 0; i < cells.length; i++) {
                    for (let classe of classen) {
                        if (!cells[i].classList.contains(classe)) cells[i].classList.add(classe)
                        }
                }
            }
        }
    }
});

/** 
sets 
*/
Object.defineProperties(Object.prototype, {
    bSetCellsClass: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows.length -1 == liste.length)

            let tbody = this.querySelector('tbody');

            for (let i = 0; i < tbody.rows.length; i++) {
                assert(tbody.rows[i].cells.length == liste[i].length)
                for (let j = 0; j < tbody.rows[i].cells.length; j++) {
                    tbody.rows[i].cells[j].className= liste[i][j]}
                }
        }
    }
});

// ####################################################################################################
// region _String                                                                                    #
// ####################################################################################################

/** 
returns a substring, starting from the beginning (index 0) and going up to, but not including, the first occurrence of a specified text
If the specified text is not found, it returns the entire string. If the specified text is an empty string, it also returns the entire string.
*/
Object.defineProperties(String.prototype, {
    until: {
        value: function(text) {
            if (text == '') {return this.substring(0)}     

            let idx = this.indexOf(text)
            if (idx == -1) { 
                return this.substring(0)}
            return this.substring(0,idx)
        }
    } 
});


/**
returns the number of occurrences of a specified character in the string.
If the string is empty, it returns 0.
*/
Object.defineProperties(String.prototype, {
    count: {
        value: function(c) {
            if (c == '') return 0
            return this.split(c).length - 1;
        }
    }
});
/** 
 * returns the count of characters from the beginning of the string that are in the provided list of characters.
 * If the string is empty, it returns 0.
*/
Object.defineProperties(String.prototype, {
    countBeginningChars: {
        value: function(listOfChars) {
            if (this.length === 0) return 0;

            let count = 0;
            for (let i = 0; i < this.length; i++) {
                if (listOfChars.includes(this[i])) {
                    count++;} 
                else {
                    break}
            }
            return count;
        }
    }
    });

/** 
returns a substring, starting from, but not including, the first occurrence of a specified text until the end of the ego string
*/
Object.defineProperties(String.prototype, {
    after: {
        value: function(text) {
            if (text == '') {return this.substring(0)} 

            let idx = this.indexOf(text)
            if (idx == -1) { 
                return this.substring(0)}
            return this.substring(idx + text.length)
        }
    } 
});

/** 
returns true if the ego string ends with any of the strings in the listOfPossibleEndings, false otherwise.
*/
Object.defineProperties(String.prototype, {
    endsWiths: {
        value: function(listOfPossibleEndings) {
            assert (typOf(listOfPossibleEndings) == 'list')
            for (let e of listOfPossibleEndings) {
                if (this.endsWith(e)) return true
            }
            return false
        }
    } 
});

/** 
returns a list (array) of all sequences of digits (whole numbers) occuring in the string, with the option to specify min and max lengths for the digit sequences.
Default min is 1, defualt max is unlimited 
*/
Object.defineProperties(String.prototype, {
    digits: {
        value: function(min, max) {
            if (min == undefined) min = 1
            if (max == undefined) max = ''
            const regex = new RegExp(`\\b\\d{${min},${max}}\\b`, 'g');
            const matches = this.match(regex);
            return matches || [];
          }
        }
});

/** 
returns true if the ego string is a digit, false otherwise
*/
Object.defineProperties(String.prototype, {
    isDigit: {
        value: function(DecimalSeperator) {
            if (DecimalSeperator != undefined) assert (DecimalSeperator == ',' || DecimalSeperator == '.')
            else DecimalSeperator = ''
            
            let allowedDigits = '0123456789'
            const allowedChars = allowedDigits + DecimalSeperator

            if (this.count(DecimalSeperator) > 1) return false

            for (let i = 0; i < this.length; i++) {
                let c = this.charAt(i)

                if (i == 0 && c == DecimalSeperator) return false
                if (i == this.length - 1 && c == DecimalSeperator) return false
                if (!allowedChars.includes(c)) return false
            }
            return this.length > 0;  // if the string (= this) is empty return false, otherwise true
          }
        }
});

/** 
returns true if the ego string containts only lower case letters, false otherwise. Empty strings are considered as false. Blank spaces are not considered as false
*/
Object.defineProperties(String.prototype, {
    isLowerCase: {
        value: function() {
            if (!this.length) return false;
            
            for (let i = 0; i < this.length; i++) {
                if (this.charAt(i) < 'a' || this.charAt(i) > 'z') return false
            }
            
            return true;
        }
    }
});

/** 
returns true if the ego string containts only letters frrom letters. E. g. 'Hello World'.ContainsOnly('Helo Wrd') returns true, 'Hello World'.ContainsOnly('HeloWrd') returns false.
Empty strings are considered as false.
*/
Object.defineProperties(String.prototype, {
    containsOnly: {
        value: function(letters) {
            if (!this.length) return false;
            
            for (let i = 0; i < this.length; i++) {
                if (!letters.includes(this[i])) return false
            }
            
            return true;
        }
    }
});

/** 
returns true if the ego string containts only letters from 'a'-'z' and 'A'-Z' and  + additionalChars, false otherwise. Empty strings are considered as false. Blank spaces are considered as false
*/
Object.defineProperties(String.prototype, {
    containsOnlyAbc: {
        value: function(additionalChars) {
            let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' + additionalChars
            return this.containsOnly(letters)
        }
    }
});

/** 
returns true if the ego string containts only letters from 'a'-'z' and 'A'-Z', numbers 0-9 and additionalChars, false otherwise. Empty strings are considered as false. Blank spaces are considered as false
*/
Object.defineProperties(String.prototype, {
    containsOnlyAbc123: {
        value: function(additionalChars) {
            let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' + additionalChars
            return this.containsOnly(letters)
        }
    }
});

/** 
returns true if the ego string is a valid json string, false otherwise
*/
Object.defineProperties(String.prototype, {
    isJSON: {
        value: function() {
            try {
                JSON.parse(this);
                return true;
            } catch (e) {
                return false;
            }
          }
        }
});

/**
replaced N occurences of a specified text with another text up to n times.
*/
Object.defineProperties(String.prototype, {
    replaceN: {
        value: function(re, place, n = 1000) {
            let ret = String(this)
            for (let i = 0; i < n; i++) {
                if (ret.includes(re)) {
                    ret = ret.replace(re,place)}
                else {
                    break}
            }
            return ret;
        }
    } 
});


/**
does multiple replacements in the ego string, with the option to specify a list of replacements. 
1) if std is true, it will apply the build in trim() function.
2) if multiSpace is true, it will remove all multiple spaces inside the string
3) if plusList is provided, it will remove all spaces in the specified patterns. 
*/
Object.defineProperties(String.prototype, {
    trimPlus: {
        value: function(plusList, multiSpace = true, std = true) {
            let ret = String(this)
            // Plus: specifically will remove all spaces if seen in specifc pattern 
            if (typOf(plusList) == 'list') {
                for (element of plusList) {
                    if (element.includes(' ')){
                        let rpl = element.replace(RegExp(' ', 'g'), '')
                        // ret = ret.replace(RegExp(element, 'g'), rpl)       might lead to failue
                        ret = ret.replaceN(element, rpl)
                    } 
                }
            }
            // Plus: generically will remove all multi spaces inside with normal blank space. 
            if (multiSpace) ret = ret.replace(/  +/g, ' ');
            // Standard: removes starting and ending spaces
            if (std) ret = ret.trim()               
            return ret
        }

    } 
});

/**
returns a substring, starting from the first occurrence of 'bet' until 'ween'. If 'bet' or 'ween' is not found, it returns an empty string.
*/
Object.defineProperties(String.prototype, {
    between: {
        value: function(bet, ween) {
            let ret = String(this)
            let startIdx = ret.indexOf(bet);
            if (startIdx === -1) return '';
            startIdx += bet.length;
            let endIdx = ret.indexOf(ween, startIdx);
            if (endIdx === -1) return '';
            return ret.substring(startIdx, endIdx);
        }
    } 
});

/**
toggles the string between two specified texts, 'a' and 'b'. There's no return value.
*/
Object.defineProperties(String.prototype, {
    toggle: {
        value: function(a, b) {
            if (String(this) == a) return b
            if (String(this) == b) return a

            return String(this)
        }
    } 
});

/**
returns a shrinked string representation. If the string length is less than or equal to maxLength, it returns the original string.
If the string length exceeds maxLength, it truncates the string to fit within maxLength by preserving the start and end segments and inserting '...' in between.
The minimum value for maxLength is 10.
 */
Object.defineProperties(String.prototype, {
    shrinkTo: {
        value: function(maxLength) { 
            if (maxLength == undefined || typOf(maxLength) != 'int') maxLength = 10
            if (maxLength < 10) maxLength = 10

            let str = String(this);
            if (str.length <= maxLength) return str

            let dot3 = '...';
            return str.substring(0, maxLength-dot3.length-2) + dot3 + str.substring(str.length-3, str.length-1);
        }
    }
});

class clsTest {
    constructor() {
        this.cases = [];
        this.mode = "test"
        this.halt = false
        this.silentCounter = 0
    }

// ##################################################################################
// # Checker                                                                        #
// ##################################################################################
    SetTestMode() {
        if (this.mode == "silent" && this.silentCounter >0) {
            this._pushTestResult(String(this.silentCounter) + ' tests passed executed in silent mode and passed', 'passed','')}
        this.mode = "test"
        this._pushTestResult('<div class="navy font-w600"> Normal Test Mode activated</div>', 'passed','')
    }

    SetSilentMode() {
        this.mode = "silent"
        this.silentCounter = 0
        this._pushTestResult('<div class="navy font-w600"> Silent Mode activated</div>', 'passed','')
    }

    // This will pause the program when a test failes. your dev tools must be open.
    SetHaltOnFail() {
        this.halt = true
    }

    Info(msg) {
        this._pushTestResult(msg, 'information','')
    }

    Action(msg) {
        this._pushTestResult('[ACTION] ' + msg, 'acion','')
    }

    NewLine() {
        this._pushTestResult(' ', '-','')
    }

    _pushTestResult(fname, result, msg) {
        this.cases.push([fname, result, msg])
    }

    _passed(name, msg) {
        if (msg == undefined) msg = ''
        if (this.mode == "test") {
            this._pushTestResult(name, 'passed', msg)}
        if (this.mode == "silent") {
            this.silentCounter += 1}
        
    }

    _failed(name, msg) {
        if (msg == undefined) msg = ''
        if (this.halt) {
            debugger;
        }
        this._pushTestResult(name, 'failed', msg)
    }




// ##################################################################################
// # Checker                                                                        #
// ##################################################################################

    Equal(a,b, name) {
        if (this._IsEqual(a,b)) {
            return this._passed(name)}
        else {
            return this._failed(name, " " + a + " not equal to " + b + ". ")}
    }

    IsTrue(a, name) {
        if(a) return this._passed(name);
        return this._failed(name, "failed");
    }

    ErrorSeen(foo_or_obj, p, fooName) {
        if (typeof foo_or_obj == 'object') return this._Assertion_Object(ffoo_or_obj, p , fooName); 

        if (typeof foo_or_obj == 'function') return this._Assertion_Function(foo_or_obj, p , fooName); 

        throw new Error(":you should not be here. ErrorThrown")
    }

// ##################################################################################
// # Checker helper                                                                 #
// ##################################################################################

    _t(variable) {
        if (Array.isArray(variable)) return 'list'
        if (typeof variable === 'object' && variable !== null) return 'dict'
        if (typeof variable === 'string') return 'str'
        if (typeof variable === 'number') return 'int'
        if (typeof variable === 'boolean') return 'bool'
        if (variable === null) return 'null'
        if (variable === undefined) return 'undefined'
    }

    _IsEqual(a,b, max_iterations = 10) {
        if (max_iterations<1) return false
        
        if (this._t(a)!=this._t(b)) return false
    
        if (['bool', 'int', 'str', 'null', 'undefined'].includes(this._t(a)) && (a == b)) return true

        if (['list'].includes(this._t(a)) && (a.length == b.length)) {
            for (let i = 0; i< a.length; i++) {
                if (this._IsEqual(a[i], b[i], max_iterations-1) == false) return false}
            return true}

        if (['dict'].includes(this._t(a)) && (Object.keys(a).length == Object.keys(b).length)) {
            for (let key of Object.keys(a)) {
                if (!b.hasOwnProperty(key)) return false}

            for (let key of Object.keys(a)) {
                if (this._IsEqual(a[key], b[key], max_iterations-1) == false) return false}
            return true}
        
        return false
        }

    _Assertion_Function(foo, p , fname) {
        try {
            foo(p["a"], p["b"], p["c"], p["d"])
        } catch (error) {
            return this._passed(fname, "Error was thrown")
        } 
        return this._failed(fname, "Error was not thrown")
        
    }
    
    _Assertion_Object(obj, p , fname) {
        try {
            new obj.constructor(p["a"], p["b"], p["c"], p["d"])
        } catch (error) {
            return this._passed(fname, "Error was thrown")
        } 
        return this._failed(fname, "Error was not thrown")
        
    }

// ##################################################################################
// # Print                                                                          #
// ##################################################################################

    PrintResult(targetDivID, tableID, addStyle = true) {
        if (addStyle) document.head.appendChild(this._style());   
        let targetDiv = document.getElementById(targetDivID)
        if (!targetDiv.classList.contains('js-fill'))  return
        targetDiv.append(this._table(tableID));
    }

    PrintToPopUp() {
        let popup = window.open("", "myPopup", "width=800,height=600");
        let doc = popup.document;

        // structure
        doc.open();
        let html = doc.createElement("html");
        let head = doc.createElement("head");
        let body = doc.createElement("body");

        head.appendChild(this._style());  
        body.appendChild(this._table())

        // build
        html.appendChild(head);
        html.appendChild(body);
        doc.appendChild(html);
        doc.close();
    }
        
    _style() {
        let style = document.createElement('style');
        let css = `
            body {
                background-color: #222;
                color: #ddd;
            }
            table, th, td {
                border: 1px solid #444;
                border-collapse: collapse;
                margin: 5px;
                padding: 5px;
                padding-right: 20px;
            }
            td.failed {
            background-color: #CC0000;
            color: #e2d6d6;
            }
            `;

        style.appendChild(document.createTextNode(css));
        return style
    }

    _table(tableID) {
        let table = document.createElement('table')
        let thead = document.createElement('thead')
        let tbody = document.createElement('tbody');

        thead.append(this._tableRow('th', ['no.', 'name', 'result', 'message']))

        for (let i = 0; i< this.cases.length; i++) {
            tbody.append(this._tableRow('td', [i+1].concat(this.cases[i])))}

        table.append(thead)
        table.append(tbody)

        if (tableID != undefined) table.id = tableID
        return table
    }

    _tableRow(tx, arr) {
        let row = document.createElement('tr')

        for (let item of arr) {
            let cell = document.createElement(tx)
            if (item == 'failed') cell.classList.add('failed')
            cell.innerHTML = item
            row.append(cell)}
        
        return row
    }
}
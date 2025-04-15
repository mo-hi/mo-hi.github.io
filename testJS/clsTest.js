class clsTest {
    constructor() {
        this.cases = [];
    }

    _pushTestResult(fname, result, msg) {
        this.cases.push([fname, result, msg])
    }

    _passed(name, msg) {
        if (msg == undefined) msg = ''
        this._pushTestResult(name, 'passed', msg)
    }

    _failed(name, msg) {
        if (msg == undefined) msg = ''
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
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

// ##################################################################################
// # Checker                                                                        #
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

// ##################################################################################
// # Print                                                                          #
// ##################################################################################

    PrintResult(targetDiv) {
        document.getElementById(targetDiv).innerHTML = String(this.cases).replace(/,,/g, '<br>').replace(/ ,/g, '<br>')
    }
        
}
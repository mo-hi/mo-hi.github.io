// ####################################################################################################
// region basis                                                                                           #
// ####################################################################################################

function typOf(variable, extendedInfo = false) {
    if (Array.isArray(variable)) {
        if (extendedInfo) {
            return 'list' + '-' + String(ListDepth(variable)) + 'D'}
        return 'list'} // javascript 'Array'
    if (typeof variable === 'object' && variable !== null) {
        return 'dict'} // javascript 'Object'
    if (typeof variable === 'string') {
        return 'str'}
    if (typeof variable === 'number') {
        return 'int'}
    if (typeof variable === 'boolean') {
        return 'bool'}
    if (variable === null) {
        return 'null'}
    if (variable === undefined) {
        return 'undefined'}

    assert(false, String(variable))
}

function wenn(condition, trueValue, falseValue) {
    return condition ? trueValue : falseValue;}
// ####################################################################################################
// region DOM                                                                                             #
// ####################################################################################################

function DOM_Replace(re, place, tags) {
    if (re == undefined || place == undefined) return -1
    if (typOf(re) != typOf(place)) return -1
    if (!['str', 'list'].includes(typOf(re))) return -1
    if (tags == undefined) tags = ['div', 'a', 'p', 'th', 'td']

    if (typOf(re) == 'str') {
        re = [re]
        place = [place]}
 
    _DOM_Replacer(re, place, tags)
  }


  function _DOM_Replacer(re, place, tags) {
    tags.forEach(tag => {
        let elements = document.querySelectorAll(tag);
        elements.forEach(element => {
            for (let i = 0; i<re.length; i++) {
                element.innerHTML = [element.innerHTML].replace(re[i],place[i])[0]
            }
        })
    })
  }
// ####################################################################################################
// region Array                                                                                      #
// ####################################################################################################

/** 
returns the max depth of an array.
As this function uses recursion you can limit the level of recursions, default limit is 9.
*/
Object.defineProperties(Array.prototype, {
    depth: {
        value: function(limit_Recursions) {

            function recursiveDepth(arr) {
                if (limit_Recursions == undefined) limit_Recursions = 9
                if (!Array.isArray(arr)) return 0
                let ret = 0;
                for (let item of arr) {
                    ret = Math.max(ret, recursiveDepth(item));
                    if (ret >= limit_Recursions) {
                        ret = limit_Recursions-1
                        break}}
                return ret + 1
            }

            return recursiveDepth(this)
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
adds to the string of each of its items a 'prefix' and a 'postfix'.
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
// ####################################################################################################
// region DOMTables                                                                                  #
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
// region String                                                                                     #
// ####################################################################################################

/** 
returns a substring, starting from the beginning (index 0) and going up to, but not including, the first occurrence of a specified text
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

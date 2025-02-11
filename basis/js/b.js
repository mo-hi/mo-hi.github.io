// ####################################################################################################
// region basis                                                                                           #
// ####################################################################################################

/**
returns the type of a variable as a string. The following types are recognized:
 list, dict, str, int, bool, null, undefined
*/
function typOf(variable, extendedInfo = false) {
    if (Array.isArray(variable)) {
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
    
    throw new Error('Unknown type of variable: ' + variable)
}

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

/**
returns a dictionary with the keys from keys and values from values. Length of keys and values must be equal.
*/
function dictionary(keys, values) {
    assert(keys.length == values.length, "Length of keys and values must be equal")
    
    let ret = {}
    for (let i = 0; i < keys.length; i++) {
        ret[keys[i]] = values[i]
    }
    return ret
}
      
// ####################################################################################################
// region content_divTable                                                                                #
// ####################################################################################################

/**
return a div table. Provide either cols or json! <br>
When cols[int] is provided,  an empty table with cols collums and 0 rows is returned <br>
With json is provided, a table with the json dataset is returend. <br>
*/
function b_divTable({cols, json}) {
    let f = new b_divTable_functionContainer()
    assert(!(cols !== undefined && json !== undefined))
    assert(!(cols == undefined && json == undefined))
    
    if (cols) return f.TableEmpty_Cols(cols)

    if (json) {
        assert(typOf(json) == "list")
        json.every(item => assert(typOf(item) == 'dict'))
        let table = f.Skeleton(0, json[0].keys().length)
        table.b_divTable_SetHeaders(json[0].keys())
        table.b_divTable_AddRows(json)
        return table}

    assert(false)
}



class b_divTable_functionContainer {
    constructor () {
        // nothing, it's a function Container
    }
    
    TableEmpty_Cols(cols) {
        assert(typOf(cols) == 'int')
        let table = this.Skeleton(0, cols)
        return table;
    }

    Skeleton(rows, cols) {
        let thead = document.createElement('thead')
        thead = this.Rows(thead, 'th', 1, cols)
        
        let tbody = document.createElement('tbody');
        tbody = this.Rows(tbody, 'td', rows, cols)
    
        let table = document.createElement('table')
        table.appendChild(thead)
        table.appendChild(tbody);
    
        return table;
    }
    
    Rows(anchor, tx, Nrows, Ncols) {
        if (tx == 'th') assert(Nrows == 1)
    
        let row = document.createElement('tr')
        for (let r = 0; r < Nrows; r++) {
            row = document.createElement('tr')
            for (let i = 0; i<Ncols; i++) {
                row.appendChild(document.createElement(tx))}
            anchor.appendChild(row)
        }
        return anchor
    }
}


// ####################################################################################################
// region content_svg                                                                                     #
// ####################################################################################################

/**
returns svg markup for various icons. The function has two Use Cases: <br><br>

(1) returns a <b>string</b> for a given icon name and a given size. Example: 
<code>b_svg("svg-icon-edit") = "...//svg code...width=24 height=24 ..." <br>
        b_svg("svg-icon-edit", 16) = "...//svg code...width=16 height=16 ..."  
</code> <br>

(2) returns a <b>dictionary</b>. The keys are the svg name, the value is the return value from Use Case 1. Example:
<code> b_svg() = { "svg-icon-edit-24": "....", "svg-icon-grid-24": "...", ...} <br>
b_svg([16,24]) = { "svg-icon-edit-16": "...", "svg-icon-grid-16": "...", "svg-icon-edit-24": "...", ...} </code> 

The follwoing icon names are available (among others):<br>
svg-icon-edit<br>
svg-icon-grid<br>
svg-icon-menu<br>
svg-icon-search<br>
svg-icon-filter<br>
svg-icon-download<br>
svg-icon-upload<br>
svg-icon-save<br>
svg-icon-discard<br>
 */
function b_svg(name, size) {
let svg = { 
    'svg-icon-edit': `
        <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="currentColor" stroke-width="2">
            <path d="M16 2 l3 3 l-3 3 l-3 -3 z"/>  
            <path d="M4 14 v3 h3 l7.5-7.5 l -3 -3 z"/>
            <path d="M4 22h16" stroke-width="2"/>   
        </svg>
    `,
    'svg-icon-grid': `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
            <rect x="3" y="3" width="8" height="8" rx="1" ry="1"/>
            <rect x="13" y="3" width="8" height="8" rx="1" ry="1"/>
            <rect x="3" y="13" width="8" height="8" rx="1" ry="1"/>
            <rect x="13" y="13" width="8" height="8" rx="1" ry="1"/>
        </svg>
    `,
    'svg-icon-menu': `
    <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path d="M3 6h18" />
        <path d="M3 12h18" />
        <path d="M3 18h18" />
    </svg>
    `,
    'svg-icon-search': `
        <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="10" cy="10" r="6" fill="none"/>
            <path d="M16 16 l5 5" stroke-linecap="round"/>
        </svg>
    `,
    'svg-icon-filter': `
        <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M3 6h18" />
            <path d="M6 12h12" />
            <path d="M9 18h6" />
        </svg>
    `,
    'svg-icon-download': `
        <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path d="M12 5 v10" />
            <path d="M6 12 l6 4 l6 -4" fill="none"/>
            <path d="M3 20 h18" />
        </svg>
    `,
    'svg-icon-upload': `
        <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path d="M12 5 v12" />
            <path d="M6 10 l6 -4 l6 4" fill="none"/>
            <path d="M3 20 h18" />
        </svg>
    `,
    'svg-icon-save': `
        <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
            <path d="M8 2 L4 2 L2 4 L2 20 L4 22 L20 22 L22 20 L22 4 L20 2 L12 2 L12 16" />
            <path d = "M6 12L 12 16L 18 12"/>
        </svg>
    `,
    'svg-icon-discard': `
    <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
        <path d="M6 6 l12 12" />
        <path d="M6 18 l12 -12" />
    </svg>
    `,
    'svg-icon-heart': `
    <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
        <path d="M 12 20
            L 4 12
            C -2 6 8 0 12 6 
            C 16 0 26 6 20 12
            z"/>
    </svg>
    `,
    'svg-icon-heartFill': `
    <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="currentColor">
        <path d="M 12 20
            L 4 12
            C -2 6 8 0 12 6 
            C 16 0 26 6 20 12
            z"/>
    </svg>
    `,
    'svg-icon-check': `
        <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
        <path d="M 4,14
            L12,20
            L22,6"/>
        </svg>
    `,

}
    if (name == undefined) return _svg_All(['24'], svg) 
    
    if (typOf(name) == 'list') return _svg_All(name, svg) 

    if (typOf(name) != 'str') return undefined
    
    let sizeInName = undefined
    if (/-\d+$/.test(name)) {   // check if name ends with '-x', where x is a number (not digit)
        let match = name.match(/-(\d+)$/)
        name = name.until(match[0])                 // match[0] = '-24', whole regex
        sizeInName = parseInt( match[1], 10)}       // match[1] = '24', only capture
    if (! svg.keys().includes(name))   return

    if (size == undefined && sizeInName == undefined) size = 24
    if (size == undefined) size = sizeInName

    let svgString = svg[name].replace('width="24"', 'width="' + String(size) + '"').replace('height="24"', 'height="' + String(size) + '"')
    return svgString
}

function _svg_All(sizes, dict) {
    let ret = {}
    for (let size of sizes) {
        size = String(size)
        for (let d of dict.keys()) {
            ret[d + '-' + size] = dict[d].replace('width="24"', 'width="' + String(size) + '"').replace('height="24"', 'height="' + String(size) + '"')
        }
    }
    return ret
}
// ####################################################################################################
// region DOM                                                                                             #
// ####################################################################################################

/**
replaces the content of specified tags within a given element.
*/
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

/**
returns the DOM/div element to where the event was triggered. The element must have the class 'js-event'
*/
function DOM_ElementFromJSEvent(event) {
    let divElement = null;
    if (event instanceof PointerEvent) divElement = event.target;   // if eventlistener was used
    if (event instanceof HTMLElement) divElement = event;           // if setAttribute / direct HTML was used
    if (event instanceof TouchEvent) divElement = event.target;     // if eventlistener was used
    if (divElement == null) return

    /// target may be pointing to childrean of the intended target. Loop Up 100 parents.
    for (i = 0; i < 100; i++) {
        if (!divElement.classList.contains('js-event')) divElement = divElement.parentElement}      
    if (!divElement.classList.contains('js-event')) return

    return divElement
}
// ####################################################################################################
// region htmlManipulation                                                                                #
// ####################################################################################################

/**
Modifies your html page by filling in the values of the provided list of dictionaries.
*/
function Auto_Fill(listOfDictionaries, elementId = "body", compareKeys = []) {
    let container = document.getElementById(elementId);
    if (elementId == "body") container = document.body
    if (!container) return 
  
    let template = container.innerHTML
    let lastVaues = {}
    
    if (!['list', 'dict'].includes(typOf(listOfDictionaries))) return
    if (typOf(listOfDictionaries) == 'dict') listOfDictionaries = [listOfDictionaries]

    container.innerHTML = "";
    listOfDictionaries.forEach(item => {
        let nextString = template
    
        for (let key in item) {
            if (compareKeys.includes(key) && lastVaues[key] == item[key]) {
                nextString = nextString.replace(new RegExp(`{{${key}}}`, 'g'), '')}
            else {
                nextString = nextString.replace(new RegExp(`{{${key}}}`, 'g'), item[key])}
            
            lastVaues[key] = item[key]
            }
        container.innerHTML += nextString
    });
}

/**
Modifies your html page by adding a textarea with a div's innerHTML.
*/
function ShowHTMLinTextArea(divToExpose, divToAppend) {
    let textarea = document.createElement('textarea');
    textarea.id = 'htmlSource';
    textarea.spellcheck = false;
    textarea.style.width = '100%';
    textarea.style.height = '100%';

    let htmlSource = undefined
    if (typOf(divToExpose) == 'str') {
        htmlSource = divToExpose}
    if (divToExpose instanceof HTMLElement) {
        htmlSource = divToExpose.innerHTML;
        if (divToExpose.tagName.toLowerCase() === 'script') {
            textarea.classList.add('script') 
        }
    }
    if (htmlSource == undefined) return
    
    textarea.value = _filteredLines(htmlSource, '#IGNORE')
    divToAppend.appendChild(textarea);   
    return textarea                                                                                                                                        
}

function _filteredLines(text, filterWord) {
    let lines = text.split('\n')
                    .filter(line => !isBlank(line) && !line.includes(filterWord));

    let Indent = Math.min(...lines.map(line => line.match(/^\s*/)[0].length));

    return lines.map(line => line.slice(Indent).trimEnd()).join('\n');
}



function isBlank(str) {
    return !/[^\t\r\n\v\f ]/.test(str);
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
returns true if the ego arry is of depth 2 and all sub arrays are of equal length, otherwise false
*/
Object.defineProperties(Array.prototype, {
    Is2DTable: {
        value: function(minSubLength = 2, withHeaders = true) {
            if (this.length == 0) return false
            if (withHeaders && this.length == 1) return false
            if (this.depth()!= 2) return false

            let subLength = this[0].length
            for (let item of this) {
                if (typOf(item) != 'list') return false
                if (item.length < minSubLength) return false
                if (item.length != subLength) return false
            }

            return true
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
// ####################################################################################################
// region Collection                                                                                 #
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
            this.push(dictionary(keys, array2D[i]))
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
            if (item[key]) delete item[key]
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
    returns a new collection with the subset of elements which have the specified key
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
// region Dictionary                                                                                 #
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
// ####################################################################################################
// region DIV                                                                                        #
// ####################################################################################################

/**
returns all descendats (children and grandchildren) of a div that have a certain className
*/
Element.prototype.DescendantsWithClass = function(className) {
    if (!className.startsWith('.')) throw new Error('className must start with a "."');
    className = className.after(".")

    let results = [];
  
    function traverse(element) {
      if (element.classList && element.classList.contains(className)) {
        results.push(element);
      }
      for (const child of element.children) {
        traverse(child);
      }
    }
  
    traverse(this); 
  
    return results;
  };

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
adds a 'click' and a 'touchstart' evenlistener event to the ego element. The ego element must have the class 'js-event'
*/
Element.prototype.JSEvent_AddClickTouch = function(functionName) {
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
Object.defineProperty(DOMTokenList.prototype, 'addX', {
    value: function(className) {
        if (!this.contains(className)) {
            this.add(className);
        }
    },
    enumerable: false, // Prevents the method from showing up in for...in loops
    configurable: true // Allows the property to be deleted or modified later
});
// ####################################################################################################
// region DivTables                                                                                  #
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
adds new rows to a table. 
If liste is a list of dictionaries, then the innerHTML of each cell will be set to the value of the 
key identical to the header.
*/
Element.prototype.b_divTable_AddRows = function(liste) {
    assert(this.tagName == 'TABLE');

    let tbody = this.querySelector('tbody');
    
    // Handle 2D array
    if (typOf(liste) == 'list' && typOf(liste[0]) == 'list') {
        // to be implemented
        return
    }

    // Handle list of dictionaries
    if ((typOf(liste) == 'list' && typOf(liste[0]) == 'dict')) {
        let headers = Array.from(this.querySelectorAll('thead th')).map(th => th.innerHTML);

        for (let i = 0; i < liste.length; i++) {
            let row = tbody.insertRow();
            for (let j = 0; j < headers.length; j++) {
                let cell = row.insertCell();
                let key = headers[j];
                cell.innerHTML = liste[i][key];
            }
        }
        return 
    }
}
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

/** 
returns true if the ego string is a digit, false otherwise
*/
Object.defineProperties(String.prototype, {
    isDigit: {
        value: function() {
            for (let c of this) {
                if (!'0123456789'.includes(c)) return false
            }
            return true
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

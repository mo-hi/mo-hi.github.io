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
    if (typeof variable === 'function') {
        return 'function'}
    
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

/**
returns an array of numbers from 'from' to 'to'.
*/
function NumbersFromTo(from, to, asString = false) {
    let ret = [];
    for (let i = from; i <= to; i++) {
        ret.push(asString ? String(i) : i);
    }
    return ret;
}
   
/**
delays a function call.
*/
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
returns all event listeners of the current page. The function uses the native getEventListeners function of Chrome DevTools. 
The function is for develooment purposes only and should not be used in production code.
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


  function byVal(data) {
    // Creates a hard copy of a variable (instead of just createing a reference in case of list and dictioaries). 
    // It mimics the 'byVal' operater in VBA, hence the name
    
    if ( ["bool", "str", "int"].indexOf(typOf(data)) >-1) {
        return data} // as they are 'hard copied' by default

    if (typOf(data) == "list") {
        let ret = []
        for (let element of data) {
            ret.push(byVal(element))}
        return ret}
    
    if (typOf(data) == "dict") { 
        let ret = { }
        let keys= Object.keys(data)
        for (let key of keys) {
            ret[key] = byVal(data[key])}
        return ret}
    
    if (typOf(data) == "function") {
        return data.bind({});
    }
    return data
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
returns the DOM/div element to where the event was triggered. The element must have the class 'js-event'.
In looks up to 100 parents to find the element with the class 'js-event'.
If force is set to true, the function will return the clickd element even if it does not have the class 'js-event'. In this case, the function will not look up.
*/
function DOM_ElementFromJSEvent(event, force = false) {
    let divElement = null;
    if (event instanceof MouseEvent) divElement = event.target;     // if eventlistener was used
    if (event instanceof PointerEvent) divElement = event.target;   // if eventlistener was used
    if (event instanceof HTMLElement) divElement = event;           // if setAttribute / direct HTML was used
    if (event instanceof TouchEvent) divElement = event.target;     // if eventlistener was used
    
    if (divElement == null) return
    if (force) return divElement

    /// target may be pointing to childrean of the intended target. Loop Up 100 parents.
    for (i = 0; i < 100; i++) {
        if (!divElement.classList.contains('js-event')) divElement = divElement.parentElement}     
    
    if (!divElement.classList.contains('js-event')) return
    return divElement
}

/**
removes the class from all elements of the document that have this class.
*/
function DOM_RemoveClassFromAll(className) {
    if (!className.startsWith('.')) throw new Error('className must start with a "."');
    className = className.after(".")
    document.querySelectorAll("."+className).forEach(item => {item.classList.remove(className);});
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
    if (!container.classList.contains('js-fill')) console.log('WARNING! The target div does not have the class "js-fill"')
  
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
function ShowHTMLinTextArea(divToExpose, divToAppend, outer) {
    let textarea = document.createElement('textarea');
    textarea.id = 'htmlSource';
    textarea.spellcheck = false;
    textarea.style.width = '100%';
    textarea.style.height = '100%';

    let htmlSource = undefined
    if (typOf(divToExpose) == 'str') {
        htmlSource = divToExpose}
    if (divToExpose instanceof HTMLElement) {
        htmlSource = wenn(outer, divToExpose.outerHTML, divToExpose.innerHTML);
        if (divToExpose.tagName.toLowerCase() === 'script') {
            textarea.classList.add('script') 
        }
    }
    if (htmlSource == undefined) return
    
    textarea.value = _filteredLines(htmlSource, '#IGNORE')
    if (!divToAppend.classList.contains('js-fill')) console.log('WARNING! The target div does not have the class "js-fill"')
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
// region popup                                                                                           #
// ####################################################################################################

/**
opens a popup with a custom header and message. The popup can be closed by (a) clicking the close button, (b) anywhere outside the popup, (c) pressing the Escape key.
*/
function popup(header, message) {
    if (header === undefined) header = "Pop-up";
    if (message === undefined) message = "This is a pop-up message.";
    let popup = document.createElement("div");
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

    // Add event listener to close the popup when clicking anywhere (= the popup container)
    document.getElementsByClassName("popup-container")[0].addEventListener("click", _closePopup_skvzqplyj48xk28)

    document.addEventListener("keydown", function escListener(event) {
        if (event.key === "Escape") {
            _closePopup_i93nf(popup) ;
            document.removeEventListener("keydown", escListener);}
    });
}

function _closePopup_skvzqplyj48xk28 (event) {
    let popupContainer = document.getElementsByClassName("popup-container")[0];
    let popupCloseButton = document.getElementsByClassName("popup-close-button")[0];
    if (event.target === popupContainer || event.target === popupCloseButton) {
        let popup = document.getElementById("myPopup");
        if (popup) _closePopup_i93nf(popup)
    }
}

function _closePopup_i93nf(popup) {
        popup.classList.remove("active");
            setTimeout(() => {
                popup.remove();
            }, 300); // Match the duration of the fade-out transition
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

/**
return the index of the header with the given name.
If the header is not found, it returns -1.
 */

Element.prototype.b_HeaderIndex = function(headerName) {
    assert(this.tagName == 'TABLE');
    let headers = Array.from(this.querySelectorAll('thead th'));
    for (let i = 0; i < headers.length; i++) {
        if (headers[i].innerHTML == headerName) return i;
    }
    return -1; // Header not found
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
        value: function() {
            for (let c of this) {
                if (!'0123456789'.includes(c)) return false
            }
            return true
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
replaced all occurences of a specified text with another text up to n times. This is a alternative for regex replace, which might in some cases not work as expected.
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

const FromFile_FunctionsInfo_JS = [
    {
        "name": "typOf",
        "docstring": "returns the type of a variable as a string. The following types are recognized:\n list, dict, str, int, bool, null, undefined",
        "parameters": "variable, extendedInfo = false",
        "region": "basis"
    },
    {
        "name": "wenn",
        "docstring": "is a short hand notation / better readability for 'return condition ? trueValue : falseValue';",
        "parameters": "condition, trueValue, falseValue",
        "region": "basis"
    },
    {
        "name": "b_svg",
        "docstring": "returns svg markup for various icons. The function has two usecases, each returning a different daty type\n<br><br>\n\nUsecase 1: single svg string<br>\nreturns the SVG markup string for a given icon name and a given size.\nWhen no size is provided, then the default is 24, i.e. the width and height are both 24.\n<br><br>\n\nUsecase 2: svg dictionary<br>\nWhen no name is provided then all svg markup strings are returned in form of a dictionary with size 24 and all names have the postfix '-24'.\nWhen a list is provided instead of a string for name, \nthen all svg markups are returned in form of a dictionary with the sizes provided in the list.\n<br><br>\n\nThe follwoing icon names are available (among others):<br>\nsvg-icon-edit<br>\nsvg-icon-grid<br>\nsvg-icon-menu<br>\nsvg-icon-search<br>\nsvg-icon-filter<br>\nsvg-icon-download<br>\nsvg-icon-upload<br>\nsvg-icon-save<br>\nsvg-icon-discard<br>",
        "parameters": "name, size",
        "region": "content"
    },
    {
        "name": "DOM_Replace",
        "docstring": "replaces the content of specified tags within a given element.",
        "parameters": "re, place, tags",
        "region": "DOM"
    },
    {
        "name": "DOM_ElementFromJSEvent",
        "docstring": "returns the DOM/div element to where the event was triggered. The element must have the class 'js-event'",
        "parameters": "event",
        "region": "DOM"
    },
    {
        "name": "depth",
        "docstring": "returns the max depth of an array.\nAs this function uses recursion you can limit the level of recursions, default limit is 9.",
        "parameters": "limit_Recursions",
        "region": "Array"
    },
    {
        "name": "count",
        "docstring": "returns the number of occurances of an item in an array. Identity is checked with the '===' operator.",
        "parameters": "item",
        "region": "Array"
    },
    {
        "name": "replace",
        "docstring": "replaces the string for each of its items, according to the inputs 're' and 'place'. \nIt will only be applied to elements of the ego array which are of type string. \nWhen the optional parameter wholeItem is set to true, then the complete element string must be equal to 're'. \nThis function uses recursion, which is limited to 100 iterations.",
        "parameters": "re, place, wholeItem = false, recursion = 0",
        "region": "Array"
    },
    {
        "name": "prepost",
        "docstring": "adds to each of its items a 'prefix' and a 'postfix'.\nIt will only be applied to elements of the ego array which are of type string.",
        "parameters": "prefix, postfix",
        "region": "Array"
    },
    {
        "name": "prepostKey",
        "docstring": "adds to the value of the specified key of each of its items a 'prefix' and a 'postfix'.\nWill only be applied to elements of the ego array which are of type dictionary.\nWil only be applied to values of the ego dictionary which are of type string.\nThis is a wrapper for the dictionary function prepost.",
        "parameters": "key, prefix, postfix",
        "region": "Array"
    },
    {
        "name": "keyValues",
        "docstring": "returns a list/array with the values to the provided 'key' for all dictionary items of the ego array.\nIt will only be applied to elements of the ego array which are of type dictionary/object.",
        "parameters": "key",
        "region": "Array"
    },
    {
        "name": "removeDuplicates",
        "docstring": "returns a reduced list/array of the ego array, where all elements the occur multiple times are removed.",
        "parameters": "",
        "region": "Array"
    },
    {
        "name": "MeWithNewKeys",
        "docstring": "returns a new array with modified keys and old values. \nThis is a wrapper for the dictionary function with the same name MeWithNewKeys.\nWill only be applied to elements of the ego array which are of type dictionary.",
        "parameters": "oldKeys, newKeys",
        "region": "Array"
    },
    {
        "name": "keys",
        "docstring": "returns an array of the object's own keys.",
        "parameters": "",
        "region": "Dictionary"
    },
    {
        "name": "includes",
        "docstring": "returns true if the dictionary contains the specified key, returns false if not.\nIs a short version of 'Object.keys(this).includes(key)'",
        "parameters": "key",
        "region": "Dictionary"
    },
    {
        "name": "MeWithNewKeys",
        "docstring": "returns a new dictionary with the modified keys and their old values.",
        "parameters": "oldKeys, newKeys",
        "region": "Dictionary"
    },
    {
        "name": "prepost",
        "docstring": "modifies the value of the specified key by adding a prefix and a postfix.\nWill only be applied if the value to the provided key is of type string.",
        "parameters": "key, prefix, postfix",
        "region": "Dictionary"
    },
    {
        "name": "bSetHeaders",
        "docstring": "returns all descendats (children and grandchildren) of a div that have a certain className\n*/\nElement.prototype.DescendantsWithClass = function(className) {\n    if (!className.startsWith('.')) throw new Error('className must start with a \".\"');\n    className = className.after(\".\")\n\n    let results = [];\n  \n    function traverse(element) {\n      if (element.classList && element.classList.contains(className)) {\n        results.push(element);\n      }\n      for (const child of element.children) {\n        traverse(child);\n      }\n    }\n  \n    traverse(this); \n  \n    return results;\n  };\n\n\nElement.prototype.IsDescendantOfClass = function(ancestorClass) {\n  if (!ancestorClass.startsWith('.')) throw new Error('className must start with a \".\"');\n  ancestorClass = ancestorClass.after(\".\")\n\n  let current = this;\n  while (current && current !== document.body) { \n    if (current.classList && current.classList.contains(ancestorClass)) {\n      return true;\n    }\n    current = current.parentElement;\n  }\n  return false;\n};\n\n/**\nadds a 'click' and a 'touchstart' evenlistener event to the ego element. The ego element must have the class 'js-event'\n*/\nElement.prototype.JSEvent_AddClickTouch = function(functionName) {\n  if (!this.classList.contains(\"js-event\")) return\n\n  this.addEventListener('click', functionName)\n  this.addEventListener('touchstart', function(event) {\n      event.preventDefault(); // Prevent mouse events\n      functionName(event);     // Call your function\n      });\n};\n\n/**\nadds a single class to a div if not already present\n*/\nObject.defineProperty(DOMTokenList.prototype, 'addX', {\n    value: function(className) {\n        if (!this.contains(className)) {\n            this.add(className);\n        }\n    },\n    enumerable: false, // Prevents the method from showing up in for...in loops\n    configurable: true // Allows the property to be deleted or modified later\n});\n// ####################################################################################################\n// region DOMTables                                                                                  #\n// ####################################################################################################\n\n/** \nsets the table headers innerHTML. The headers must be provided as list/array (hence liste)\nThe length of liste must equal to the table cols length.",
        "parameters": "liste",
        "region": "DOMTables"
    },
    {
        "name": "bSetHeadersID",
        "docstring": "sets the table header ids. The header ids must be provided as list/array (hence liste)\nThe length of liste must equal to the table cols length.",
        "parameters": "liste",
        "region": "DOMTables"
    },
    {
        "name": "bSetHeadersClass",
        "docstring": "sets the table header classNames (i. e. the complete string). The header classnames must be provided as list/array (hence liste)\nThe length of liste must equal to the table cols length.",
        "parameters": "liste",
        "region": "DOMTables"
    },
    {
        "name": "bSetTHeadID",
        "docstring": "sets the thead id.",
        "parameters": "id",
        "region": "DOMTables"
    },
    {
        "name": "bSetTHeadClass",
        "docstring": "sets the thead className (i. e. the complete string).",
        "parameters": "classString",
        "region": "DOMTables"
    },
    {
        "name": "bSetHRowID",
        "docstring": "sets the thead row id.",
        "parameters": "id",
        "region": "DOMTables"
    },
    {
        "name": "bSetHRowClass",
        "docstring": "sets the header row className (i. e. the complete string).",
        "parameters": "classString",
        "region": "DOMTables"
    },
    {
        "name": "bSetTBodyID",
        "docstring": "sets the tbody id.",
        "parameters": "id",
        "region": "DOMTables"
    },
    {
        "name": "bSetTBodyClass",
        "docstring": "sets the tbody className (i. e. the complete string). Each row gets",
        "parameters": "classString",
        "region": "DOMTables"
    },
    {
        "name": "bSetRowsID",
        "docstring": "sets",
        "parameters": "liste",
        "region": "DOMTables"
    },
    {
        "name": "bSetRowsClass",
        "docstring": "sets the rows className. The row clasNames must be provided as a string or as a list/array. If provided as a string, all rows receive this className. \nIf provided as a list, the length of the list must equal the table's number of rows",
        "parameters": "liste",
        "region": "DOMTables"
    },
    {
        "name": "bSetCells",
        "docstring": "sets",
        "parameters": "liste",
        "region": "DOMTables"
    },
    {
        "name": "bSetCellsID",
        "docstring": "sets",
        "parameters": "liste",
        "region": "DOMTables"
    },
    {
        "name": "bSetCellsClass",
        "docstring": "sets",
        "parameters": "liste",
        "region": "DOMTables"
    },
    {
        "name": "until",
        "docstring": "returns a substring, starting from the beginning (index 0) and going up to, but not including, the first occurrence of a specified text",
        "parameters": "text",
        "region": "String"
    },
    {
        "name": "after",
        "docstring": "returns a substring, starting from, but not including, the first occurrence of a specified text until the end of the ego string",
        "parameters": "text",
        "region": "String"
    },
    {
        "name": "digits",
        "docstring": "returns a list (array) of all sequences of digits (whole numbers) occuring in the string, with the option to specify min and max lengths for the digit sequences.\nDefault min is 1, defualt max is unlimited",
        "parameters": "min, max",
        "region": "String"
    }
]
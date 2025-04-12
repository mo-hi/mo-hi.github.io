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
        "name": "assert",
        "docstring": "throws an error if the condition is false",
        "parameters": "condition, message",
        "region": "basis"
    },
    {
        "name": "dictionary",
        "docstring": "returns a dictionary with the keys from keys and values from values. Length of keys and values must be equal.",
        "parameters": "keys, values",
        "region": "basis"
    },
    {
        "name": "NumbersFromTo",
        "docstring": "returns an array of numbers from 'from' to 'to'.",
        "parameters": "from, to, asString = false",
        "region": "basis"
    },
    {
        "name": "debounce",
        "docstring": "delays a function call.",
        "parameters": "func, delay",
        "region": "basis"
    },
    {
        "name": "getAllEventListeners",
        "docstring": "returns all event listeners of the current page. The function uses the native getEventListeners function of Chrome DevTools. \nThe function is for develooment purposes only and should not be used in production code.",
        "parameters": "",
        "region": "basis"
    },
    {
        "name": "b_divTable",
        "docstring": "return a div table. Provide either cols or json! <br>\nWhen cols[int] is provided,  an empty table with cols collums and 0 rows is returned <br>\nWith json is provided, a table with the json dataset is returend. <br>",
        "parameters": "{cols, json}",
        "region": "content_divTable"
    },
    {
        "name": "b_svg",
        "docstring": "returns svg markup for various icons. The function has two Use Cases: <br><br>\n\n(1) returns a <b>string</b> for a given icon name and a given size. Example: \n<code>b_svg(\"svg-icon-edit\") = \"...//svg code...width=24 height=24 ...\" <br>\n        b_svg(\"svg-icon-edit\", 16) = \"...//svg code...width=16 height=16 ...\"  \n</code> <br>\n\n(2) returns a <b>dictionary</b>. The keys are the svg name, the value is the return value from Use Case 1. Example:\n<code> b_svg() = { \"svg-icon-edit-24\": \"....\", \"svg-icon-grid-24\": \"...\", ...} <br>\nb_svg([16,24]) = { \"svg-icon-edit-16\": \"...\", \"svg-icon-grid-16\": \"...\", \"svg-icon-edit-24\": \"...\", ...} </code> \n\nThe follwoing icon names are available (among others):<br>\nsvg-icon-edit<br>\nsvg-icon-grid<br>\nsvg-icon-menu<br>\nsvg-icon-search<br>\nsvg-icon-filter<br>\nsvg-icon-download<br>\nsvg-icon-upload<br>\nsvg-icon-save<br>\nsvg-icon-discard<br>",
        "parameters": "name, size",
        "region": "content_svg"
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
        "name": "Auto_Fill",
        "docstring": "Modifies your html page by filling in the values of the provided list of dictionaries.",
        "parameters": "listOfDictionaries, elementId = \"body\", compareKeys = []",
        "region": "htmlManipulation"
    },
    {
        "name": "ShowHTMLinTextArea",
        "docstring": "Modifies your html page by adding a textarea with a div's innerHTML.",
        "parameters": "divToExpose, divToAppend",
        "region": "htmlManipulation"
    },
    {
        "name": ".depth",
        "docstring": "returns the max depth of an array.\nAs this function uses recursion you can limit the level of recursions, default limit is 9.",
        "parameters": "limit_Recursions",
        "region": "Array objects"
    },
    {
        "name": ".count",
        "docstring": "returns the number of occurances of an item in an array. Identity is checked with the '===' operator.",
        "parameters": "item",
        "region": "Array objects"
    },
    {
        "name": ".replace",
        "docstring": "replaces the string for each of its items, according to the inputs 're' and 'place'. \nIt will only be applied to elements of the ego array which are of type string. \nWhen the optional parameter wholeItem is set to true, then the complete element string must be equal to 're'. \nThis function uses recursion, which is limited to 100 iterations.",
        "parameters": "re, place, wholeItem = false, recursion = 0",
        "region": "Array objects"
    },
    {
        "name": ".prepost",
        "docstring": "adds to each of its items a 'prefix' and a 'postfix'.\nIt will only be applied to elements of the ego array which are of type string.",
        "parameters": "prefix, postfix",
        "region": "Array objects"
    },
    {
        "name": ".prepostKey",
        "docstring": "adds to the value of the specified key of each of its items a 'prefix' and a 'postfix'.\nWill only be applied to elements of the ego array which are of type dictionary.\nWil only be applied to values of the ego dictionary which are of type string.\nThis is a wrapper for the dictionary function prepost.",
        "parameters": "key, prefix, postfix",
        "region": "Array objects"
    },
    {
        "name": ".keyValues",
        "docstring": "returns a list/array with the values to the provided 'key' for all dictionary items of the ego array.\nIt will only be applied to elements of the ego array which are of type dictionary/object.",
        "parameters": "key",
        "region": "Array objects"
    },
    {
        "name": ".removeDuplicates",
        "docstring": "returns a reduced list/array of the ego array, where all elements the occur multiple times are removed.",
        "parameters": "",
        "region": "Array objects"
    },
    {
        "name": ".MeWithNewKeys",
        "docstring": "returns a new array with modified keys and old values. \nThis is a wrapper for the dictionary function with the same name MeWithNewKeys.\nWill only be applied to elements of the ego array which are of type dictionary.",
        "parameters": "oldKeys, newKeys",
        "region": "Array objects"
    },
    {
        "name": ".pushX",
        "docstring": "adds a new item to the Array if the item is not already in the Array.",
        "parameters": "newItem",
        "region": "Array objects"
    },
    {
        "name": ".ItemsNotIn",
        "docstring": "returns a new array with all items of the ego array which are not in the list2.",
        "parameters": "list2",
        "region": "Array objects"
    },
    {
        "name": ".flatten",
        "docstring": "returns a new array with all items of the ego array flatten in a 1D array.",
        "parameters": "limit_Recursions",
        "region": "Array objects"
    },
    {
        "name": ".removeX",
        "docstring": "removes elements from the array when they exist",
        "parameters": "item",
        "region": "Array objects"
    },
    {
        "name": ".massSplit",
        "docstring": "returns a 2D list. To each of the ego elements the split function with seperator sep is applied.\nWill only run if the ego array is a 1D list with string elements.",
        "parameters": "sep = ','",
        "region": "Array objects"
    },
    {
        "name": ".Is2DTable",
        "docstring": "Obsolete. Use 'typOf(arr.Shape()) == 'list' instead.",
        "parameters": "",
        "region": "Array objects"
    },
    {
        "name": ".Shape",
        "docstring": "return a list with the number of elements in the first dimension and the number of elements in the second dimension and so on.\nThe shape of a 1D array is [n], the shape of a 2D array is [n, m], and so on\nShape checks if all subarrays are of the same shape and returns false if not. If false is returned, you can use .depth() to check the depth of the array.",
        "parameters": "",
        "region": "Array objects"
    },
    {
        "name": ".stringify",
        "docstring": "returns a string, representing the array content similar to <i>String(array)</i>.\nStringify will not put brackets at the end or beginning of an array or subarray. Stringify expects as \nmany separators as the depth of the ego array.",
        "parameters": "...seperators",
        "region": "Array objects"
    },
    {
        "name": ".removeAll",
        "docstring": "removes all occurances of the specified element from the array.\nThis function modifies the original array.",
        "parameters": "elements",
        "region": "Array objects"
    },
    {
        "name": ".keys",
        "docstring": "returns an array of the object's own keys.",
        "parameters": "",
        "region": "Dictionary objects"
    },
    {
        "name": ".includes",
        "docstring": "returns true if the dictionary contains the specified key, returns false if not.\nIs a short version of 'Object.keys(this).includes(key)'",
        "parameters": "key",
        "region": "Dictionary objects"
    },
    {
        "name": ".MeWithNewKeys",
        "docstring": "returns a new dictionary with the modified keys and their old values.",
        "parameters": "oldKeys, newKeys",
        "region": "Dictionary objects"
    },
    {
        "name": ".prepost",
        "docstring": "modifies the value of the specified key by adding a prefix and a postfix.\nWill only be applied if the value to the provided key is of type string.",
        "parameters": "key, prefix, postfix",
        "region": "Dictionary objects"
    },
    {
        "name": ".KeyByValue",
        "docstring": "returns the first key of the dictionary that has the specified value.",
        "parameters": "value",
        "region": "Dictionary objects"
    },
    {
        "name": ".KeySubsetAndOrder",
        "docstring": "returns a new dictionary with the provided keys (in the order the keys are provided. Note: keys are generally not ordered in a dictionary.)",
        "parameters": "keys",
        "region": "Dictionary objects"
    },
    {
        "name": ".bSetHeaders",
        "docstring": "sets the table headers innerHTML. The headers must be provided as list/array (hence liste)\nThe length of liste must equal to the table cols length.",
        "parameters": "liste",
        "region": "DOMTables objects"
    },
    {
        "name": ".bSetHeadersID",
        "docstring": "sets the table header ids. The header ids must be provided as list/array (hence liste)\nThe length of liste must equal to the table cols length.",
        "parameters": "liste",
        "region": "DOMTables objects"
    },
    {
        "name": ".bSetHeadersClass",
        "docstring": "sets the table header classNames (i. e. the complete string). The header classnames must be provided as list/array (hence liste)\nThe length of liste must equal to the table cols length.",
        "parameters": "liste",
        "region": "DOMTables objects"
    },
    {
        "name": ".bSetTHeadID",
        "docstring": "sets the thead id.",
        "parameters": "id",
        "region": "DOMTables objects"
    },
    {
        "name": ".bSetTHeadClass",
        "docstring": "sets the thead className (i. e. the complete string).",
        "parameters": "classString",
        "region": "DOMTables objects"
    },
    {
        "name": ".bSetHRowID",
        "docstring": "sets the thead row id.",
        "parameters": "id",
        "region": "DOMTables objects"
    },
    {
        "name": ".bSetHRowClass",
        "docstring": "sets the header row className (i. e. the complete string).",
        "parameters": "classString",
        "region": "DOMTables objects"
    },
    {
        "name": ".bSetTBodyID",
        "docstring": "sets the tbody id.",
        "parameters": "id",
        "region": "DOMTables objects"
    },
    {
        "name": ".bSetTBodyClass",
        "docstring": "sets the tbody className (i. e. the complete string). Each row gets",
        "parameters": "classString",
        "region": "DOMTables objects"
    },
    {
        "name": ".bSetRowsID",
        "docstring": "sets",
        "parameters": "liste",
        "region": "DOMTables objects"
    },
    {
        "name": ".bSetRowsClass",
        "docstring": "sets the rows className. The row clasNames must be provided as a string or as a list/array. If provided as a string, all rows receive this className. \nIf provided as a list, the length of the list must equal the table's number of rows",
        "parameters": "liste",
        "region": "DOMTables objects"
    },
    {
        "name": ".bSetCells",
        "docstring": "sets",
        "parameters": "liste",
        "region": "DOMTables objects"
    },
    {
        "name": ".bSetCellsID",
        "docstring": "sets",
        "parameters": "liste",
        "region": "DOMTables objects"
    },
    {
        "name": ".bSetCellsClass",
        "docstring": "sets",
        "parameters": "liste",
        "region": "DOMTables objects"
    },
    {
        "name": ".until",
        "docstring": "returns a substring, starting from the beginning (index 0) and going up to, but not including, the first occurrence of a specified text",
        "parameters": "text",
        "region": "String objects"
    },
    {
        "name": ".after",
        "docstring": "returns a substring, starting from, but not including, the first occurrence of a specified text until the end of the ego string",
        "parameters": "text",
        "region": "String objects"
    },
    {
        "name": ".digits",
        "docstring": "returns a list (array) of all sequences of digits (whole numbers) occuring in the string, with the option to specify min and max lengths for the digit sequences.\nDefault min is 1, defualt max is unlimited",
        "parameters": "min, max",
        "region": "String objects"
    },
    {
        "name": ".isDigit",
        "docstring": "returns true if the ego string is a digit, false otherwise",
        "parameters": "",
        "region": "String objects"
    },
    {
        "name": ".isLowerCase",
        "docstring": "returns true if the ego string containts only lower case letters, false otherwise. Empty strings are considered as false.",
        "parameters": "",
        "region": "String objects"
    },
    {
        "name": ".isJSON",
        "docstring": "returns true if the ego string is a valid json string, false otherwise",
        "parameters": "",
        "region": "String objects"
    },
    {
        "name": ".replaceN",
        "docstring": "replaced all occurences of a specified text with another text up to n times. This is a alternative for regex replace, which might in some cases not work as expected.",
        "parameters": "re, place, n = 1000",
        "region": "String objects"
    },
    {
        "name": ".trimPlus",
        "docstring": "does multiple replacements in the ego string, with the option to specify a list of replacements. \n1) if std is true, it will apply the build in trim() function.\n2) if multiSpace is true, it will remove all multiple spaces inside the string\n3) if plusList is provided, it will remove all spaces in the specified patterns.",
        "parameters": "plusList, multiSpace = true, std = true",
        "region": "String objects"
    },
    {
        "name": ".DescendantsWithClass",
        "docstring": "returns all descendats (children and grandchildren) of a div that have a certain className",
        "parameters": "className",
        "region": "DIV objects"
    },
    {
        "name": ".DescendantsWithTag",
        "docstring": "returns all descendats (children and grandchildren) of a div that have a certain tag",
        "parameters": "tagName",
        "region": "DIV objects"
    },
    {
        "name": ".AncestorWithClass",
        "docstring": "returns the first ancestor of a div that has a certain className",
        "parameters": "className",
        "region": "DIV objects"
    },
    {
        "name": ".IsDescendantOfClass",
        "docstring": "returns true if the ego div is a decendant of a div that containts the ancestorClass",
        "parameters": "ancestorClass",
        "region": "DIV objects"
    },
    {
        "name": ".IsDescendantOf",
        "docstring": "returns true if the ego div is a decendant of the ancestor div. The function looks up 20 generations, which can be changed by the iterations parameter.",
        "parameters": "ancestor, iterations = 20",
        "region": "DIV objects"
    },
    {
        "name": ".addEventListener_ClickAndTouch",
        "docstring": "adds a 'click' and a 'touchstart' evenlistener event to the ego element. The ego element must have the class 'js-event'",
        "parameters": "functionName",
        "region": "DIV objects"
    },
    {
        "name": ".b_divTable_SetHeaders",
        "docstring": "sets the table headers innerHTML. The headers must be provided as list/array (hence liste)\nThe length of liste must equal to the table cols length.",
        "parameters": "liste",
        "region": "DivTables objects"
    },
    {
        "name": ".b_divTable_AddRows",
        "docstring": "adds new rows to a table. \nIf liste is a list of dictionaries, then the innerHTML of each cell will be set to the value of the \nkey identical to the header.",
        "parameters": "liste",
        "region": "DivTables objects"
    },
    {
        "name": ".aboutMe",
        "docstring": "A collection is a list of dictionaries (technically array of objects).",
        "parameters": "",
        "region": "class Collection"
    },
    {
        "name": ".asList",
        "docstring": "returns all items in form of a 2D array. The first row of the 2D array are the dictionary keys. in case a key is provided, then a 1D array is provided\n    that contains all values of the corresponding key.",
        "parameters": "key",
        "region": "class Collection"
    },
    {
        "name": ".copyKey",
        "docstring": "adds a new key-value pair to all items. This is equivalent to adding a new column to a table. \n    If force is set to false, then the new key is only added to items if key exists in the item.\n    Force is set to true by default and will add the new key with an empty string in case the key does not exist.",
        "parameters": "key, newKey, force=true",
        "region": "class Collection"
    },
    {
        "name": ".push",
        "docstring": "with an additional check that the item(s) pushed are of type dictionary",
        "parameters": "...items",
        "region": "class Collection"
    },
    {
        "name": ".pushJSON",
        "docstring": "pushed the elements of a odanariy list of dictionaries.",
        "parameters": "items",
        "region": "class Collection"
    },
    {
        "name": ".pushArray",
        "docstring": "pushes the rows of the array. The array must be a 2D array, where the first row (array[0]) are the keys.",
        "parameters": "array2D",
        "region": "class Collection"
    },
    {
        "name": ".pushString",
        "docstring": "pushes the elements represented by a JSOn String. The JSON string must be a list of dictionaries.",
        "parameters": "jsonString",
        "region": "class Collection"
    },
    {
        "name": ".removeKey",
        "docstring": "removes for all items the key-value pair of a specified key. This is equivalent to removing a column in a table.",
        "parameters": "key",
        "region": "class Collection"
    },
    {
        "name": ".stringify",
        "docstring": "returns the ego data in a JSON string, like JSON.stringify()",
        "parameters": "",
        "region": "class Collection"
    },
    {
        "name": ".stringifyFormatted",
        "docstring": "like stringify() just in a nice formatted way with new lines and tabs",
        "parameters": "",
        "region": "class Collection"
    },
    {
        "name": ".stringifyTable",
        "docstring": "returns the ego data as a string in a excel-ready formatted 2D array",
        "parameters": "",
        "region": "class Collection"
    },
    {
        "name": ".subsetKeys",
        "docstring": "returns a new collection with the subset of elements which have the specified keys",
        "parameters": "keys",
        "region": "class Collection"
    },
    {
        "name": ".subsetValues",
        "docstring": "returns a new collection with the subset of elements which have the specified key-value pair",
        "parameters": "key, values",
        "region": "class Collection"
    },
    {
        "name": ".renameKey",
        "docstring": "will change for all items the key of oldKey to newKey. The values stay the same. Note: This function will change the order of the keys, newKey will be the last key.",
        "parameters": "oldKey, newKey",
        "region": "class Collection"
    },
    {
        "name": ".addKey",
        "docstring": "adds to each item of the collection the corresponding value of the array.\n    Collection item 'i-1' will get the new key-value pair arr[0]:arr[i], as arr[0] is interpeted as the new key for all items.\n    arr must be the length of the ego colllection plus 1.",
        "parameters": "arr",
        "region": "class Collection"
    },
    {
        "name": ".reset",
        "docstring": "deletes all items in the collection",
        "parameters": "",
        "region": "class Collection"
    },
    {
        "name": ".removeEmptyEntries",
        "docstring": "removes all items from the collection which are empty (i.e. have no keys)",
        "parameters": "",
        "region": "class Collection"
    }
]
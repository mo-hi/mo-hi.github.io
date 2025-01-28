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
        "name": ".DescendantsWithClass",
        "docstring": "returns all descendats (children and grandchildren) of a div that have a certain className",
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
        "name": ".JSEvent_AddClickTouch",
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
    }
]
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
        "name": "DOM_Replace",
        "docstring": "replaces the content of specified tags within a given element.",
        "parameters": "re, place, tags",
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
        "docstring": "sets the table headers innerHTML. The headers must be provided as list/array (hence liste)\nThe length of liste must equal to the table cols length.",
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
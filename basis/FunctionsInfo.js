const FromFile_FunctionsInfo_JS = [
    {
        "name": "typ",
        "docstring": "returns the type of a variable as a string. The following types are recognized:\n list, div, dict, str, int, float, bool, null, undefined and functions",
        "parameters": "variable",
        "source": "basis"
    },
    {
        "name": "wenn",
        "docstring": "is a short hand notation / better readability for 'return condition ? trueValue : falseValue';",
        "parameters": "condition, trueValue, falseValue",
        "source": "basis"
    },
    {
        "name": "assert",
        "docstring": "throws an error if the condition is false",
        "parameters": "condition, message",
        "source": "basis"
    },
    {
        "name": "allEqual",
        "docstring": "returns true if all values are equal",
        "parameters": "...values",
        "source": "basis"
    },
    {
        "name": "byVal",
        "docstring": "creates a hard copy of a variable (instead of just creating a reference in case of list and dictionaries). \nIt is equivalent to structuredClone and mimics the 'byVal' operater in VBA, hence the name",
        "parameters": "data",
        "source": "basis"
    },
    {
        "name": "download",
        "docstring": "triggers a download of a file with the specified content and filename. The mimeType can be specified, default is 'text/plain;charset=utf-8'.",
        "parameters": "fileContent, filename, mimeType = 'text/plain;charset=utf-8'",
        "source": "clsBasis"
    },
    {
        "name": "upload",
        "docstring": "triggers a file upload dialog and returns a Promise of a listof dictionaries [{file, content}, {...}, .... ]. If multiple is true, multiple files can be selected.",
        "parameters": "multiple=false, readAs = 'text'",
        "source": "clsBasis"
    },
    {
        "name": "debounce",
        "docstring": "delays a function call.",
        "parameters": "func, delay",
        "source": "clsBasis"
    },
    {
        "name": "formatBracketText",
        "docstring": "Formats text with proper bracket indentation.",
        "parameters": "text, options = {}",
        "source": "clsBasis"
    },
    {
        "name": "formatTagText",
        "docstring": "Formats text with proper HTML tag indentation.",
        "parameters": "text, options = {}",
        "source": "clsBasis"
    },
    {
        "name": "popup",
        "docstring": "creates a pop-up window with a header and message. The pop-up can be closed by clicking the close button, clicking outside the pop-up, or pressing the Escape key.",
        "parameters": "header, message",
        "source": "clsBasis"
    },
    {
        "name": "AutoFill",
        "docstring": "Modifies your HTML page by filling in the values of the provided list of dictionaries.<br>\n1) Reads div(elementId).innerHTML as template <br>\n2) Clears div(elementId).innerHTML = '' <br>\n3) Fills everything in one pass by replacing {{key}} with the corresponding value from each dictionary<br>\nOptions:<br>\n  - append: boolean, if true, appends to existing content instead of clearing it first<br>",
        "parameters": "listOfDictionaries, elementId, config",
        "source": "clsDOM"
    },
    {
        "name": "DownloadHTML",
        "docstring": "Downloads the current HTML document as a file with the specified filename.",
        "parameters": "filename = 'document.html'",
        "source": "clsDOM"
    },
    {
        "name": "ExposeHTML",
        "docstring": "Exposes the HTML of a given element (div, script) in a textarea, allowing for easy viewing of its content. \nThe function takes a configuration object that specifies the div to expose, the div to append the textarea to, and various options for formatting and behavior.",
        "parameters": "config",
        "source": "clsDOM"
    },
    {
        "name": "RemoveWithClass",
        "docstring": "Removes all elements from the DOM that have the specified class name.",
        "parameters": "className",
        "source": "clsDOM"
    },
    {
        "name": ".depth",
        "docstring": "returns the max depth of an array.\nAs this function uses recursion you can limit the level of recursions, default limit is 9.",
        "parameters": "limit_Recursions",
        "source": "proto"
    },
    {
        "name": ".count",
        "docstring": "returns the number of occurances of an item in an array. Identity is checked with the '===' operator.",
        "parameters": "item",
        "source": "proto"
    },
    {
        "name": ".replace",
        "docstring": "replaces the string for each of its items, according to the inputs 're' and 'place'. \nIt will only be applied to elements of the ego array which are of type string. \nWhen the optional parameter wholeItem is set to true, then the complete element string must be equal to 're'. \nThis function uses recursion, which is limited to 100 iterations.",
        "parameters": "re, place, wholeItem = false, recursion = 0",
        "source": "proto"
    },
    {
        "name": ".prepost",
        "docstring": "adds to each of its items a 'prefix' and a 'postfix'.\nIt will only be applied to elements of the ego array which are of type string.",
        "parameters": "prefix, postfix",
        "source": "proto"
    },
    {
        "name": ".prepostKey",
        "docstring": "adds to the value of the specified key of each of its items a 'prefix' and a 'postfix'.\nWill only be applied to elements of the ego array which are of type dictionary.\nWil only be applied to values of the ego dictionary which are of type string.\nThis is a wrapper for the dictionary function prepost.",
        "parameters": "key, prefix, postfix",
        "source": "proto"
    },
    {
        "name": ".keyValues",
        "docstring": "returns a list/array with the values to the provided 'key' for all dictionary items of the ego array.\nIt will only be applied to elements of the ego array which are of type dictionary/object.",
        "parameters": "key",
        "source": "proto"
    },
    {
        "name": ".removeDuplicates",
        "docstring": "returns a reduced list/array of the ego array, where all elements the occur multiple times are removed.",
        "parameters": "",
        "source": "proto"
    },
    {
        "name": ".MeWithNewKeys",
        "docstring": "returns a new array with modified keys and old values. \nThis is a wrapper for the dictionary function with the same name MeWithNewKeys.\nWill only be applied to elements of the ego array which are of type dictionary.",
        "parameters": "oldKeys, newKeys",
        "source": "proto"
    },
    {
        "name": ".pushX",
        "docstring": "adds a new item to the Array if the item is not already in the Array.",
        "parameters": "newItem",
        "source": "proto"
    },
    {
        "name": ".ItemsNotIn",
        "docstring": "returns a new array with all items of the ego array which are not in the list2.",
        "parameters": "list2",
        "source": "proto"
    },
    {
        "name": ".flatten",
        "docstring": "returns a new array with all items of the ego array flatten in a 1D array.",
        "parameters": "limit_Recursions",
        "source": "proto"
    },
    {
        "name": ".removeX",
        "docstring": "removes elements from the array when they exist",
        "parameters": "item",
        "source": "proto"
    },
    {
        "name": ".massSplit",
        "docstring": "returns a 2D list. To each of the ego elements the split function with seperator sep is applied.\nWill only run if the ego array is a 1D list with string elements.",
        "parameters": "sep = ','",
        "source": "proto"
    },
    {
        "name": ".Is2DTable",
        "docstring": "Obsolete. Use 'typOf(arr.Shape()) == 'list' instead.",
        "parameters": "",
        "source": "proto"
    },
    {
        "name": ".Shape",
        "docstring": "return a list with the number of elements in the first dimension and the number of elements in the second dimension and so on.\nThe shape of a 1D array is [n], the shape of a 2D array is [n, m], and so on\nShape checks if all subarrays are of the same shape and returns false if not. If false is returned, you can use .depth() to check the depth of the array.",
        "parameters": "",
        "source": "proto"
    },
    {
        "name": ".stringify",
        "docstring": "returns a string, representing the array content similar to <i>String(array)</i>.\nStringify will not put brackets at the end or beginning of an array or subarray. Stringify expects as \nmany separators as the depth of the ego array.",
        "parameters": "...seperators",
        "source": "proto"
    },
    {
        "name": ".removeAll",
        "docstring": "removes all occurances of the specified element from the array.\nThis function modifies the original array.",
        "parameters": "elements",
        "source": "proto"
    },
    {
        "name": ".AsCollection",
        "docstring": "return a collection representing the array content. The ego content must be a list of dictionaries.",
        "parameters": "",
        "source": "proto"
    },
    {
        "name": ".transpose",
        "docstring": "* return the transposed version of a 2D array. The array must be rectangular and have only two dimensions.",
        "parameters": "",
        "source": "proto"
    },
    {
        "name": ".keys",
        "docstring": "returns an array of the object's own keys.",
        "parameters": "",
        "source": "proto"
    },
    {
        "name": ".includes",
        "docstring": "returns true if the dictionary contains the specified key, returns false if not.\nIs a short version of 'Object.keys(this).includes(key)'",
        "parameters": "key",
        "source": "proto"
    },
    {
        "name": ".MeWithNewKeys",
        "docstring": "returns a new dictionary with the modified keys and their old values.",
        "parameters": "oldKeys, newKeys",
        "source": "proto"
    },
    {
        "name": ".prepost",
        "docstring": "modifies the value of the specified key by adding a prefix and a postfix.\nWill only be applied if the value to the provided key is of type string.",
        "parameters": "key, prefix, postfix",
        "source": "proto"
    },
    {
        "name": ".KeyByValue",
        "docstring": "returns the first key of the dictionary that has the specified value.",
        "parameters": "value",
        "source": "proto"
    },
    {
        "name": ".KeySubsetAndOrder",
        "docstring": "returns a new dictionary with the provided keys (in the order the keys are provided. Note: keys are generally not ordered in a dictionary.)",
        "parameters": "keys",
        "source": "proto"
    },
    {
        "name": ".bSetHeaders",
        "docstring": "sets the table headers innerHTML. The headers must be provided as list/array (hence liste)\nThe length of liste must equal to the table cols length.",
        "parameters": "liste",
        "source": "proto"
    },
    {
        "name": ".bSetHeadersID",
        "docstring": "sets the table header ids. The header ids must be provided as list/array (hence liste)\nThe length of liste must equal to the table cols length.",
        "parameters": "liste",
        "source": "proto"
    },
    {
        "name": ".bSetHeadersClass",
        "docstring": "sets the table header classNames (i. e. the complete string). The header classnames must be provided as list/array (hence liste)\nThe length of liste must equal to the table cols length.",
        "parameters": "liste",
        "source": "proto"
    },
    {
        "name": ".bSetTHeadID",
        "docstring": "sets the thead id.",
        "parameters": "id",
        "source": "proto"
    },
    {
        "name": ".bSetTHeadClass",
        "docstring": "sets the thead className (i. e. the complete string).",
        "parameters": "classString",
        "source": "proto"
    },
    {
        "name": ".bSetHRowID",
        "docstring": "sets the thead row id.",
        "parameters": "id",
        "source": "proto"
    },
    {
        "name": ".bSetHRowClass",
        "docstring": "sets the header row className (i. e. the complete string).",
        "parameters": "classString",
        "source": "proto"
    },
    {
        "name": ".bSetTBodyID",
        "docstring": "sets the tbody id.",
        "parameters": "id",
        "source": "proto"
    },
    {
        "name": ".bSetTBodyClass",
        "docstring": "sets the tbody className (i. e. the complete string). Each row gets",
        "parameters": "classString",
        "source": "proto"
    },
    {
        "name": ".bSetRowsID",
        "docstring": "sets",
        "parameters": "liste",
        "source": "proto"
    },
    {
        "name": ".bSetRowsClass",
        "docstring": "sets the rows className. The row clasNames must be provided as a string or as a list/array. If provided as a string, all rows receive this className. \nIf provided as a list, the length of the list must equal the table's number of rows",
        "parameters": "liste",
        "source": "proto"
    },
    {
        "name": ".bSetCells",
        "docstring": "sets",
        "parameters": "liste",
        "source": "proto"
    },
    {
        "name": ".bSetCellsID",
        "docstring": "sets",
        "parameters": "liste",
        "source": "proto"
    },
    {
        "name": ".bAddClassToCells",
        "docstring": "adds a class to all cells of the table. The class must be provided as a string (hence classe).\nThe class is added to all cells of the table (including headers) if includeHeaders is set to true.",
        "parameters": "className, includeHeaders = false",
        "source": "proto"
    },
    {
        "name": ".bSetCellsClass",
        "docstring": "sets",
        "parameters": "liste",
        "source": "proto"
    },
    {
        "name": ".until",
        "docstring": "returns a substring, starting from the beginning (index 0) and going up to, but not including, the first occurrence of a specified text\nIf the specified text is not found, it returns the entire string. If the specified text is an empty string, it also returns the entire string.",
        "parameters": "text",
        "source": "proto"
    },
    {
        "name": ".count",
        "docstring": "returns the number of occurrences of a specified character in the string.\nIf the string is empty, it returns 0.",
        "parameters": "c",
        "source": "proto"
    },
    {
        "name": ".countBeginningChars",
        "docstring": "* returns the count of characters from the beginning of the string that are in the provided list of characters.\n * If the string is empty, it returns 0.",
        "parameters": "listOfChars",
        "source": "proto"
    },
    {
        "name": ".after",
        "docstring": "returns a substring, starting from, but not including, the first occurrence of a specified text until the end of the ego string",
        "parameters": "text",
        "source": "proto"
    },
    {
        "name": ".endsWiths",
        "docstring": "returns true if the ego string ends with any of the strings in the listOfPossibleEndings, false otherwise.",
        "parameters": "listOfPossibleEndings",
        "source": "proto"
    },
    {
        "name": ".digits",
        "docstring": "returns a list (array) of all sequences of digits (whole numbers) occuring in the string, with the option to specify min and max lengths for the digit sequences.\nDefault min is 1, defualt max is unlimited",
        "parameters": "min, max",
        "source": "proto"
    },
    {
        "name": ".isDigit",
        "docstring": "returns true if the ego string is a digit, false otherwise",
        "parameters": "DecimalSeperator",
        "source": "proto"
    },
    {
        "name": ".isLowerCase",
        "docstring": "returns true if the ego string containts only lower case letters, false otherwise. Empty strings are considered as false. Blank spaces are not considered as false",
        "parameters": "",
        "source": "proto"
    },
    {
        "name": ".containsOnly",
        "docstring": "returns true if the ego string containts only letters frrom letters. E. g. 'Hello World'.ContainsOnly('Helo Wrd') returns true, 'Hello World'.ContainsOnly('HeloWrd') returns false.\nEmpty strings are considered as false.",
        "parameters": "letters",
        "source": "proto"
    },
    {
        "name": ".containsOnlyAbc",
        "docstring": "returns true if the ego string containts only letters from 'a'-'z' and 'A'-Z' and  + additionalChars, false otherwise. Empty strings are considered as false. Blank spaces are considered as false",
        "parameters": "additionalChars",
        "source": "proto"
    },
    {
        "name": ".containsOnlyAbc123",
        "docstring": "returns true if the ego string containts only letters from 'a'-'z' and 'A'-Z', numbers 0-9 and additionalChars, false otherwise. Empty strings are considered as false. Blank spaces are considered as false",
        "parameters": "additionalChars",
        "source": "proto"
    },
    {
        "name": ".isJSON",
        "docstring": "returns true if the ego string is a valid json string, false otherwise",
        "parameters": "",
        "source": "proto"
    },
    {
        "name": ".replaceN",
        "docstring": "replaced N occurences of a specified text with another text up to n times.",
        "parameters": "re, place, n = 1000",
        "source": "proto"
    },
    {
        "name": ".trimPlus",
        "docstring": "does multiple replacements in the ego string, with the option to specify a list of replacements. \n1) if std is true, it will apply the build in trim() function.\n2) if multiSpace is true, it will remove all multiple spaces inside the string\n3) if plusList is provided, it will remove all spaces in the specified patterns.",
        "parameters": "plusList, multiSpace = true, std = true",
        "source": "proto"
    },
    {
        "name": ".between",
        "docstring": "returns a substring, starting from the first occurrence of 'bet' until 'ween'. If 'bet' or 'ween' is not found, it returns an empty string.",
        "parameters": "bet, ween",
        "source": "proto"
    },
    {
        "name": ".toggle",
        "docstring": "toggles the string between two specified texts, 'a' and 'b'. There's no return value.",
        "parameters": "a, b",
        "source": "proto"
    },
    {
        "name": ".shrinkTo",
        "docstring": "returns a shrinked string representation. If the string length is less than or equal to maxLength, it returns the original string.\nIf the string length exceeds maxLength, it truncates the string to fit within maxLength by preserving the start and end segments and inserting '...' in between.\nThe minimum value for maxLength is 10.",
        "parameters": "maxLength",
        "source": "proto"
    },
    {
        "name": "SelectionPill",
        "docstring": "erstellt eine Auswahl von Optionen in Form von \"Pills\" (Schaltfl\u00e4chen).",
        "parameters": "",
        "source": "customElements"
    }
]
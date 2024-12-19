const FromFile_docstrings_js = [
    {
        "h2": "Array",
        "h3": "[...].depth()",
        "p": "<c>.depth (limit_Recursions)</c> returns the max depth of an array.\nAs this function uses recursion you can limit the level of recursions, default limit is 9."
    },
    {
        "h3": "[...].count()",
        "p": "<c>.count (item)</c> returns the number of occurances of an item in an array. Identity is checked with the '===' operator."
    },
    {
        "h3": "[...].replace()",
        "p": "<c>.replace (re, place, wholeItem = false, recursion = 0)</c> replaces the string for each of its items, according to the inputs 're' and 'place'. \nIt will only be applied to elements of the ego array which are of type string. \nWhen the optional parameter wholeItem is set to true, then the complete element string must be equal to 're'. \nThis function uses recursion, which is limited to 100 iterations."
    },
    {
        "h3": "[...].prepost()",
        "p": "<c>.prepost (prefix, postfix)</c> adds to the string of each of its items a 'prefix' and a 'postfix'.\nIt will only be applied to elements of the ego array which are of type string."
    },
    {
        "h3": "[...].keyValues()",
        "p": "<c>.keyValues (key)</c> returns a list/array with th values to the provided 'key' for all dictionary items of the ego array.\nIt will only be applied to elements of the ego array which are of type dictionary/object."
    },
    {
        "h3": "[...].removeDuplicates()",
        "p": "<c>.removeDuplicates ()</c> returns a reduced list/array of the ego array, where all elements the occur multiple times are removed."
    },
    {
        "h2": "DOMTables",
        "h3": "div.bSetHeaders()",
        "p": "<c>.bSetHeaders (liste)</c> sets the table headers innerHTML. The headers must be provided as list/array (hence liste)\nThe length of liste must equal to the table cols length."
    },
    {
        "h3": "div.bSetHeadersID()",
        "p": "<c>.bSetHeadersID (liste)</c> sets the table header ids. The header ids must be provided as list/array (hence liste)\nThe length of liste must equal to the table cols length."
    },
    {
        "h3": "div.bSetHeadersClass()",
        "p": "<c>.bSetHeadersClass (liste)</c> sets the table header classNames (i. e. the complete string). The header classnames must be provided as list/array (hence liste)\nThe length of liste must equal to the table cols length."
    },
    {
        "h3": "div.bSetTHeadID()",
        "p": "<c>.bSetTHeadID (id)</c> sets the thead id."
    },
    {
        "h3": "div.bSetTHeadClass()",
        "p": "<c>.bSetTHeadClass (classString)</c> sets the thead className (i. e. the complete string)."
    },
    {
        "h3": "div.bSetHRowID()",
        "p": "<c>.bSetHRowID (id)</c> sets the thead row id."
    },
    {
        "h3": "div.bSetHRowClass()",
        "p": "<c>.bSetHRowClass (classString)</c> sets the header row className (i. e. the complete string)."
    },
    {
        "h3": "div.bSetTBodyID()",
        "p": "<c>.bSetTBodyID (id)</c> sets the tbody id."
    },
    {
        "h3": "div.bSetTBodyClass()",
        "p": "<c>.bSetTBodyClass (classString)</c> sets the tbody className (i. e. the complete string). Each row gets"
    },
    {
        "h3": "div.bSetRowsID()",
        "p": "<c>.bSetRowsID (liste)</c> sets"
    },
    {
        "h3": "div.bSetRowsClass()",
        "p": "<c>.bSetRowsClass (liste)</c> sets the rows className. The row clasNames must be provided as a string or as a list/array. If provided as a string, all rows receive this className. \nIf provided as a list, the length of the list must equal the table's number of rows"
    },
    {
        "h3": "div.bSetCells()",
        "p": "<c>.bSetCells (liste)</c> sets"
    },
    {
        "h3": "div.bSetCellsID()",
        "p": "<c>.bSetCellsID (liste)</c> sets"
    },
    {
        "h3": "div.bSetCellsClass()",
        "p": "<c>.bSetCellsClass (liste)</c> sets"
    },
    {
        "h2": "String",
        "h3": "\"text\".until()",
        "p": "<c>.until (text)</c> returns a substring, starting from the beginning (index 0) and going up to, but not including, the first occurrence of a specified text"
    },
    {
        "h3": "\"text\".after()",
        "p": "<c>.after (text)</c> returns a substring, starting from, but not including, the first occurrence of a specified text until the end of the ego string"
    },
    {
        "h3": "\"text\".digits()",
        "p": "<c>.digits (min, max)</c> returns a list (array) of all sequences of digits (whole numbers) occuring in the string, with the option to specify min and max lengths for the digit sequences.\nDefault min is 1, defualt max is unlimited"
    }
]
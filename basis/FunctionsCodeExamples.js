let FromFile_FunctionsCodeExamples = [
    {
        name: "typ",
        code: [
            'typ(1) == "int"',
            'typ(1.5) == "float"',
            'typ("abc") == "str"',
            'typ(true) == "bool"',
            'typ([]) == "list"',
            'typ({}) == "dict"',
            'typ(null) == "null"',
            'typ(undefined) == "undefined"',
            'typ(function() {}) == "function"'
        ]
    },
    {
        name: "wenn",
        code: [
            'wenn(1 < a, "yes", "no") == "yes"',
            'wenn(1 > a, "yes", "no") == "no"',
        ]
    },
    {
        name: "assert",
        code: [

            'assert(2 + 2 == 4, "should not throw")     // will do nothing',
            'assert(2 + 2 == 5, "should throw")         // will write "should throw" to console log'
        ]
    },
    {
        name: "byVal",
        code: [
                "let original = [1, 2, 3];",
                "let copy = original;",
                "let byValCopy = byVal(original);",
                "",
                "original[0] = 99;",
                "copy[1] = 88;",
                "byValCopy[2] = 77;",
                "original == [99, 88, 3];",
                "copy == [99, 88, 3];",
                "byValCopy == [1, 2, 77];"
        ]
    },
    {
        name: "ValidateSCHEMA",
        code: 'ValidateSCHEMA({name: "Alice", age: 30}, {name: {typ: "str", required: true}, age: {typ: "int", required: true}}) == true'
    },
    {
        name: "allEqual",
        code: [
            'allEqual(1, 1, 1) == true',
            'allEqual(1, 1, 2) == false',
            'allEqual("a", "a", "a") == true',
            'allEqual("a", "a", "b") == false'
        ]
    },
    {
        name: "dictionary",
        code: [
            'dictionary(["a","b"], [1,2]) = {a: 1, b: 2}'
        ]
    },
    {
        name: "NumbersFromTo",
        code: [
            'JSON.stringify(NumbersFromTo(1, 3)) == JSON.stringify([1, 2, 3])'
        ]
    },
    {
        name: "getAllEventListeners",
        code: [
            'typeof getAllEventListeners() == "object"'
        ]
    },
    {
        name: "download",
        code: [
            'clsBasis.download("Hello, World!", "hello.txt", "text/plain")'
        ]
    },
    {
        name: "upload",
        code: [
            'let uploadFiles = await clsBasis.upload()',
            'if (uploadFiles.length > 0) {',
            '    let {file, content} = uploadFiles[0];',
            '    console.log("Uploaded file:", file.name);',
            '}',
            '',
            'let uploadMultipleFiles = await clsBasis.upload(true)',
            'if (uploadMultipleFiles.length > 0) {',
            '    for (let i = 0; i < uploadMultipleFiles.length; i++) {',
            '        let {file, content} = uploadMultipleFiles[i];',
            '        console.log("Uploaded file:", file.name);',
            '    }',
            '}'
        ]
    },
    {
        name: "debounce",
        code: [
            'function myFunctionToDemonstrateDebounce() { console.log("Hello after 2 seconds"); }',
            'clsBasis.debounce(myFunctionToDemonstrateDebounce, 2000)()'
        ]
    },

    {
        name: "popup",
        code: [
            'clsBasis.popup("Hello World", "This is a popup message.")'
        ]
    },
    {
        name: "AutoFill",
        code: [
            'clsDOM.AutoFill([{ text: "World" }, { text: "Universe" }, { text: "Everyone" }], "id-multiple-entries");',
        ]
    },
    {
        name: "RemoveWithClass",
        code: [
            'clsDOM.RemoveWithClass("remove-me");',
        ]
    },
    {
        name: "DownloadHTML",
        code: [
            'clsDOM.DownloadHTML("my-document.html");',
        ]
    },
{
    name: "SelectionPill",
    code: [
        "HTML:",
        `<selection-pill name="my-selection" type="radio" checked="Option 2" options='["Option 1", "Option 2", "Option 3"]'></selection-pill>`,
        "",
        "JavaScript:",
        '// select the custom element',
        `let selectionPill = document.querySelector('selection-pill[name="my-selection"]'); `,
        `// attach an event listener directly to the custom element`,
        `selectionPill.addEventListener('change', (event) => {`,
        `    console.log("Selected value:", event.target.value);`,
        `});`
    ]
}
]

function post_FromFile_FunctionsCodeExamples() {
    FromFile_FunctionsCodeExamples.forEach(item => {
        if (typ(item.code) == "list")
            item.code = item.code.join('\n');
    });
    return FromFile_FunctionsCodeExamples
}
post_FromFile_FunctionsCodeExamples()
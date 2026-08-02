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
        name: "formatBracketText",
        code: [
            'let input = \'function example() { if (true) { console.log("Hello"); } else { console.log("Goodbye"); } }\'',
            'console.log(clsBasis.formatBracketText(input, { indentStr: "    ", newlineAfter: ["{", "}", ";"] }))'
        ]
    },
    {
        name: "formatTagText",
        code: [
            'let input = \'<div><p>Hello</p><p>World</p></div>\'',
            'console.log(clsBasis.formatTagText(input, { indentStr: "    " }))'
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
        name: "ExposeHTML",
        code: [
            'clsDOM.ExposeHTML({',
            '   divToExpose: document.getElementById(`id-1`)',
            '   divToAppend: document.getElementById(`id-1-show`)',
            '   outer: false',
            '   pretty: true',
            '   textAreaClassName: "code"',
            '   lineNumbers: false',
            '   synchWithTarget: true',
            '   defineRows: true',
            '});'
        ]
    },
    {
        name: "SelectionPill",
        docStringPlus: "The color of the selection-pill can be customized using CSS variables. You can also use your custom colors",
        code: [
            `<selection-pill 
        name="my-selection" 
        class-name="selection-pill mr-80"
        type="radio" 
        checked="Option 2" 
        options='["Option 1", "Option 2", "Option 3"]'
        change-handler="const val = new FormData(this).get('my-selection');clsBasis.popup('Selection changed!', 'You selected ' + val);"
        style_="--bg: var(--color-gray-50); --color: var(--color-gray-500);
        --active-bg: var(--color-cyan-100); --active-color: var(--color-cyan-800);"
></selection-pill>

<selection-pill 
        name="my-selection2" 
        class-name="selection-pill"
        type="checkbox" 
        options='["Option"]'
        style_="--bg:var(--color-cyan-50);--color: var(--color-cyan-600); 
        --active-bg: var(--color-cyan-600); --active-color: white;"
    "
></selection-pill>`,
        ],
        codePlus: [
            `<!-- 1. Grey White -->
            <selection-pill 
                name="pill-gray" 
                class-name="selection-pill"
                type="checkbox" 
                options='["Gray"]'
                style_="--bg: var(--color-gray-50); --color: var(--color-gray-600); --active-bg: var(--color-gray-600); --active-color: white;"
            ></selection-pill>
            
            <!-- 2. Emerald / Green (Aktiv / Erfolgreich) -->
            <selection-pill 
                name="pill-emerald" 
                class-name="selection-pill"
                type="checkbox" 
                options='["Emerald"]'
                style_="--bg: var(--color-emerald-50); --color: var(--color-emerald-600); --active-bg: var(--color-emerald-600); --active-color: white;"
            ></selection-pill>

            <!-- 3. Indigo / Blue-Purple (Modern / Tech) -->
            <selection-pill 
                name="pill-indigo" 
                class-name="selection-pill"
                type="checkbox" 
                options='["Indigo"]'
                style_="--bg: var(--color-indigo-50); --color: var(--color-indigo-600); --active-bg: var(--color-indigo-600); --active-color: white;"
            ></selection-pill>

            <!-- 4. Rose / Pink (Frisch / Eye-Catcher) -->
            <selection-pill 
                name="pill-rose" 
                class-name="selection-pill"
                type="checkbox" 
                options='["Rose"]'
                style_="--bg: var(--color-rose-50); --color: var(--color-rose-600); --active-bg: var(--color-rose-600); --active-color: white;"
            ></selection-pill>

            <!-- 5. Amber / Gold (Warm / Premium) -->
            <selection-pill 
                name="pill-amber" 
                class-name="selection-pill"
                type="checkbox" 
                options='["Amber"]'
                style_="--bg: var(--color-amber-50); --color: var(--color-amber-600); --active-bg: var(--color-amber-500); --active-color: white;"
            ></selection-pill>

            <!-- 6. Cyan / Teal (Kühl / Clean) -->
            <selection-pill 
                name="pill-cyan" 
                class-name="selection-pill"
                type="checkbox" 
                options='["Cyan"]'
                style_="--bg: var(--color-cyan-50); --color: var(--color-cyan-600); --active-bg: var(--color-cyan-600); --active-color: white;"
            ></selection-pill>`
        ]
    },
]

function post_FromFile_FunctionsCodeExamples() {
    FromFile_FunctionsCodeExamples.forEach(item => {
        if (typ(item.code) == "list")
            item.code = item.code.join('\n');
    });
    return FromFile_FunctionsCodeExamples
}
post_FromFile_FunctionsCodeExamples()
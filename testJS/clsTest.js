class clsTest {
    constructor(testFunctions) {
        this.cases = [];
        this.mode = "test"
        this.halt = false
        this.silentCounter = 0
        // list of actual test cases to run, if null, all testCase_* functions will be auto-discovered
        this.testFunctions = testFunctions;
        this.testResults = [];

        this.currentTestCaseName = null;

        this.popup = {
            customCSS: null,
            customHTML_BeforeTable: null,
            customHTML_AfterTable: null,
            customScript: null,
            saveToFile: ""
        };
    }

    // Auto-discovers testCase_* functions from global scope
    static Init({listoftests = null, prefix = null, saveToFile = null} = {}) {
        if (prefix !== null && !listoftests) {
        listoftests = Object.keys(window)
            .filter(key => key.startsWith(prefix) && typeof window[key] === 'function')
            .map(key => window[key]);
        }
        let instance = new clsTest(listoftests);
        if (saveToFile) {
            instance.popup.saveToFile = saveToFile;
        }
        return instance;
    }

    Run () {
        for (let fn of this.testFunctions) {
            this.currentTestName = fn.name;
            fn(this);
        }
    }

    _pushTestResult2(result, msg = '') {

    }


// ##################################################################################
// # Operations                                                                     #
// ##################################################################################
    PrintToPopUp() {
        let popup = window.open("", "myPopup", "width=800,height=600");
        let doc = popup.document;

        // structure
        doc.open();
        let html = doc.createElement("html");
        let head = doc.createElement("head");
        let body = doc.createElement("body");

        head.appendChild(this._style());
        body.appendChild(this._table())

        // build
        html.appendChild(head);
        html.appendChild(body);
        doc.appendChild(html);
        doc.close();
    }

    PrintToPopUp2() {
        let popup = window.open("", "myPopup", "width=1200,height=800");
        let doc = popup.document;

        // structure
        doc.open();
        let html = doc.createElement("html");
        let head = doc.createElement("head");
        let body = doc.createElement("body");

        head.appendChild(this._style());
        if (this.popup?.customCSS) {
            let styleTag = doc.createElement("style");
            styleTag.textContent = this.popup.customCSS;
            head.appendChild(styleTag);
        }

        body.appendChild(this._nav());  
        if (this.popup?.customHTML_BeforeTable) {
            let customContainer = doc.createElement("div");
            customContainer.innerHTML = this.popup.customHTML_BeforeTable;
            body.appendChild(customContainer);
        }
        body.appendChild(this._table2())
        if (this.popup?.customHTML_AfterTable) {
            let customContainer = doc.createElement("div");
            customContainer.innerHTML = this.popup.customHTML_AfterTable;
            body.appendChild(customContainer);
        }

        body.appendChild(this._popup_script());
        if (this.popup?.customScript) {
            let scriptTag = doc.createElement("script");
            scriptTag.textContent = this.popup.customScript;
            body.appendChild(scriptTag);
        }

        // build
        html.appendChild(head);
        html.appendChild(body);
        doc.appendChild(html);
        doc.close();
    }

    async RunTestCases(testcasesAsList, resetfunction, prefix = '_testCase_', testSeperator = ' '.repeat(50)) {
        for (let fn of testcasesAsList) {
            let name = fn.name.after(prefix)
            this.NewLine()
            this.TestHeadline(name)
            // this.Equal(true, true, '<b>' + name + ' - Start</b>');
            resetfunction
            await fn(this);
        }
        this.NewLine() 
    }


// ##################################################################################
// # Modes                                                                          #
// ##################################################################################
    SetTestMode() {
        if (this.mode == "silent" && this.silentCounter >0) {
            this._pushTestResult(String(this.silentCounter) + ' tests passed executed in silent mode and passed', 'passed','')}
        this.mode = "test"
        this._pushTestResult('<div class="navy font-w600"> Normal Test Mode activated</div>', '', 'passed','')
    }

    SetSilentMode() {
        this.mode = "silent"
        this.silentCounter = 0
        this._pushTestResult('<div class="navy font-w600"> Silent Mode activated</div>', '', 'passed','')
    }

    // This will pause the program when a test failes. your dev tools must be open.
    SetHaltOnFail() {
        this.halt = true
    }

    // ##################################################################################
    // # Dummy Lines                                                                    #
    // ##################################################################################

    Info(msg) {
        this._pushTestResult(msg, '', 'information','')
    }

    Action(msg) {
        this._pushTestResult('[ACTION] ' + msg, '', 'acion','')
    }

    TestHeadline(testName) {
        this._pushTestResult('<b>' + testName + ' - Start</b>', '', '-','')
    }

    NewLine() {
        this._pushTestResult(' ', '', '-','')
    }

    _pushTestResult(fname, testName, result, msg) {
        this.cases.push([fname, testName, result, msg])
    }

    _passed(fname, testName, msg) {
        if (msg == undefined) msg = ''
        if (this.mode == "test") {
            this._pushTestResult(fname, testName, 'passed', msg)}
        if (this.mode == "silent") {
            this.silentCounter += 1}
        
    }

    _failed(fname, testName, msg) {
        if (msg == undefined) msg = ''
        if (this.halt) {
            debugger;
        }
        this._pushTestResult(fname, testName, 'failed', msg)
    }


    _passed2(fname, testName) {
        this.testResults.push({
            result: 'passed',
            functionName: fname,
            testCaseName: this.currentTestName,
            testName: testName,
            msg: ''
        });
        
    }

    _failed2(fname, testName, msg) {
        this.testResults.push({
            result: 'failed',
            functionName: fname,
            testCaseName: this.currentTestName,
            testName: testName,
            msg: msg
        });
    }




// ##################################################################################
// # Checker                                                                        #
// ##################################################################################

    Equal(a, b, fName, testCaseName) {
        if (this._IsEqual(a,b)) {
            return this._passed(fName, testCaseName)}
        else {
            return this._failed(fName, testCaseName, " " + a + " not equal to " + b + ". ")}
    }

    Equal2(a, b, fName, testName) {
        if (this._IsEqual(a,b)) {
            return this._passed2(fName, testName)}
        else {
            return this._failed2(fName, testName, " " + a + " not equal to " + b + ". ")}
    }

    IsTrue(a, fName, testName) {
        if(a) return this._passed(fName, testName);
        return this._failed(fName, testName, "failed");
    }

    ErrorSeen(foo_or_obj, p, fooName) {
        if (typeof foo_or_obj == 'object') return this._Assertion_Object(ffoo_or_obj, p , fooName); 

        if (typeof foo_or_obj == 'function') return this._Assertion_Function(foo_or_obj, p , fooName); 

        throw new Error(":you should not be here. ErrorThrown")
    }

// ##################################################################################
// # Checker helper                                                                 #
// ##################################################################################

    _t(variable) {
        if (Array.isArray(variable)) return 'list'
        if (typeof variable === 'object' && variable !== null) return 'dict'
        if (typeof variable === 'string') return 'str'
        if (typeof variable === 'number') return 'int'
        if (typeof variable === 'boolean') return 'bool'
        if (variable === null) return 'null'
        if (variable === undefined) return 'undefined'
    }

    _IsEqual(a,b, max_iterations = 10) {
        if (max_iterations<1) return false
        
        if (this._t(a)!=this._t(b)) return false
    
        if (['bool', 'int', 'str', 'null', 'undefined'].includes(this._t(a)) && (a == b)) return true

        if (['list'].includes(this._t(a)) && (a.length == b.length)) {
            for (let i = 0; i< a.length; i++) {
                if (this._IsEqual(a[i], b[i], max_iterations-1) == false) return false}
            return true}

        if (['dict'].includes(this._t(a)) && (Object.keys(a).length == Object.keys(b).length)) {
            for (let key of Object.keys(a)) {
                if (!b.hasOwnProperty(key)) return false}

            for (let key of Object.keys(a)) {
                if (this._IsEqual(a[key], b[key], max_iterations-1) == false) return false}
            return true}
        
        return false
        }

    _Assertion_Function(foo, p , fname) {
        try {
            foo(p["a"], p["b"], p["c"], p["d"])
        } catch (error) {
            return this._passed(fname, "Error was thrown")
        } 
        return this._failed(fname, "Error was not thrown")
        
    }
    
    _Assertion_Object(obj, p , fname) {
        try {
            new obj.constructor(p["a"], p["b"], p["c"], p["d"])
        } catch (error) {
            return this._passed(fname, "Error was thrown")
        } 
        return this._failed(fname, "Error was not thrown")
        
    }

// ##################################################################################
// # Print                                                                          #
// ##################################################################################

    PrintResult(targetDivID, tableID, addStyle = true) {
        if (addStyle) document.head.appendChild(this._style());   
        let targetDiv = document.getElementById(targetDivID)
        if (!targetDiv.classList.contains('js-fill'))  return
        targetDiv.append(this._table(tableID));
    }

    ShowTestResult(target = 'console') {
        if (target == 'popup') {
            this.PrintToPopUp2();
            return
        }

        this._renderConsole()

    }

    _renderConsole() {
        console.group("Test Execution Results");
        let passedCount = 0;

        this.testResults.forEach(res => {
            if (res.result === 'passed') {
                passedCount++;
                console.log(`%c✅ [${res.functionName}] ${res.testCaseName} - ${res.testName}: PASSED`, 'color: #2e7d32; font-weight: bold;');
            } else {
                console.log(`❌ [${res.functionName}] ${res.testCaseName} - ${res.testName}: FAILED (${res.msg})`);
            }
        });

        console.log(`\nSummary: ${passedCount}/${this.testResults.length} passed.`);
        console.groupEnd();
    }

    CasesAsJSON() {
        let out = [];
        if (!Array.isArray(this.cases)) return out;
        for (let c of this.cases) {
            // expect c to be an array: [functionName, testName, result, message]
            let obj = {
                fName: c[0] !== undefined ? c[0] : null,
                tName: c[1] !== undefined ? c[1] : null,
                result: c[2] !== undefined ? c[2] : null,
                message: c[3] !== undefined ? c[3] : null
            };
            out.push(obj);
        }
        return out;
    }



    // region popup

    _nav() {
        let nav = document.createElement('nav');
        nav.innerHTML = `
            <span class="nav-text">Test Results</span>
            <span class="nav-text">Total Tests: ${this.testResults.length}</span>
            <span class="nav-text">Failed: ${this.testResults.filter(r => r.result === 'failed').length}</span>
            
            <a class="nav-btn-blue" onclick="SelectFile()" style="margin-left: 40px;">Select JSON</a>
            <a id="id-save" class="nav-btn-red hidden"  onclick="SaveToFile()" style="margin-left: 20px;" disabled>Save Test Results to JSON</a>
            <span class="nav-text" id="id-status"></span>
        `;
        return nav;
    }

        
    _style() {
        let style = document.createElement('style');
        let css = `
            :root {
                --color-nav-bg: #343a40;
                --color-nav-down-bg: #374151;

                --color-nav-font: white;
                
                --color-nav-btn-bg:#007bff;
                --color-nav-btn-font: white;
            }
            body {
                background-color: #222;
                color: #ddd;
            }

            .hidden {
                display: none;
            }
            table, th, td {
                border: 1px solid #444;
                border-collapse: collapse;
                margin: 5px;
                padding: 5px;
                padding-right: 20px;
            }
            td.failed {
            background-color: #CC0000;
            color: #e2d6d6;
            }

            nav {
                display: block;
                padding: 0;
                overflow: hidden;
            }

            nav > a, nav > div.drop, nav span.nav-text {
                float: left;
            }
            
            /* nav > a, nav > div.drop a { */
            nav a, nav span.nav-text, .sidebar a {
                display: inline-block;
                text-align: center;
                padding: 14px 16px;
                text-decoration: none;
            }

            /* Color of the nav */
            :has(> nav),
            nav, 
            nav > a,
            nav > div.drop > a { 
                color: var(--color-nav-font);
                background-color: var(--color-nav-bg);
            }

            nav > div.drop > div.down > a { 
                color: var(--color-nav-font); 
                background-color: var(--color-nav-down-bg); 
            }

            nav > a:hover, 
            nav > div.drop > a:hover, 
            nav > div.drop > div.down > a:hover { 
                filter: brightness(1.6);
            }

            nav > a[class^="nav-btn"] {
                transition: filter 0.2s, transform 0.1s;
                background-color: var(--color-nav-btn-bg);
                color: var(--color-nav-btn-font);
            } 

            nav > a[class^="nav-btn"]:hover {
                background-color: color-mix(in srgb, var(--color-nav-btn-bg, #000), white 15%);
            }

            .nav-btn-blue {
                background-color: var(--color-nav-btn-bg, #007bff);
            }

            .nav-btn-red {
                background-color: #dc3545
            }

            /* Any element with the .nav-fixed class that is also the direct parent of a nav 
            */
            .nav-fixed:has(nav) {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                margin-left: auto;
                margin-right: auto;
            }
            `;

        style.appendChild(document.createTextNode(css));
        return style
    }

    _table(tableID) {
        let table = document.createElement('table')
        let thead = document.createElement('thead')
        let tbody = document.createElement('tbody');

        thead.append(this._tableRow('th', ['no.', 'Function Name', 'Test Name', 'result', 'message']))

        for (let i = 0; i< this.cases.length; i++) {
            tbody.append(this._tableRow('td', [i+1].concat(this.cases[i])))}

        table.append(thead)
        table.append(tbody)

        if (tableID != undefined) table.id = tableID
        return table
    }

    _table2() {
        let table = document.createElement('table')
        let thead = document.createElement('thead')
        let tbody = document.createElement('tbody');

        thead.append(this._tableRow('th', ['no.', 'Function Name', 'TestCase Name', 'Test Name', 'result', 'message']))

        for (let i = 0; i< this.testResults.length; i++) {
            let symbol = this.testResults[i].result == 'passed' ? '✅' : '❌';
            let className = this.testResults[i].result == 'failed' ? 'failed' : '';
            let row = document.createElement('tr')
            row.innerHTML = '<td>' + (i+1) + '</td>'
            row.innerHTML += '<td>' + symbol + ' ' + this.testResults[i].functionName + '</td>'
            row.innerHTML += '<td>' + this.testResults[i].testCaseName + '</td>'
            row.innerHTML += '<td>' + this.testResults[i].testName + '</td>'
            row.innerHTML += '<td class="' + className + '">' + this.testResults[i].result + '</td>'
            row.innerHTML += '<td>' + this.testResults[i].msg + '</td>'

            tbody.append(row);
        }

        table.append(thead)
        table.append(tbody)

        return table
    }

    _tableRow(tx, arr) {
        let row = document.createElement('tr')

        for (let item of arr) {
            let cell = document.createElement(tx)
            if (item == 'failed') cell.classList.add('failed')
            cell.innerHTML = item
            row.append(cell)}
        
        return row
    }

    _popup_script() {
        let script = document.createElement('script');
        script.innerHTML = `
            let data = ${JSON.stringify(this.testResults)};
            let filePointer = null;
            let expectedFileName = ${JSON.stringify(this.saveToFile || "")};
            async function SelectFile () {
                [filePointer] = await window.showOpenFilePicker();
                document.getElementById('id-status').textContent = "File selected: " + filePointer.name + " - Wrong file. Please select " + expectedFileName;
                console.log("Expected file: " + expectedFileName);

                if (document.getElementById('id-status').textContent.includes("File selected: " + expectedFileName)) {
                    document.getElementById('id-status').textContent = "File selected: " + filePointer.name;
                    document.getElementById('id-save').classList.remove('hidden');
                }
            }

            async function SaveToFile() {
                if (!document.getElementById('id-status').textContent.includes(expectedFileName))
                    return

                if (!filePointer) {
                    document.getElementById('id-status').textContent = "Please select a file first.";
                }
                // Create a Writeable stream to the file
                let writable = await filePointer.createWritable();
                // Write to file
                writable.write("let FromFile_FunctionsTestResults = " + JSON.stringify(data, null, 4));
                // Close the file
                await writable.close();
                //Indicate sucess
                document.getElementById('id-save').classList.add('hidden');
                document.getElementById('id-status').innerText = "Successfully written to " + filePointer.name;
            }
        `;
        return script;
    }

    DownloadTestResult(filename = 'test-results.json') {
        if (this.testResults.length === 0) 
        return;

        // Structure the export payload
        const exportData = {
        summary: {
            total: this.testResults.length,
            passed: this.testResults.filter(r => r.result === 'passed').length,
            failed: this.testResults.filter(r => r.result === 'failed').length,
        },
        results: this.testResults
        };

        // Convert object to formatted JSON string
        const jsonString = JSON.stringify(exportData, null, 2);

        //Create a Blob object with JSON MIME type
        const blob = new Blob([jsonString], { type: 'application/json' });

        // Create a temporary anchor element to trigger the download
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.download = filename || 'test-results.json';

        // 6. Programmatically click the link and immediately clean up memory
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Release ObjectURL after short time
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

}
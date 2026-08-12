class clsTest {
    constructor(testFunctions) {
        // list of actual test cases to run, if null, all testCase_* functions will be auto-discovered
        this.testFunctions = testFunctions;
        this.testResults = [];

        this.currentTestCaseName = null;

        this.popup = {
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

    PrintToPopUp() {
        let popup = window.open("", "_blank"); 
        let doc = popup.document;

        // structure
        doc.open();
        let html = doc.createElement("html");
        let head = doc.createElement("head");
        let body = doc.createElement("body");

        head.appendChild(this._style());
        body.appendChild(this._nav()); 
        body.appendChild(this._divHeader()); 
        body.appendChild(this._table())
        body.appendChild(this._popup_script());

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


    _passed(fname, testName, msg = '') {
        this.testResults.push({
            result: 'passed',
            functionName: fname,
            testCaseName: this.currentTestName,
            testName: testName,
            msg: msg
        });
        
    }

    _failed(fname, testName, msg) {
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

    Equal(a, b, fName, testName) {
        if (this._IsEqual(a,b)) {
            return this._passed(fName, testName)}
        else {
            return this._failed(fName, testName, " " + a + " not equal to " + b + ". ")}
    }

    IsTrue(a, fName, testName) {
        if(a) return this._passed(fName, testName);
        return this._failed(fName, testName, "failed");
    }

    ThrowError(fn, args = [], fName = "", testName = "", msg = "") {
        try {
            fn(...args); 
        } catch (error) {
            const errorMsg = error?.message || String(error);
            if (msg == "") {
                return this._passed(fName, testName + " (Error Test)", "Error was thrown: " + errorMsg);
            }
            if (errorMsg == msg) {
                return this._passed(fName, testName + " (Error Test)", "Error was thrown as expected: " + errorMsg);
            }
            return this._failed(fName, testName + " (Error Test)", "Error was thrown, but unexpected error message: " + errorMsg);
        }
        return this._failed(fName, testName + " (Error Test)", "Expected error, but function ran without throwing an error.");
    }

// ##################################################################################
// # Checker helper                                                                 #
// ##################################################################################

    _typ(variable) {
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
        
        if (this._typ(a)!=this._typ(b)) return false
    
        if (['bool', 'int', 'str', 'null', 'undefined'].includes(this._typ(a)) && (a == b)) return true

        if (['list'].includes(this._typ(a)) && (a.length == b.length)) {
            for (let i = 0; i< a.length; i++) {
                if (this._IsEqual(a[i], b[i], max_iterations-1) == false) return false}
            return true}

        if (['dict'].includes(this._typ(a)) && (Object.keys(a).length == Object.keys(b).length)) {
            for (let key of Object.keys(a)) {
                if (!b.hasOwnProperty(key)) return false}

            for (let key of Object.keys(a)) {
                if (this._IsEqual(a[key], b[key], max_iterations-1) == false) return false}
            return true}
        
        return false
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
            this.PrintToPopUp();
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


    // region popup

    _nav() {
        let nav = document.createElement('nav');
        nav.innerHTML = `
            <span class="nav-text">To save test results: </span>
            
            <a class="nav-btn-blue" onclick="SelectFile()" style="margin-left: 40px;">Select File</a>
            <span class="nav-text hidden" id="id-status-warning">DANGER: File content will be overwritten</span>
            <a id="id-save" class="nav-btn-red hidden"  onclick="SaveToFile()" style="margin-left: 20px;" disabled>Save test results to selected file</a>
            <span class="nav-text" id="id-status-save"></span>
            <a id="id-open" class="nav-btn-blue hidden"  onclick="OpenFile()" style="margin-left: 20px;" disabled>show saved content</a>
        `;
        return nav;
    }

    _divHeader() {
        let div = document.createElement('div');
        div.innerHTML = `
            <h1>Test Results</h1>
            <p>
            Total Tests: ${this.testResults.length} | Failed: ${this.testResults.filter(r => r.result === 'failed').length}</p>
        `;
        return div;
    }

        
    _style() {
        let style = document.createElement('style');
        let css = `
            :root {
                --color-nav-bg: #343a40;
                --color-nav-down-bg: #374151;

                --color-nav-font: white;
            
            }
            body {
                background-color: #222;
                color: #ddd;
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


            /* Any element with the .nav-fixed class that is also the direct parent of a nav */
            .nav-fixed:has(nav) {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                margin-left: auto;
                margin-right: auto;
            }

            nav {
                display: block;
                padding: 0;
                overflow: hidden;
            }

            nav > a, nav > div.drop, nav span.nav-text {
                float: left;
            }
            
            nav a, nav span.nav-text{
                display: inline-block;
                text-align: center;
                padding: 14px 16px;
                text-decoration: none;
            }

            /* COLORS OF THE NAV */
            /* First level of nav items */
            :has(> nav),
            nav, 
            nav > a,
            nav > div.drop > a { 
                color: var(--color-nav-font);
                background-color: var(--color-nav-bg);
            }

            /* Second level of nav items */
            nav > div.drop > div.down > a { 
                color: var(--color-nav-font); 
                background-color: var(--color-nav-down-bg); 
            }

            /* Hover effect for nav items */
            nav > a:hover, 
            nav > div.drop > a:hover, 
            nav > div.drop > div.down > a:hover { 
                filter: brightness(1.6);
            }

            /* Button colors */
            .nav-btn-blue {
                color: white;
                background-color: #007bff;
            }

            .nav-btn-red {
                color: white;
                background-color: #dc3545;
            }

            nav > a[class^="nav-btn"] {
                transition: filter 0.2s, transform 0.1s;
            } 

            .hidden {
                display: none !important;
            }


            `;

        style.appendChild(document.createTextNode(css));
        return style
    }

    _table() {
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
                document.getElementById('id-status-save').textContent = "File selected: " + filePointer.name + " - Wrong file. Please select " + expectedFileName;
                console.log("Expected file: " + expectedFileName);

                if (document.getElementById('id-status-save').textContent.includes("File selected: " + expectedFileName)) {
                    document.getElementById('id-status-save').textContent = "File selected: " + filePointer.name;
                    document.getElementById('id-status-warning').classList.remove('hidden');
                    document.getElementById('id-save').classList.remove('hidden');
                }
            }

            async function SaveToFile() {
                if (expectedFileName != '' && !document.getElementById('id-status-save').textContent.includes(expectedFileName))
                    return

                if (!filePointer) {
                    document.getElementById('id-status-save').textContent = "Please select a file first.";
                }
                // Create a Writeable stream to the file
                let writable = await filePointer.createWritable();
                // Write to file
                writable.write("let FromFile_FunctionsTestResults = " + JSON.stringify(data, null, 4));
                // Close the file
                await writable.close();
                //Indicate sucess
                document.getElementById('id-save').classList.add('hidden');
                document.getElementById('id-status-warning').classList.add('hidden');
                document.getElementById('id-open').classList.remove('hidden');
                document.getElementById('id-status-save').innerText = "Successfully written to " + filePointer.name;
            }

            async function OpenFile() {
                        if (!filePointer) {
                            document.getElementById('id-status-save').textContent = "Please select a file first.";
                            return;
                        }

                        const file = await filePointer.getFile();
                        const content = await file.text();

                        const newWin = window.open('', '_blank');
                        if (newWin) {
                            newWin.document.write(\`
                                <!DOCTYPE html>
                                <html>
                                <head>
                                    <title>\${file.name}</title>
                                    <style>
                                        body { font-family: system-ui, sans-serif; padding: 20px; background: #1e1e1e; color: #d4d4d4; }
                                        pre { font-family: 'Consolas', monospace; font-size: 13px; line-height: 1.5; white-space: pre-wrap; word-break: break-all; margin: 0; }
                                    </style>
                                </head>
                                <body>
                                    <h3>\${file.name}</h3>
                                    <pre>\${content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
                                </body>
                                </html>
                            \`);
                            newWin.document.close();
                        }
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
    
    function mergeListsByName(listA, listB) {
        // 1. Create a shallow copy of listA elements to avoid mutating the original list
        const mergedMap = new Map(listA.map(item => [item.name, { ...item }]));

        // 2. Iterate through listB
        for (const itemB of listB) {
            // Check if an item with the same name already exists from listA
            if (mergedMap.has(itemB.name)) {
                const existingItem = mergedMap.get(itemB.name);
                
                mergedMap.set(itemB.name, { ...existingItem, ...itemB });
            }
        }

        // 3. Convert the Map values back into an array
        let ret = Array.from(mergedMap.values());

        //4. Add key with number of Code Rows
        ret = AddKey_NumberCodeRows(ret)
        
        return ret
    }

    function AddKey_NumberCodeRows(listOfDictionaries) {
        for (const item of listOfDictionaries) {
            const codeValue = item.code || "";
            const lineCount = (codeValue.match(/\n/g) || []).length;
            item.codeLines = lineCount+1;
        }

        return listOfDictionaries
    }

    function addTestResultstoList(mergedFunctionsInfo, FromFile_FunctionsTestResults) {
        for (let item of mergedFunctionsInfo) {
            let countPassed = 0
            let countFailed = 0

            for (let testItem of FromFile_FunctionsTestResults) {
                if (testItem.fName == item.name) {
                    if (testItem.result == "passed")
                        countPassed += 1

                    if (testItem.result == "failed")
                        countFailed += 1
                }

                item.testsPassed = countPassed
                item.testsFailed = countFailed

                item.testStatus = "green"
                if (item.testsPassed == 0) 
                    item.testStatus = "yellow"
                if (item.testsFailed > 0 )
                    item.testStatus = "red"
            }

        }
        return mergedFunctionsInfo
    }
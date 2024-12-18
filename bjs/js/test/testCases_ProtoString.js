function testCases_ProtoString(myTest) {
    testcase_ProtoString_Until(myTest)
    testcase_ProtoString_After(myTest)
    testcase_ProtoString_Digits(myTest)
}

function testcase_ProtoString_Until(myTest) {
    let fname = arguments.callee.name;
    
    myTest.Equal(true, true,'---------------------')
    let text = 'Hallo Welt'
    myTest.Equal(text.until(' '), 'Hallo', fname)  
}

function testcase_ProtoString_After(myTest) {
    let fname = arguments.callee.name;
    
    myTest.Equal(true, true,'---------------------')
    let text = 'Hallo Welt'
    myTest.Equal(text.after(' '), 'Welt', fname)  
}

function testcase_ProtoString_Digits(myTest) {
    let fname = arguments.callee.name;
    
    myTest.Equal(true, true,'---------------------')
    let text = 'Hallo Welt 1234'
    myTest.Equal(text.digits(), ['1234'], fname)
    myTest.Equal('Hallo 1 2 3 Welt'.digits(), ['1', '2', '3'], fname)  
    myTest.Equal('Hallo 1 2 3 Welt'.digits(2), [], fname)  
    myTest.Equal('Hallo 1 22 333 4444 Welt'.digits(2), ['22', '333', '4444'], fname)
    myTest.Equal('Hallo 1 22 333 4444 Welt'.digits(2,2), ['22'], fname)  
}
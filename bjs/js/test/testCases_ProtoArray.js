function testCases_ProtoArray(myTest) {
    testcase_ProtoArray_Depth(myTest)
    testcase_ProtoArray_Count(myTest)
    testcase_ProtoArray_Replace(myTest)
    testcase_ProtoArray_PrePost(myTest)
}

function testcase_ProtoArray_Depth(myTest) {
    let fname = arguments.callee.name;
    
    myTest.Equal(true, true,'---------------------')
    myTest.Equal([1, 2, 3].depth(),1,fname)
    myTest.Equal([1, [2], 3].depth(),2,fname)
    myTest.Equal([1, [2, [3]]].depth(),3,fname)
    myTest.Equal([1,[2, [[1,[2, [4]],3]]],3].depth(),6,fname)
    myTest.Equal([1,[2, [[1,[2, [4]],3]]],3].depth(6),6,fname)
    myTest.Equal([1,[2, [[1,[2, [4]],3]]],3].depth(5),5,fname)
    myTest.Equal([1,[2, [[1,[2, [4]],3]]],3].depth(4),4,fname)
    myTest.Equal([1,[2, [[1,[2, [4]],3]]],3].depth(1),1,fname)
    myTest.Equal([1,[2, [3, [4, [5, [6, [7, [8, [9, [10, [11]]]]]]]]]]].depth(),9,fname)    // deault max value
}

function testcase_ProtoArray_Count(myTest) {
    let fname = arguments.callee.name;
    
    myTest.Equal(true, true,'---------------------')
    myTest.Equal([1, 2, 3].count(3),1,fname)    
    myTest.Equal([1, 2, 3, 3, 4].count(3),2,fname)
    myTest.Equal(["1", "2", "3", "3", "4"].count(3),0,fname)
    myTest.Equal(["1", "2", "3", "3", "4"].count("3"),2,fname)
    myTest.Equal(["1", "2", "3", "34"].count("3"),1,fname)
}


function testcase_ProtoArray_Replace(myTest) {
    let fname = arguments.callee.name;
    
    myTest.Equal(true, true,'---------------------')  
    myTest.Equal(["1", "2", "3", "3", "4"].replace("3", "9"), ["1", "2", "9", "9", "4"], fname)
    myTest.Equal(["1", "2", "33", "3", "4"].replace("3", "9"), ["1", "2", "99", "9", "4"], fname)
    myTest.Equal(["1", "2", "33", "3", "4"].replace("3", "9", true), ["1", "2", "33", "9", "4"], fname)
    myTest.Equal(["1", "2", "33", "3", "4"].replace("3", "9", true), ["1", "2", "33", "9", "4"], fname)

    let longString = '3'.repeat(110)
    let expectedString = '9'.repeat(100) + '3'.repeat(10)
    myTest.Equal(["1", longString, "4"].replace("3", "9"), ["1", expectedString, "4"], fname + '_recursion')
}

function testcase_ProtoArray_PrePost(myTest) {
    let fname = arguments.callee.name;
    
    myTest.Equal(true, true,'---------------------')  

    myTest.Equal(["1", "2", "3"].prepost("Das ist die ", "."), ["Das ist die 1.", "Das ist die 2.", "Das ist die 3."], fname)
}
function testCases_ProtoArray(myTest) {
    testcase_ProtoArray_Depth(myTest)
    testcase_ProtoArray_Count(myTest)
    testcase_ProtoArray_Replace(myTest)
    testcase_ProtoArray_PrePost(myTest)
    testcase_ProtoArray_keyValues(myTest)
    testcase_ProtoArray_removeDuplicates(myTest)
    testcase_ProtoArray_MeWithNewKeys(myTest)
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

function testcase_ProtoArray_keyValues(myTest) {
    let fname = arguments.callee.name;
    
    let data = [
        {'A': 'Hallo', 'B': 123},
        {'A': 'liebe', 'B': 456, 'C': "foo"}, 
        {'A': 'Welt', 'B': 789, 'C': "bar"}
    ]
    myTest.Equal(true, true,'---------------------')  
    myTest.Equal(data.keyValues("A"), ['Hallo', 'liebe', 'Welt'], fname)
    myTest.Equal(data.keyValues("C"), ['foo', 'bar'], fname)
}

function testcase_ProtoArray_removeDuplicates(myTest) {
    let fname = arguments.callee.name;

    myTest.Equal(true, true,'---------------------')  
    myTest.Equal(["1", "2", "3", "3", "4"].removeDuplicates(), ["1", "2", "3", "4"], fname)
}

function testcase_ProtoArray_MeWithNewKeys(myTest) {
    let fname = arguments.callee.name;

    let test = [
        {'name': 'John', 'age': 30, 'city': 'New York'},
        {'name': 'Jane', 'age': 25, 'city': 'Los Angeles'}
    ]

    let test2 = [
        {'summary': 'John', 'age': 30, 'city': 'New York'},
        {'summary': 'Jane', 'age': 25, 'city': 'Los Angeles'}
    ]
    myTest.Equal(true, true,'---------------------')  
    myTest.Equal(test.MeWithNewKeys(['name'], ['summary']), test2, fname) 
}
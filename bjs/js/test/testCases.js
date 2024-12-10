function testCases(myTest) {
    testcase_Proto_Depth(myTest);myTest.Equal(true, true,'---------------------')
    testcase_Proto_Count(myTest)
}

function testcase_Proto_Depth(myTest) {
    let fname = arguments.callee.name;
    
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

function testcase_Proto_Count(myTest) {
    let fname = arguments.callee.name;
    
    myTest.Equal([1, 2, 3].count(3),1,fname)
    myTest.Equal([1, 2, 3, 3, 4].count(3),2,fname)
    myTest.Equal(["1", "2", "3", "3", "4"].count(3),0,fname)
    myTest.Equal(["1", "2", "3", "3", "4"].count("3"),2,fname)
    myTest.Equal(["1", "2", "3", "34"].count("3"),1,fname)
}
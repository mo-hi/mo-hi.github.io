function testCases(myTest) {
    testcase_Proto_Depth(myTest)
}

function testcase_Proto_Depth(myTest) {
    let fname = arguments.callee.name;
    
    myTest.Equal([1,2,3].depth(),1,fname)
    myTest.Equal([1,[2],3].depth(),2,fname)
    myTest.Equal([1,[2, [4]],3].depth(),3,fname)
    myTest.Equal([1,[2, [[1,[2, [4]],3]]],3].depth(),6,fname)
    myTest.Equal([1,[2, [[1,[2, [4]],3]]],3].depth(6),6,fname)
    myTest.Equal([1,[2, [[1,[2, [4]],3]]],3].depth(5),5,fname)
    myTest.Equal([1,[2, [[1,[2, [4]],3]]],3].depth(4),4,fname)
    myTest.Equal([1,[2, [[1,[2, [4]],3]]],3].depth(1),1,fname)
}

function testCases(myTest) {
    testcase_Equal_True(myTest)
    testcase_Equal_False(myTest)
}

function testcase_Equal_True(myTest) {
    let fname = arguments.callee.name;
    
    myTest.Equal(1,1,fname)
    myTest.Equal([1,2,3],[1,2,3],fname)
    myTest.Equal({"A":[1,2,3], "B":{"a":1, "b":2}, "C":"Text", "D":123, "E": true}, {"A":[1,2,3], "B":{"a":1, "b":2}, "C":"Text", "D":123, "E": true},fname)

}

function testcase_Equal_False(myTest) {
    let fname = arguments.callee.name;
    
    myTest.Equal(1,2,fname)
    myTest.Equal([1,2,3],[1,2,333],fname)
    myTest.Equal({"A":[1,2,3], "B":{"a":1, "b":2}, "C":"Text", "D":123, "E": true}, {"A":[1,2,0], "B":{"a":1, "b":2}, "C":"Text", "D":123, "E": true},fname)
    myTest.Equal({"A":[1,2,3], "B":{"a":1, "b":2}, "C":"Text", "D":123, "E": true}, {"A":[1,2,322], "B":{"a":333, "b":2}, "C":"Text", "D":123, "E": true},fname)
}
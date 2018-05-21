function a(){
    var b = 'a';
    function b(){
       console.log('b')
    }
    
    console.log(b)
}
a()
//解析时
function a(){
    var b = 'a';
    b = function b(){console.log('b')};
    console.log(b);
}
//执行时
function a(){
    b = function b(){console.log('b')};
    var b = 'a';
    console.log(b);
}
a();
function Person(name,sex,height){
    this.name = name;
    this.sex = sex;
    this.height = height;
    this.friend = ["liao","liaoliao"];
}
Person.prototype = {
    construtor :Person,
    say : function(){
        console.log("i'm "+this.name);
    }
}
//寄生式构造
// function Person(name,sex,height){
//     var o = new Object();
//     o.name = name;
//     o.sex = sex;
//     o.height = height;
//     o.friend = ["liao","liaoliao"];
//     o.say = function(){
//         console.log("i'm "+this.name);
//     }
//     return o;
// }
//稳妥构造
// function Person(name,sex,height){
//     var o=new Object();
//     var name = name;
//     var sex = sex;
//     var height = height;
//     var friend = ["liao","liaoliao"];
//     o.say = function(){
//         console.log("i'm "+name);
//     }
//     return o;
// }
// var person1 = Person("liao","boy",150);
// person1.say();
// console.log(person1.friend);
// person1.name="gg";
// person1.say();
function Superman(){
    var superman = new Person();
    superman.name = "wyp";
    superman.fly = function(){
        superman.say.call(this);
        console.log(this.name+" is flying");
    };
    return superman;
}
var person1=new Person("yao","公",150);
var person2=new Person("ji","母",160);
person1.say(); //i'm yao
console.log(person1.friend); //['liao','liaoliao']
person1.friend.push("bulaili"); 
console.log(person1.friend); //['liao','liaoliao','bulaili']
console.log(person2.friend); //['liao','liaoliao']
person2.say(); //i'm ji
person1.name="2333";
person1.say(); //i'm 2333
var wyp=new Superman();
wyp.fly(); //i'm wyp \n wyp is flying
wyp.name = "daer";
wyp.fly(); //i'm daer \n daer is flying 
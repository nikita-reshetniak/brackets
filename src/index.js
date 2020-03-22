module.exports = function check(str, bracketsConfig) {
  const opens = bracketsConfig.map(x => x[0]);
  const closes = bracketsConfig.map(x => x[1]);
  
  let equals = {};
  bracketsConfig.forEach(element => {
    if (element[0] == element[1]) {
      equals[element[0]] = 0;
    }
  });

  let stack = [];
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (equals.hasOwnProperty(char)) {
      equals[char] += i % 2 == 0 ?  1 : -1;
    } else if (opens.includes(char)) {
      stack.push(char);
    } else if (opens.indexOf(stack[stack.length - 1]) == closes.indexOf(char)) {
      stack.pop();
    } else {
      return false;
    }
  }
  
  for (key in equals) {
    if (equals[key] != 0) return false;
  }

  return stack.length == 0;
}
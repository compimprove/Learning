function getNthFib(n) {
  switch (n) {
    case 1: return 0;
    case 2: return 1;
    default: {
      let firstNumber = 0, secondNumber = 2, thirdNumber;
      for (let index = 3; index <= n; index++) {
        thirdNumber = firstNumber + secondNumber;
        firstNumber = secondNumber;
        secondNumber = thirdNumber;
      }
      return thirdNumber;
    }
  }
}

(function () {
  console.log(getNthFib(10));
})()
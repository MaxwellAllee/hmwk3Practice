document.getElementById('generate').addEventListener("click", function () {
    var count
    function intial() {
        count = prompt('How may characters long woul you like your password?')
    }
    intial()
    console.log(isNaN(count))
    if (isNaN(count)) {
        alert('Must be a number')
        intial()
    }
    else if (!count) {
        console.log('do nothing')
    }
    else if (count < 8) {
        alert('Must be at least 8 digits long')
        intial()
    }
    else if (count > 128) {
        alert('Must be less than 128 digits long')
        intial()
    }
    else {
        var special = confirm('Would you like special characters?')
        var numbers = confirm('Would you like numbers?')
        var lower = confirm('Would you like lower case letters?')
        var upper = confirm('would you like upper case letters?')
        if (!special && !numbers && !lower && !upper) {
            alert('You must have at least one type of character!')
            intial()
        }
        else {
            generator(special, numbers, lower, upper, count)
        }
    }
})
function generator(special, numbers, lower, upper, count) {
    var specialChar = ['!', '#', '$', '%', '&', '(', ')', '*', '+', '-', '"', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~']
    var lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    var upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    var nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    var optArray = []
    var password = ''
    if (special) {
        optArray.push(specialChar)
    }
    if (numbers) {
        optArray.push(nums)
    }
    if (lower) {
        optArray.push(lowerCase)
    }
    if (upper) {
        optArray.push(upperCase)
    }
    for (let i = 0; i < count; i++) {
        var optOption = Math.floor(Math.random() * optArray.length)
        password += optArray[optOption][Math.floor(Math.random() * optArray[optOption].length)]
    }
    if (special) {
        if (!contains(specialChar)) generator(special, numbers, lower, upper, count)
    }
    if (numbers) {
        if (!contains(nums)) generator(special, numbers, lower, upper, count)
    }
    if (lower) {
        if (!contains(lowerCase)) generator(special, numbers, lower, upper, count)
    }
    if (upper) {
        if (!contains(upperCase)) generator(special, numbers, lower, upper, count)
    }
    function contains(checking) {
        return password.split('').some(function (v) {
            return checking.indexOf(v) >= 0;
        });
    };
    document.getElementById("pass").value = password
    document.getElementById("copy").disabled = false
}
document.getElementById('copy').addEventListener("click", function () {
    var copyText = document.getElementById("pass");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert("Your password: " + copyText.value + " has been copied!");
})
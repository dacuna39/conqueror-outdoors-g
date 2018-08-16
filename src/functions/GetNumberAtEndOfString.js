
export default function (string) {

  var str = decodeURI(string);

  for (var i = str.length - 1; i >= 0; i--) { //loop from the end of the str
    if (isNaN(parseInt(str.charAt(i), 10))) { //if character is not the str (a number)

      str = str.slice(i + 1);
      i = -1;
    }
  }


  return str;
};
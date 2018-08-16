
export default function (url) {
  
  var str = decodeURI(url);

    for (var i = str.length -1; i >= 0; i--) { //loop from the end of the str
      if (str.charAt(i) === '/') { //if character is not the str (a number)
        
        str = str.slice(i + 1);
        i = -1;
      }
    }

    str = str.replace('orders', '')

  return str;
};
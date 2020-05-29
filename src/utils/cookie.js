export function cookieSplit(cookieStr) {

  let cookies = cookieStr.split(';')
  /*
    token=sdagjh
    js=dkhfd
    css=242
  */
 let cookie = {}

  for (let i = 0; i < cookies.length; i++) {

    let item = cookies[i].split('=');
    cookie[item[0]] = item[1];

  }

  return cookie;

}


export function removeToken() {
  setCookie('token', "", -1);
}

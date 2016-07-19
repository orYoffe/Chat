const api = (method) => (url, data) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    if(method === 'GET'){
      xhr.open('GET', encodeURI('api/' + url))
    }else{
      xhr.open('POST', encodeURI('api/' + url), true)
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    }
    xhr.onload = function() {
      if (xhr.status === 200) {
        resolve(xhr.responseText)
      }else {
        reject(xhr.status)
      }
    }
    xhr.send(data)
  })
}

export default {
  get: api('GET'),
  post: api('POST')
}

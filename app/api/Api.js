const API_URL="https://dream-catcher-1518753581722.appspot.com/"
export function Signup(username, password){
  return fetch(API_URL+'api/sign-up', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
      }),
      //Response
    }).then(res => res.json())
      .catch(error =>  error)
  // Use this if you do not want to have (res, error)
    // .then(response =>  response)
    // .catch(error =>  error)
}

export function Login(username, password){
  return fetch(API_URL+'api/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
      }),
      //Response
    }).then(res => res.json())
      .catch(error =>  error)
}

export function AddDream(title, entry, tags, token){
  return fetch(API_URL+'api/dream/new',{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify({
      title: title,
      entry: entry,
      tags: tags
      }),
  }).then(res => res.json())
    .catch(error =>  error)
  }

  export function PopulateDreams(token){
    console.log(token);
    return fetch(API_URL+'api/dream',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    }).then(res => res.json())
      .catch(error =>  error)
  }

export function Logout(){
  return fetch(API_URL+'api/logout', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
      }),
      //Response
  }).then(res => res.json())
    .catch(error =>  error)
}
export function DeleteDream(id, token){
  return fetch(API_URL+'api/dream/'+id+'/delete', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  }).then(res => res.json())
    .catch(error =>  error)
}

export function EditDream(id, title, entry, tags, token){
  return fetch(API_URL+'api/dream/'+id+'/edit',{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify({
      title: title,
      entry: entry,
      tags: tags
      }),
  }).then(res => res.json())
    .catch(error =>  error)
  }

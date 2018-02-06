export function Signup(username, password){
  return fetch('http://127.0.0.1:3000/api/sign-up', {
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
  return fetch('http://127.0.0.1:3000/api/login', {
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
  return fetch('http://127.0.0.1:3000/api/dream/new',{
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
    return fetch('http://127.0.0.1:3000/api/dream',{
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
  return fetch('http://127.0.0.1:3000/api/logout', {
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
  return fetch('http://127.0.0.1:3000/api/dream/'+id+'/delete', {
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
  return fetch('http://127.0.0.1:3000/api/dream/'+id+'/edit',{
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
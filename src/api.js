const API_URL = process.env.REACT_APP_API_URL;

export function USER_POST(body) {
  return {
    url: API_URL + '/login/register',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function TOKEN_POST(body) {
  return {
    url: API_URL + '/login',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function TOKEN_VALIDADE_POST(token) {
  return {
    url: API_URL + '/login/token',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function LIST_GET(token) {
  return {
    url: API_URL + '/delivery',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}


export function DELIVERY_POST(body, token) {
  return {
    url: API_URL + '/delivery',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    },
  };
}


export function DELIVERY_GET(token) {
  return {
    url: API_URL + '/delivery',
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function DELIVERY_PATCH(id, body, token) {
  return {
    url: API_URL + '/delivery/' + id,
    options: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function DELIVERY_DELETE(id, token) {
  return {
    url: API_URL + '/delivery/' + id,
    options: {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}
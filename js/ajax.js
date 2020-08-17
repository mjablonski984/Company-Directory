export function getData(url, success) {
  $.ajax({
    type: 'GET',
    url: url,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    crossDomain: true,
    dataType: 'json',
    success: success,
    error: function (XHR, status, error) {
      console.log(XHR);
      console.log(status);
      console.log(error);
    },
  });
}

export function postData(url, data, success) {
  $.ajax({
    type: 'POST',
    url: url,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    crossDomain: true,
    dataType: 'json',
    data: data,
    success: success,
    error: function (XHR, status, error) {
      console.log(XHR);
      console.log(status);
      console.log(error);
    },
  });
}

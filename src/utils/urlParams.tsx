const getSearchParameters = () => {
  var paramString = window.location.search.substr(1);

  if ([null, ""].indexOf(paramString) > -1) {
    return {};
  }

  return transformToAssocArray(paramString);
};

const transformToAssocArray = (paramString) => {
  var params = {};
  var array = paramString.split("&");
  for (var i = 0; i < array.length; i++) {
    var [k, v] = array[i].split("=");
    params[k] = decodeURI(v);
  }
  return params;
};

export { getSearchParameters };

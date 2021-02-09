export function getField(field) {
  switch (field.type) {
    case "text": {
      try {
        return document
          .querySelector(field.selector)
          .textContent.trim()
          .replace(/\s{2,}/gi, " ");
      } catch (e) {
        return "";
      }
    }
    case "img": {
      try {
        return document.querySelector(field.selector).src;
      } catch (e) {
        return "";
      }
    }
    case "attr": {
      try {
        return document.querySelector(field.selector).getAttribute(field.attr);
      } catch (e) {
        return "";
      }
    }
    case "value": {
      try {
        return document.querySelector(field.selector).value;
      } catch (e) {
        return "";
      }
    }
  }
}

export function sendPostMessage(dataParam) {
  let data = dataParam;

  if (typeof data == "string") data = JSON.parse(dataParam);

  if (document.querySelector(data.loadedContent)) {
    let obj = {};

    for (let i = 0; i < data.fields.length; i++) {
      obj[data.fields[i].name] = getField(data.fields[i]);
    }

    obj.URL = window.location.href;
    obj.id = getRandomFromRange(1000, 9999) + "-" + getRandomFromRange(1000, 9999) + "-" + getRandomFromRange(1000, 9999);
    obj.count = 1;

    window.ReactNativeWebView.postMessage(JSON.stringify(obj));
  } else {
    console.warn("Not found detail page selector");
  }

  function getRandomFromRange(min, max) {
    return  Math.ceil(Math.random() * (max - min) + min);
  }
}

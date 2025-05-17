// const _ = require("lodash");
// export const BASE_URL = 'https://backendapp.uaehybrid.com/api/';
// export const BASE_URL_IMG = 'https://backendapp.uaehybrid.com/Images/';
export const BASE_URL_IMG = 'https://admin.plusregistration.com/Images/';
// import messaging from '@react-native-firebase/messaging';
// export const BASE_URL_Login = 'https://backendapp.uaehybrid.com/api/LoginSite';
import React from 'react';
// export const BASE_URL = 'https://account.uaehybrid.com/api/';
export const BASE_URL = 'https://admin.plusregistration.com/api/';
export const BASE_URL_V2 = 'https://admin.plusregistration.com/apiV2/';
// export const BASE_URL_IMG = 'https://account.uaehybrid.com/Images/';
// export const BASE_URL_Login = 'https://account.uaehybrid.com/api/LoginSite';
export const BASE_URL_Login =
  'https://admin.plusregistration.com/api/LoginSite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, Platform, Text } from 'react-native';
// import FastImage from 'react-native-fast-image';
// import ImagePicker from 'react-native-image-crop-picker';
// export const BASE_URL = "http://192.168.1.105/apptis/public/api/";
// import { myStore as store } from "./App";
// import { setTempStateRequest } from "./redux/actions/index";
export const sendFirebaseToken = async tokenF => {
  // const tokenF = await iid().getToken();
  const EventId = await AsyncStorage.getItem('eventId');
  const Email = await AsyncStorage.getItem('Token');

  // const tokenFCM = await messaging().getToken();
  // console.log(EventId, Email);
  EventId &&
    Email &&
    request(
      'POST',
      'GetFireBaseUserToken',
      {
        FireBaseToken: tokenF,
        Email,
        EventId,
        Allow: true,
      },
      () => { },
      () => { },
      async response => {
        console.log(response, 'testi');
        if (response.Result == 'Success') {
          // alert(JSON.stringify(response.Result));
        }
      },
      err => {
        console.log(JSON.stringify(err));
      },
    );
};

export const checkDats = dat => {
  let newdat = '';
  let dateArr = dat.split('-');
  if (
    dateArr[0] != '2021' &&
    dateArr[0] != '2022' &&
    dateArr[0] != '2023' &&
    dateArr[0] != '2024'
  ) {
    newdat = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
    // alert(dateArr);
    return newdat;
  } else {
    // alert(dat);
    newdat = dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2];
    // alert(dateArr);
    return newdat;
  }
};
export const CompareWithToday = Day => {
  let today = new Date();
  if (
    Math.round(today.getTime() / 100000) * 100000 <=
    new Date(checkDats(Day)).getTime()
  ) {
    return 'upcoming';
  } else {
    return 'previous';
  }
};
export const FindeEventDefault = arrEvent => {
  // alert(JSON.stringify(arrEvent))
  let a = 'nadare';
  arrEvent.map((event, index) => {
    // alert(JSON.stringify(event))
    if (event.Default == true) {
      a = event;
      // return
    }
  });
  return a;
};

export const getDay = time => {
  // console.log(time, 'datettin');
  if (time) {
    const index = time.indexOf('T');
    if (index) {
      return time.split('T')[0];
    } else {
      return time;
    }
  } else {
    return '';
  }
};

export const getTime = time => {
  const index = time.indexOf('T');
  if (index) {
    return time.split('T')[1];
  } else {
    return time;
  }
};
// export const OrganizationId = 23;
// export const AppName = 'ISHID2024';
export const OrganizationId = 23;
export const AppName = 'MENA Conference';
// export const OrganizationId = 2;
// export const AppName = 'SAARC2024';
// export const AppName = 'ECCC2024';
export const HtmlOneLine = texts => {
  return texts.replace(/<\/?[^>]+(>|$)/g, '').replace(/&\/?[^;]+(;|$)/g, '');
};
export const convertToISOString = (data) => {
  const date = new Date(data);
  // console.log(date.toISOString(),'datett');
  return date.toISOString();
}
export const getReminTime = (hourstart, MyDates) => {
  let valuestart = hourstart ? hourstart : '8:00';
  let objTime = {
    sec: '0',
    minut: '0',
    hour: '0',
    day: '0',
    remine: false,
  };

  let timeend = MyDates.split('-');

  let timeStart = new Date(`${MyDates}T${valuestart}`);
  // console.log(timeStart, 'timeStart');
  let timeEnd = new Date();

  let Totalsec = timeStart - timeEnd;
  Totalsec = Totalsec / 1000;
  let totalDay = Math.floor(Totalsec / 86400);
  let leftSec = Totalsec - totalDay * 86400;
  let hours = Math.floor(leftSec / 3600);
  leftSec %= 3600;
  let minutes = Math.floor(leftSec / 60);
  let seconds = Math.floor(leftSec % 60);
  if (Totalsec < 0) {
  } else {
    objTime = {
      hour: hours,
      sec: seconds,
      minut: minutes,
      day: totalDay,
      remine: true,
    };
  }
  return objTime;
};

export const convertMonth = dates => {
  var monthShortNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let month = dates.split('-');
  return monthShortNames[parseInt(month[1]) - 1];
};

export const convertDay = dates => {
  let month = dates.split('-');
  return month[2];
};

export const GetContactUs = props => {
  props.loading(true);
  requestGET(
    'GetContactUs',
    () => { },
    () => { },
    response => {
      // console.log(JSON.stringify(response), 'ss')
      // console.log(JSON.stringify(props))
      if (response.Result == 'Success') {
        props.callback(response);
      }
      props.loading(false);
    },
    err => {
      console.log(JSON.stringify(err));
      props.loading(false);
    },
  );
};

export const AddMyComment = async props => {
  const Token = await AsyncStorage.getItem('Token');
  // console.log(JSON.stringify({ EmailFrom: Token, EmailTo }))
  if (Token !== null && Token !== undefined && Token !== '') {
    props.loading(true);
    request(
      'POST',
      'AddComment',
      {
        EventId: props.EventId,
        Message: props.Message,
        AvgRate: props.AvgRate,
        Email: Token,
      },
      () => { },
      () => { },
      response => {
        // console.log(JSON.stringify(response))
        // console.log(JSON.stringify(props))
        if (response.Result == 'Success') {
          props.callback();
        }
        props.loading(false);
      },
      err => {
        // console.log(JSON.stringify(err))
        props.loading(false);
      },
    );
  } else {
    props.loading(false);
    // props.backerror('')
  }
};

export const getListComment = props => {
  props.loading(true);
  request(
    'POST',
    'ListComment',
    { EventId: props.EventId },
    () => { },
    () => { },
    response => {
      // console.log(JSON.stringify(response))
      // console.log(JSON.stringify(props))
      if (response.Result == 'Success') {
        props.callback(response.Answer);
      }
      props.loading(false);
    },
    err => {
      console.log(JSON.stringify(err));
      props.loading(false);
    },
  );
};

export const getEpostEventList = props => {
  props.loading(true);
  request(
    'POST',
    'EpostEventList',
    { EventId: props.EventId },
    () => { },
    () => { },
    response => {
      // console.log(JSON.stringify(response), 'ss');
      // console.log(JSON.stringify(props))
      if (response.Result == 'Success') {
        props.callback(response.Answer);
        props.callback2(response.Answer);
      }
      props.loading(false);
    },
    err => {
      console.log(JSON.stringify(err));
      props.loading(false);
    },
  );
};

export const getGetBackgroundImage = props => {
  props.loading(true);
  requestGET(
    'GetBackgroundImage',
    () => { },
    () => { },
    response => {
      // console.log(JSON.stringify(response), 'ss')
      // console.log(JSON.stringify(props))
      if (response.Result == 'Success') {
        props.callback(response.Answer);
      }
      props.loading(false);
    },
    err => {
      console.log(JSON.stringify(err));
      props.loading(false);
    },
  );
};

export const getUserInformation = async props => {
  props.loading(true);
  const Token = await AsyncStorage.getItem('Token');
  if (Token !== null && Token !== undefined && Token !== '') {
    request(
      'POST',
      'UserInformation',
      { Email: Token },
      () => { },
      () => { },
      response => {
        // console.log(JSON.stringify(response), 'ss')
        // console.log(JSON.stringify(props))
        if (response.Result == 'Success') {
          props.callback(response.Answer);
        }
        props.loading(false);
      },
      err => {
        props.callback({
          Name: 'User Name',
          Familly: '',
          Company: '',
          Address: '',
          Phone: '',
          Mobile: '',
          RegisterId: '',
        });
        console.log(JSON.stringify(err));
        props.loading(false);
      },
    );
  } else {
    props.loading(false);
    props.callback({
      Name: 'User Name',
      Familly: '',
      Company: '',
      Address: '',
      Phone: '',
      Mobile: '',
      RegisterId: '',
    });
  }
};

export const request = async (
  method,
  url,
  data,
  startCB,
  successCA,
  successCB,
  errorCB,
) => {
  try {
    startCB && startCB();

    const response = await fetch(BASE_URL + url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Server error');
    }

    const result = await response.json();

    successCA && successCA(response);
    successCB && successCB(result);
    return result;
  } catch (err) {
    errorCB && errorCB(err);
  }
};
export const requestV2 = async (
  method,
  url,
  data,
  startCB,
  successCA,
  successCB,
  errorCB,
) => {
  try {
    startCB && startCB();

    const response = await fetch(BASE_URL_V2 + url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Server error');
    }

    const result = await response.json();

    successCA && successCA(response);
    successCB && successCB(result);
    return result;
  } catch (err) {
    errorCB && errorCB(err);
  }
};
export const requestLogin = async (
  method,
  data,
  startCB,
  successCA,
  successCB,
  errorCB,
) => {
  startCB && startCB();
  fetch(BASE_URL_Login, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
    .then(response => {
      // console.log(JSON.stringify(response))
      if (response.status !== 200) {
        // alert('سرور از دسترس خارج است')
      } else {
        successCA && successCA(response);
        return response.json();
      }
    })
    .then(result => {
      // console.log(JSON.stringify(result))
      successCB && successCB(result);
    })
    .catch(err => {
      // console.log(JSON.stringify(err))
      errorCB && errorCB(err);
    });
};

export const requestGET = async (
  url,
  startCB,
  successCA,
  successCB,
  errorCB,
) => {
  startCB && startCB();
  fetch(BASE_URL + url, {
    method: 'GET',
    // body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
    .then(response => {
      // console.log(JSON.stringify(response))
      if (response.status !== 200) {
        // alert('سرور از دسترس خارج است')
      } else {
        successCA && successCA(response);
        return response.json();
      }
    })
    .then(result => {
      // console.log(JSON.stringify(result))
      successCB && successCB(result);
    })
    .catch(err => {
      // console.log(JSON.stringify(err))
      errorCB && errorCB(err);
    });
};

export const converttimes = times => {
  var dateTime = new Date(times).toLocaleDateString('fa-IR');
  return dateTime;
};

export const openCameras = props => {
  ImagePicker.openCamera({
    width: 417,
    height: 417,
    cropping: true,
    includeBase64: true,
    // cropperCircleOverlay: true,
  }).then(image => {
    // console.log(image);
    props.setImagePath(image.path);
    props.setImage(image.data);
  });
};

export const openEmagefolder = props => {
  ImagePicker.openPicker({
    width: 417,
    height: 417,
    cropping: true,
    includeBase64: true,
    // cropperCircleOverlay: true,
  }).then(image => {
    props.setMyImage(image.path);
    // console.log(image);
  });
};
// dateTime.toISOString().substring(0, 10).replaceAll('-', '/');
export function formatDate(dateString) {
  // Create a Date object from the input string
  const date = new Date(dateString);

  // Define arrays for month names
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Get the day, month, and year from the Date object
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Format the date as "Month Day, Year"
  return `${monthNames[monthIndex]} ${day.toString().padStart(2, '0')}, ${year}`;
}
export const formatDateDayMonth = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate(); // گرفتن روز از تاریخ
  const month = date.toLocaleString('default', { month: 'short' }).toUpperCase(); // گرفتن نام کوتاه ماه

  return { day, month };
};


// new design

export function isStringAndNotEmpty(value) {
  return typeof value === 'string' && value.length > 0;
}
export const removeAllStorage = async () => {
  const rem = [
    'Token',
    'Type',
    'eventId',
    'Splash',
    'SplshText',
    'SplashAdsLink',
    'SplashAds',
  ];
  await AsyncStorage.multiRemove(rem);
  return true
}
export const CheckUpdate = (res) => {
  var pkg = require('./../../../../package.json');

  let currentVer = parseFloat(pkg.version);
  let lastVer = parseFloat(res.Answer.Version);
  let needUpdate = false;
  if (currentVer < lastVer) {
    needUpdate = true;
  }
  return needUpdate
}
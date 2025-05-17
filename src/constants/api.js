import { AppName, OrganizationId, request, requestV2 } from "../components/shared/services";

export const LoginAdminTrack = async (EventId, Email, Password, Qrcode = null) => {
  try {
    const response = await request(
      'POST',
      'LoginAdminTrack',
      {
        'Code': EventId,
        'Email': Email,
        'Password': Password,
        'Qrcode': Qrcode
      },
      () => { },
      (response) => {
        console.log('Success Callback:', response)
      },
      async (result) => {
        // console.log('Result:', result)
      },
      (err) => {
        // console.error('Error Callback:', err)
      }
    );
    if (response && response.Result === 'Success') {
      // console.log(response);

      return response;
    } else {
      console.error('Request returned no result: api Screen', response);
      return response;
    }
  } catch (err) {
    console.error('Request failed with error: api Screen', err);
    return null;
  }
};
//speakerList
export const SendTicket = async (EventId, UserId, Email, HallName, Text) => {
  try {
    const response = await request(
      'POST',
      'SendTicket',
      {
        'HallName': HallName,
        'UserEmail': Email,
        'UserId': UserId,
        'EventId': EventId,
        'Message': Text
      },
      () => { },
      (response) => {
        // console.log('Success Callback:', response)
      },
      async (result) => {
        // console.log('Result:', result)
      },
      (err) => {
        // console.error('Error Callback:', err)
      }
    );
    if (response && response.Result === 'Success') {
      // console.log(response);

      return response;
    } else {
      console.error('Request returned no result: api Screen', response);
      return null;
    }
  } catch (err) {
    console.error('Request failed with error: api Screen', err);
    return null;
  }
};
export const GetFireBaseUserToken = async (tokenF, Email, EventId, Allow = true) => {
  try {
    const response = await request(
      'POST',
      'GetFireBaseUserToken',
      {
        'FireBaseToken': tokenF,
        'Email': Email,
        'EventId': EventId,
        'Allow': Allow,
      },
      () => { },
      (response) => {
        // console.log('Success Callback:', response)
      },
      async (result) => {
        // console.log('Result:', result)
      },
      (err) => {
        // console.error('Error Callback:', err)
      }
    );
    if (response && response.Result === 'Success') {
      // console.log(response);

      return response;
    } else {
      console.error('Request returned no result: api Screen', response);
      return null;
    }
  } catch (err) {
    console.error('Request failed with error: api Screen', err);
    return null;
  }
};
// api v2
export const AccessOrDeniedEvent = async (RegID, EventId, HallName) => {
  try {
    const response = await request(
      'POST',
      'AccessOrDeniedEvent',
      {
        'RegID': RegID,
        'EventId': EventId,
        'HallName': HallName,
      },
      () => { },
      (response) => {
        // console.log('Success Callback:', response)
      },
      async (result) => {
        // console.log('Result:', result)
      },
      (err) => {
        // console.error('Error Callback:', err)
      }
    );
    return response;
    // if (response && response.Result === 'Success') {
    //   // console.log(response);

    //   return response;
    // } else {
    //   // console.error('Request returned no result: api Screen AccessOrDeniedEvent1', response);
    //   return response;
    // }
  } catch (err) {
    console.error('Request failed with error: api Screen AccessOrDeniedEvent2', err);
    return null;
  }
}
export const DownloadEBadge = async (EventId , RegId) => {
  try {
    const response = await requestV2(
      'POST',
      'DownloadEBadge',
      {
        'EventId': EventId,
        'RegId': RegId,
      },
      () => { },
      (response) => {
        // console.log('Success Callback:', response)
      },
      async (result) => {
        // console.log('Result:', result)
      },
      (err) => {
        // console.error('Error Callback:', err)
      }
    );
    return response;
    // if (response && response.Result === 'Success') {
    //   // console.log(response);

    //   return response;
    // } else {
    //   // console.error('Request returned no result: api Screen AccessOrDeniedEvent1', response);
    //   return response;
    // }
  } catch (err) {
    console.error('Request failed with error: api Screen DownloadEBadge', err);
    return null;
  }
}
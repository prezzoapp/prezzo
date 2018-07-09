// @flow
import {GraphRequest, GraphRequestManager} from 'react-native-fbsdk';

export const getUserInfo = () => new Promise((resolve, reject) => {
  //Create response callback.
  const responseInfoCallback = (error: ?Object, result: ?Object) => {
    // console.log('got result', JSON.stringify(result));
    if (error) {
      return reject(error);
    } else {
      const {picture} = result;
      const avatarURL = picture && picture.data && picture.data.url
        ? picture.data.url
        : `http://graph.facebook.com/${result.id}/picture?type=large`;

      return resolve({
        id: result.id,
        email: result.email,
        firstName: result.first_name,
        lastName: result.last_name,
        avatarURL
      });
    }
  };

  // Create a graph request asking for user information with a callback to handle the response.
  const infoRequest = new GraphRequest(
    '/me',
    {
      parameters: {
        fields: {
          string: 'email,name,first_name,middle_name,last_name,picture.type(large)'
        }
      }
    },
    responseInfoCallback,
  );
  // Start the graph request.
  new GraphRequestManager().addRequest(infoRequest).start();
});

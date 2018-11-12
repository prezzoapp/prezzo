// // @flow
// import {GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
//
// export const getUserInfo = () => new Promise((resolve, reject) => {
//   //Create response callback.
//   const responseInfoCallback = (error: ?Object, result: ?Object) => {
//     console.log('got result', JSON.stringify(result));
//     if (error) {
//       return reject(error);
//     } else {
//       const {picture} = result;
//       const avatarURL = picture && picture.data && picture.data.url
//         ? picture.data.url
//         : `http://graph.facebook.com/${result.id}/picture?type=large`;
//
//       return resolve({
//         id: result.id,
//         email: result.email,
//         firstName: result.first_name,
//         lastName: result.last_name,
//         avatarURL
//       });
//     }
//   };
//
//   // Create a graph request asking for user information with a callback to handle the response.
//   const infoRequest = new GraphRequest(
//     '/me',
//     {
//       parameters: {
//         fields: {
//           string: 'email,name,first_name,middle_name,last_name,picture.type(large)'
//         }
//       }
//     },
//     responseInfoCallback,
//   );
//   // Start the graph request.
//   new GraphRequestManager().addRequest(infoRequest).start();
// });

export const getUserInfo = async token => {
  const response = await fetch(
    `https://graph.facebook.com/me?access_token=${token}&fields=id,email,name,birthday,picture.type(large)`
  );

  const userData = await response.json();
  console.log('FB DAta: ', userData);
  const fbResponse = {
    email: userData.email ? userData.email : '',
    firstName: userData.name.split(' ')[0],
    lastName:
      userData.name.split(' ').length > 1 ? userData.name.split(' ')[1] : '',
    avatarURL: userData.picture.data.url
  };
  return fbResponse;
};

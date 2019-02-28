// @flow
import { UPLOAD_REQUEST, UPLOAD_SUCCESS, UPLOAD_FAILURE } from './types';
import {post} from '../../utils/api';

export const uploadImage = async(
  uri: string,
  size: number,
  mime: 'image/jpeg',
  name: string | null,
  type: 'userAvatar',
  acl: 'public-read' | 'private'
) => async(dispatch: ReduxDispatch) => {
  dispatch({
    type: UPLOAD_REQUEST
  });

  // first notify the server that we want to upload an asset
  // the server will create an object in the database
  // and return an upload url for S3
  try {
    const config = await post(
      `/v1/resources?acl=${acl || encodeURIComponent('public-read')}&addPolicy=true`, {
        mime,
      // name,
        size,
        type
      });
    const file = config.files[0];
    const {uploadUrl, policy = {}} = file.meta;
    const fileUrl = file.url;
    const fileName = config.name || file.name || name;

    // upload the asset to s3
    const form = new FormData();

    for (let key in policy) {
      if (policy.hasOwnProperty(key)) {
        form.append(key, policy[key]);
      }
    }

    form.append('file', {
      uri: uri,
      type: mime,
      name: fileName
    });

    await fetch(uploadUrl, {
      method: 'post',
      body: form,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    });

    dispatch({type: UPLOAD_SUCCESS});

    return fileUrl.replace('http://', 'https://');
  } catch(e) {
    dispatch({type: UPLOAD_FAILURE});
    throw e;
  }
};

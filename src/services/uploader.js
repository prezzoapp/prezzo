// @flow
import {post} from '../utils/api';

export default async(
  uri: string,
  size: number,
  mime: 'image/jpeg',
  name: string | null,
  type: 'userAvatar',
  acl: 'public-read' | 'private'
) => {
  // first notify the server that we want to upload an asset
  // the server will create an object in the database
  // and return an upload url for S3
  const config = await post(`/v1/resources?acl=${acl || 'public-read'}&addPolicy=true`, {
    mime,
    name,
    size,
    type
  });
  const file = config.files[0];
  const {uploadUrl, policy = {}} = file.meta;
  const fileUrl = file.url;
  const fileName = config.name || file.name || name;

  // upload the asset to s3
  const data = new FormData();
  // data.append('name', fileName);

  for (let key in policy) {
    if (policy.hasOwnProperty(key)) {
      data.append(key, policy[key]);
    }
  }

  data.append('file', {
    uri: uri,
    type: mime,
    name: fileName
  });

  const uploadResult = await fetch(uploadUrl, {
    method: 'put',
    body: data,
    headers: {
      // 'Content-Length': size,
      'Content-Type': mime
    }
  });

  console.log('got upload result', uploadResult);
  console.log('got file url', fileUrl);

  return fileUrl;
};

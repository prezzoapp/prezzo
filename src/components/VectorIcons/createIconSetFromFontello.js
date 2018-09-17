import createIconSetFromFontello from '@expo/vector-icons/vendor/react-native-vector-icons/lib/create-icon-set-from-fontello';

export default function(config, expoFontName, expoAssetId) {
  return createIconSetFromFontello(config, expoFontName, expoAssetId);
}

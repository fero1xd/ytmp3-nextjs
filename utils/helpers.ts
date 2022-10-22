const regExp =
  /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

export const getVideoId = (text: string) => {
  const match = text.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return null;
  }
};

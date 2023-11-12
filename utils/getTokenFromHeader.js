export const getTokenFromHeader = (req) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  if (token === undefined) {
    console.log("No token Found in headers");
    return false;
  } else {
    return token;
  }
};

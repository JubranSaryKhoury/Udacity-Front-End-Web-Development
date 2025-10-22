function isValidUrl(url) {
  const pattern =
    /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}([\/\w .-]*)*\/?$/;

  return pattern.test(url) || /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(url);
}

module.exports = { isValidUrl };

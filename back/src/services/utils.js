class utils {
  // new Date() => yyyymmdd
  static makeDateToString(d) {
    new Date();
    const stringDate = `${d.getFullYear()}${('0' + (d.getMonth() + 1)).slice(
      -2
    )}${('0' + d.getDate()).slice(-2)}`;
    return stringDate;
  }
}
export { utils };

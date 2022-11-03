/// Regular Expression for Username
/// Matches:
/// 1) First and Last characters must be alphanumeric
/// 2) May have hyphen or underscore in the middle
export const USERNAME_PATTERN = /^(?=.*[A-Za-z])[A-Za-z\d_-]*/
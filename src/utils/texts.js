export function emailToName(email) {
  return email &&
    email
      .substring(0, email.indexOf("@"))
      .replace(/.\./g, ' ')
      .replace(/(^| )(\w)/g, x => x.toUpperCase());
}

export function nameToInitial(name) {
  return name.split(' ').reduce((accumulator, currentValue) => `${accumulator}${currentValue[0].toUpperCase()}`, '')
}

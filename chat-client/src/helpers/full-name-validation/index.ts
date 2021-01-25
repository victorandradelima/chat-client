const fullNameValidation = (name: string): boolean => {
  var firstName = name.split(' ').slice(0, -1).join(' ')
  var restName = name.split(' ').slice(-1).join(' ')
  if (firstName.length > 1 && restName.length > 1) {
    return true
  } else {
    return false
  }
}

export default fullNameValidation

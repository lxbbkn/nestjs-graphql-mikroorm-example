const isNull = (value: any): boolean => {
  return [null, undefined].includes(value)
}

export { isNull }

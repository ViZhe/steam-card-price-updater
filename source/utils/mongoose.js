
export const hideProps = (doc, ret, options) => {
  const newRet = ret
  const hiddenProps = options.hide || ['_id']
  if (hiddenProps) {
    hiddenProps.forEach((prop) => {
      delete newRet[prop]
    })
  }
  return newRet
}

export const test = () => {}

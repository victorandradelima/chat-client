const hourConvert = (time: number): string => {
  const t = new Date(time)
  return `${t.getHours()}:${t.getMinutes()}`
}

export default hourConvert

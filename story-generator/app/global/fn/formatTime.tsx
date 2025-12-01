export const formatTime = (seconds: number) => {
  if (seconds < 60) {
    return `${seconds} detik`
  } else {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes} menit${
      remainingSeconds > 0 ? ` ${remainingSeconds} detik` : ""
    }`
  }
}

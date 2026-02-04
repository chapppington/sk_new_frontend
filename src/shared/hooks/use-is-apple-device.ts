import { useEffect, useState } from "react"

const useIsAppleDevice = (): boolean => {
  const [isAppleDevice, setIsAppleDevice] = useState(false)

  useEffect(() => {
    const checkAppleDevice = () => {
      if (typeof window === "undefined") return false

      const userAgent = window.navigator.userAgent.toLowerCase()
      const platform = window.navigator.platform?.toLowerCase() || ""

      // Check for iOS devices (iPhone, iPad, iPod)
      const isIOS =
        /iphone|ipad|ipod/.test(userAgent) ||
        (platform === "macintel" && "ontouchend" in document)

      // Check for macOS
      const isMacOS =
        /macintosh|mac os x/.test(userAgent) || platform.includes("mac")

      return isIOS || isMacOS
    }

    setIsAppleDevice(checkAppleDevice())
  }, [])

  return isAppleDevice
}

export default useIsAppleDevice

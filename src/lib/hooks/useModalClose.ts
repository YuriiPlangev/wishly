import { useEffect } from "react"
export function useDialogClose(
    setOpen: (open: boolean) => void,
    dialogClass = ".dialog-content"
  ) {
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false)
        }
      }
  
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if (!target.closest(dialogClass)) {
          setOpen(false)
        }
      }
  
      document.addEventListener("keydown", handleKeyDown)
      document.addEventListener("mousedown", handleClickOutside)
  
      return () => {
        document.removeEventListener("keydown", handleKeyDown)
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [setOpen, dialogClass])
  }
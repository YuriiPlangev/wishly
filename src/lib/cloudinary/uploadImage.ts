
import { toast } from "sonner"
export const uploadImage = async (file: File, folder: string): Promise<string | null> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "ml_default")
    formData.append("folder", folder)
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dptycdwv5/image/upload", { 
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      return data.secure_url
    } catch (error) {
      console.error("Ошибка при загрузке изображения:", error)
      toast("Image upload failed")
      return null
    }
  }
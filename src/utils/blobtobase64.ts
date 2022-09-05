export const blobToBase64: (
  file: File
) => Promise<string | ArrayBuffer | null> = async (file: File) =>
  await new Promise<string | null | ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

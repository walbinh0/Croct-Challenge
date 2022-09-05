import { ChangeEvent } from 'react'
import { blobToBase64 } from './blobtobase64'

export const imageVerificator: (
  event: ChangeEvent<HTMLInputElement>
) => Promise<string | false | undefined> = async (
  event: ChangeEvent<HTMLInputElement>
) => {
  if (event.target.files?.[0]) {
    const type = event.target.files[0].type
    if (type !== 'image/jpg' && type !== 'image/png' && type !== 'image/jpeg') {
      return false
    }
    const imageBase64 = await blobToBase64(event.target.files[0])
    if (typeof imageBase64 === 'string') {
      return imageBase64
    }
  }
}

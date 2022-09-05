import { ChangeEvent, useCallback } from 'react'
import { imageVerificator } from '../../../utils/imageVerificator'
import { Container } from './Container'
import { InputPlaceholder } from './InputPlaceholder'

interface IUploadPhase {
  setStep: React.Dispatch<React.SetStateAction<number>>
  setImage: React.Dispatch<React.SetStateAction<string>>
}

export const UploadPhase: (data: IUploadPhase) => JSX.Element = ({
  setStep,
  setImage
}: IUploadPhase) => {
  const changePhoto = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const image = await imageVerificator(event)
      if (!image) {
        return setStep(3)
      }
      setImage(image)
      setStep(1)
    },
    [setImage, setStep]
  )
  return (
    <Container isUpload>
      <InputPlaceholder />
      <input
        type="file"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          opacity: 0
        }}
        onChange={changePhoto}
        accept=".png,.jpg,.jpeg"
        data-testid="inputUpload"
      />
    </Container>
  )
}

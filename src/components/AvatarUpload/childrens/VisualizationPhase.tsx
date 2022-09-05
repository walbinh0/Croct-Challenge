import React, { ChangeEvent, useCallback } from 'react'
import { useImageData } from '../../../context/imageData'
import { imageVerificator } from '../../../utils/imageVerificator'
import { Avatar } from './Avatar'
import { Container } from './Container'
import { InputPlaceholder } from './InputPlaceholder'

interface IVisualizationPhase {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export const VisualizationPhase: (data: IVisualizationPhase) => JSX.Element = ({
  setStep
}: IVisualizationPhase) => {
  const { setImageData } = useImageData()

  const changePhoto = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const image = await imageVerificator(event)
      if (!image) {
        setStep(3)
        return
      }
      setImageData({ width: '120px', path: image })
      setStep(1)
    },
    [setStep, setImageData]
  )

  return (
    <Container isUpload>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}
      >
        <Avatar />
        <InputPlaceholder />
        <input
          type="file"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            opacity: 0
          }}
          accept=".png,.jpg,.jpeg"
          onChange={changePhoto}
          data-testid="inputUploadVisualization"
        />
      </div>
    </Container>
  )
}

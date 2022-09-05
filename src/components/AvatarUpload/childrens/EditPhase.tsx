import { Container } from './Container'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useCallback, useState } from 'react'
import { CloseButton } from '../../Icons/CloseButton'
import { useImageData } from '../../../context/imageData'
import { Avatar } from './Avatar'

interface IEditPhase {
  image: string
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export const EditPhase: (data: IEditPhase) => JSX.Element = ({
  image,
  setStep
}: IEditPhase) => {
  const [value, setValue] = useState(120)
  const { imageData, setImageData } = useImageData()

  const saveImage = useCallback(() => {
    setImageData({ width: `${value}px`, path: imageData.path || image })
    setStep(2)
  }, [image, setImageData, value, setStep, imageData])

  const close = useCallback(() => {
    setStep(0)
    setImageData({ path: '', width: '' })
  }, [setStep])

  return (
    <Container>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}
      >
        <Avatar width={`${value}px`} path={image} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            width: '40%'
          }}
        >
          <span>Crop</span>
          <Slider
            min={0}
            max={240}
            defaultValue={120}
            trackStyle={{ backgroundColor: '#3F80FF' }}
            railStyle={{ backgroundColor: '#B9D1FF' }}
            handleStyle={{
              backgroundColor: '#3F80FF',
              opacity: 100,
              borderColor: '#3F80FF'
            }}
            onChange={rangeValue => {
              // if is here because for some reason it can return a number[]
              if (typeof rangeValue === 'number') setValue(rangeValue)
            }}
          />
          <div style={{ width: '102px', alignSelf: 'end' }}>
            <button
              style={{
                color: 'white',
                background: '#3D485F',
                borderRadius: '16px',
                border: 'none',
                padding: '5px 35px'
              }}
              onClick={saveImage}
            >
              Save
            </button>
          </div>
        </div>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            alignSelf: 'start'
          }}
          onClick={close}
        >
          <CloseButton />
        </button>
      </div>
    </Container>
  )
}

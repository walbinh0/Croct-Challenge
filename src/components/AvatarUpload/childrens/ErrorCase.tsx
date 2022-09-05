import { useEffect } from 'react'
import { useImageData } from '../../../context/imageData'
import { CloseButton } from '../../Icons/CloseButton'
import { Container } from './Container'
import { Warning } from './Warning'

interface IErrorCase {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export const ErrorCase: (data: IErrorCase) => JSX.Element = ({
  setStep
}: IErrorCase) => {
  const { setImageData } = useImageData()
  useEffect(() => {
    setImageData({
      width: '',
      path: ''
    })
  }, [setImageData])
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
        <div
          style={{
            width: '120px',
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '100%',
            background: '#C3CBD5'
          }}
        >
          <Warning />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'start',
            flexDirection: 'column',
            gap: '5px'
          }}
        >
          <span style={{ color: '#C64D32' }}>Sorry, the upload failed.</span>
          <button
            style={{
              background: 'transparent',
              border: 'none',
              textDecoration: 'underline',
              fontWeight: 500
            }}
            onClick={() => setStep(0)}
          >
            Try again
          </button>
        </div>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            alignSelf: 'start'
          }}
          onClick={() => setStep(0)}
        >
          <CloseButton />
        </button>
      </div>
    </Container>
  )
}

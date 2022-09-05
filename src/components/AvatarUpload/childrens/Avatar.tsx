import { useImageData } from '../../../context/imageData'

interface IAvatar {
  width?: string
  path?: string
}

export const Avatar: (data: IAvatar) => JSX.Element = ({
  width,
  path
}: IAvatar) => {
  const { imageData } = useImageData()

  return (
    <div
      style={{
        position: 'relative',
        width: '120px',
        height: '120px',
        overflow: 'hidden',
        borderRadius: '100%',
        background: 'white'
      }}
    >
      <img
        src={imageData?.path || path}
        style={{
          position: 'absolute',
          width: `${width ?? imageData?.width}`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)'
        }}
        alt="your uploaded file"
        data-testid="avatar"
      />
    </div>
  )
}

import { DefaultImage } from '../../Icons/DefaultImage'

export const InputPlaceholder: () => JSX.Element = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column'
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px'
      }}
    >
      <DefaultImage />
      <span style={{ fontWeight: 500, color: '#495567' }}>
        Organization Logo
      </span>
    </div>
    <span>Drop the image here or click to browse</span>
  </div>
)

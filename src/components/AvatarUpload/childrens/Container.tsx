import { ReactNode } from 'react'

interface IContainer {
  children: ReactNode
  isUpload?: boolean
}

export const Container: (data: IContainer) => JSX.Element = ({
  children,
  isUpload
}: IContainer) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '10px',
          width: '550px',
          height: '180px',
          background: '#F2F5F8',
          border: isUpload ? '2px dashed #C7CDD3' : undefined,
          borderRadius: '8px',
          position: 'relative'
        }}
      >
        {children}
      </div>
    </div>
  )
}

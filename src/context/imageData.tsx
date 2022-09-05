import React, { createContext, useState, useContext, Dispatch } from 'react'

interface IImageData {
  width: string
  path: string
}

interface States {
  imageData: IImageData
  setImageData: Dispatch<React.SetStateAction<IImageData>>
}

interface ContextProps {
  children: React.ReactNode
}

const imageDataContext = createContext<States>({
  imageData: {
    width: '',
    path: ''
  },
  setImageData: () => {}
})

export function ImageDataProvider({ children }: ContextProps): JSX.Element {
  const [imageData, setImageData] = useState({
    width: '',
    path: ''
  })
  return (
    <imageDataContext.Provider value={{ imageData, setImageData }}>
      {children}
    </imageDataContext.Provider>
  )
}

export function useImageData(): {
  imageData: IImageData
  setImageData: React.Dispatch<React.SetStateAction<IImageData>>
} {
  const context = useContext(imageDataContext)
  const { imageData, setImageData } = context
  return { imageData, setImageData }
}

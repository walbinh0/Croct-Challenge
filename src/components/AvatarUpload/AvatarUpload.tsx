import { useState } from 'react'
import { EditPhase } from './childrens/EditPhase'
import { ErrorCase } from './childrens/ErrorCase'
import { UploadPhase } from './childrens/UploadPhase'
import { VisualizationPhase } from './childrens/VisualizationPhase'

export const AvatarUpload: () => JSX.Element = () => {
  const [step, setStep] = useState(0)
  const [image, setImage] = useState('')

  const stepNode = [
    <UploadPhase setStep={setStep} setImage={setImage} />,
    <EditPhase setStep={setStep} image={image} />,
    <VisualizationPhase setStep={setStep} />,
    <ErrorCase setStep={setStep} />
  ]

  return stepNode[step]
}

import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { AvatarUpload } from './AvatarUpload'
import userEvent from '@testing-library/user-event'
import { blobToBase64 } from '../../utils/blobtobase64'
import { ImageDataProvider } from '../../context/imageData'

const file = new File(['hello'], 'hello.png', { type: 'image/png' })
const newFile = new File(['bye'], 'hello.jpg', { type: 'image/jpg' })
const errorFile = new File(['bye'], 'hello.webp', { type: 'image/webp' })

describe('<AvatarUpload/> test', () => {
  it('should render first phase with input and the correct placeholder', () => {
    render(<AvatarUpload />)
    const input = screen.getByTestId('inputUpload')
    const firstText = screen.getByText('Organization Logo')
    const secondText = screen.getByText(
      'Drop the image here or click to browse'
    )
    const defaultImage = screen.getByTestId('defaultImage')

    expect(input).toBeInTheDocument()
    expect(firstText).toBeInTheDocument()
    expect(secondText).toBeInTheDocument()
    expect(defaultImage).toBeInTheDocument()
  })
  it('should upload an image', async () => {
    render(<AvatarUpload />)
    const input: HTMLInputElement = screen.getByTestId('inputUpload')
    await userEvent.upload(input, file)

    expect(input?.files?.[0]).toBe(file)
    expect(input?.files?.item(0)).toBe(file)
    expect(input.files).toHaveLength(1)
  })

  it('should render upload phase with all elements', async () => {
    const { container } = render(<AvatarUpload />)
    const input: HTMLInputElement = screen.getByTestId('inputUpload')

    await userEvent.upload(input, file)

    await waitFor(() => {
      const image = screen.getByTestId('avatar')
      const cropText = screen.getByText('Crop')
      const slider = container.querySelector('.rc-slider')
      const saveButton = screen.getByText('Save')
      const closeButton = screen.getByTestId('closeButton')

      expect(image).toBeInTheDocument()
      expect(cropText).toBeInTheDocument()
      expect(slider).toBeInTheDocument()
      expect(saveButton).toBeInTheDocument()
      expect(closeButton).toBeInTheDocument()
    })
  })

  it('should render correct avatar', async () => {
    render(<AvatarUpload />)
    const input: HTMLInputElement = screen.getByTestId('inputUpload')

    await userEvent.upload(input, file)

    await waitFor(async () => {
      const image = screen.getByTestId('avatar')
      const imageBase64 = await blobToBase64(file)
      expect(image).toHaveAttribute('src', imageBase64)
    })
  })
  it('should crop avatar', async () => {
    const { container } = render(<AvatarUpload />)
    const input: HTMLInputElement = screen.getByTestId('inputUpload')

    await userEvent.upload(input, file)

    await waitFor(async () => {
      const image = screen.getByTestId('avatar')
      const slider = container.querySelector('.rc-slider')
      if (slider) {
        fireEvent.mouseDown(slider, {
          clientX: 20
        })
        expect(image).toHaveStyle('width: 240px')
      }
    })
  })
  it('should cancel crop', async () => {
    render(
      <ImageDataProvider>
        <AvatarUpload />
      </ImageDataProvider>
    )
    const input: HTMLInputElement = screen.getByTestId('inputUpload')

    await userEvent.upload(input, file)

    await waitFor(async () => {
      const closeButton = screen.getByTestId('closeButton')

      await userEvent.click(closeButton)
      const input = screen.getByTestId('inputUpload')
      const firstText = screen.getByText('Organization Logo')
      const secondText = screen.getByText(
        'Drop the image here or click to browse'
      )
      expect(input).toBeInTheDocument()
      expect(firstText).toBeInTheDocument()
      expect(secondText).toBeInTheDocument()
    })
  })

  it('should save crop', async () => {
    const { container } = render(
      <ImageDataProvider>
        <AvatarUpload />
      </ImageDataProvider>
    )
    const input: HTMLInputElement = screen.getByTestId('inputUpload')

    await userEvent.upload(input, file)

    await waitFor(async () => {
      const slider = container.querySelector('.rc-slider')
      if (slider) {
        fireEvent.mouseDown(slider, {
          clientX: 20
        })
        const saveButton = screen.getByText('Save')
        await userEvent.click(saveButton)
        const image = screen.getByTestId('avatar')
        expect(image).toHaveStyle('width: 240px')
      }
    })
  })

  it('should render visualization phase with all elements', async () => {
    render(
      <ImageDataProvider>
        <AvatarUpload />
      </ImageDataProvider>
    )
    const input: HTMLInputElement = screen.getByTestId('inputUpload')

    await userEvent.upload(input, file)

    await waitFor(async () => {
      const saveButton = screen.getByText('Save')
      await userEvent.click(saveButton)
      const image = screen.getByTestId('avatar')
      const input = screen.getByTestId('inputUploadVisualization')
      const firstText = screen.getByText('Organization Logo')
      const secondText = screen.getByText(
        'Drop the image here or click to browse'
      )
      const defaultImage = screen.getByTestId('defaultImage')

      expect(image).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(firstText).toBeInTheDocument()
      expect(secondText).toBeInTheDocument()
      expect(defaultImage).toBeInTheDocument()
    })
  })
  it('should upload a new image', async () => {
    render(
      <ImageDataProvider>
        <AvatarUpload />
      </ImageDataProvider>
    )
    const input: HTMLInputElement = screen.getByTestId('inputUpload')

    await userEvent.upload(input, file)

    await waitFor(async () => {
      const saveButton = screen.getByText('Save')
      await userEvent.click(saveButton)
      const input = screen.getByTestId('inputUploadVisualization')

      await userEvent.upload(input, newFile)

      await waitFor(async () => {
        const image = screen.getByTestId('avatar')
        const imageBase64 = await blobToBase64(newFile)
        expect(image).toHaveAttribute('src', imageBase64)
      })
    })
  })
  it('should render error case with all elemnts', async () => {
    render(<AvatarUpload />)

    const input: HTMLInputElement = screen.getByTestId('inputUpload')
    await userEvent.upload(input, errorFile)

    expect(input?.files?.[0]).toBe(undefined)
    expect(input?.files?.item(0)).toBe(null)
    expect(input.files).toHaveLength(0)

    // we can drag a wrong file on the client side but on jest we can't
  })
})

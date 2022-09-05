<p align="center">
    <a href="https://croct.com">
      <img src="https://cdn.croct.io/brand/logo/repo-icon-green.svg" alt="Croct" height="80"/>
    </a>
    <br />
    <strong>Avatar Uploader</strong>
    <br />
    A React component to upload and crop avatars.
</p>

# Challenge

As a frontend developer, your task is to create a React component using Typescript to let users upload and crop avatars.

<br/>

<p align="center">
    <img src="https://user-images.githubusercontent.com/943036/132790508-1d0b64be-9fc8-4cfc-8e12-a3066d373008.png" alt="Croct" width="500"/>
</p>

## Requirements

The `<AvatarUpload />` component should allow users to upload images to make it easier for them to recognize key interface elements related to an organization.

- It should allow uploading an image by dragging it into the dashed area or clicking on it.
- Throughout the entire process, the user can click on the "X" icon to cancel and return to the initial state
- After uploading, the user can adjust the image to better fit the circular format. Using a slider, the user can zoom in and out on the image cut out by the circular mask to preview the final result.
- Clicking on save, the component should display the cropped logo and a button to restart the process. It must also provide some way for parent components to access the resulting image's raw data.

**Installation of dependencies**

```
yarn
```

To run in development mode

```
yarn dev
```

To view stories in **StoryBook**:

```
yarn storybook
```

To run **all automated tests**:

```
yarn test
```

---

### Host

To see the application running in production, just [click here](https://croct-challenge-walbinh0.vercel.app/).

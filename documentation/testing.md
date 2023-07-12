---
title: Testing on local devices
---

## Testing on local devices

When using our templates, Needle Engine runs a local development server for you. Simply press play, and a website will open in your default browser, ready for testing on your local device. For testing on other devices in the same network, you may have to install a self-signed certificate (see below).

When using a custom setup / framework, please refer to your framework's documentation on how to run a secure local development server.  

::: tip
Our local server uses the IP address in your local network (e.g. `https://192.168.0.123:3000`) instead of `localhost:3000`.  This allows you to quickly view and test your project from mobile devices, VR glasses, and other machines in the same network.   

We're using HTTPS instead of the older HTTP, because modern powerful web APIs like WebXR require a secure connection – the S stands for "secure".
:::

## Setting up a self-signed certificate for development

Different operating systems have different security requirements for local development. Typically, displaying a website will work even with a auto-generated untrusted certificate, but browsers may warn about the missing trust and some features are not available. Here's a summary:

::: tip
Installing trusted self-signed certificates on your development devices is recommended for a smooth development experience. Find the steps at the bottom of this page.
:::

**Default – with auto-generated untrusted certificate**  
_Displays a certificate warning upon opening the project in a browser._
_Uses the [vite-plugin-basic-ssl](https://github.com/vitejs/vite-plugin-basic-ssl) npm package._

We're using websocket connections to communicate between the browser and the local development server. Websockets require a secure connection (HTTPS) in order to work. Depending on the platform, you might need to set up a custom certificate for local development. Android and Windows don't need a custom certificate, but iOS and MacOS do.

| OS | Viewing in the browser<br/>(with a security warning) | Automatic reloads |
| --- | --- | --- |
| Windows | (✓) | ✓ |
| Linux | (✓) | ✓ |
| Android | (✓) | ✓ |
| macOS | (✓) | ❌ |
| iOS | (✓ after page reload) | ❌ |
| Xcode Simulators | (✓ after page reload) | ❌ |

**With a self-signed, trusted root certificate**  
_No security warning is displayed. You need to install the generated certificate on your device(s)._  
_Uses the [vite-plugin-mkcert](https://github.com/liuweiGL/vite-plugin-mkcert) npm package._


| OS | Viewing in the browser | Automatic reloads |
| --- | --- | --- |
| Windows | ✓ | ✓ |
| Linux | ✓ | ✓ |
| Android | ✓ | ✓ |
| macOS | ✓ | ✓ |
| iOS | ✓ | ✓ |

### Generating a self-signed development certificate

- in Unity/Blender, click on "Open Workspace" to open VS Code  

- check that you're using `vite-plugin-mkcert` instead of `vite-plugin-basic-ssl` (the latter doesn't generate a trusted root certificate, which we need) in your `vite.config.ts` file:
  - open `package.json`
  - remove the line with `"@vitejs/plugin-basic-ssl"` from `devDependencies`
  - open a Terminal in VS Code and run `npm install vite-plugin-mkcert --save-dev` which will add the latest version
  - open `vite.config.ts` and replace `import basicSsl from '@vitejs/plugin-basic-ssl'` with `import mkcert from'vite-plugin-mkcert'`
  - in `plugins: [`, replace `basicSsl(),` with `mkcert(),`
  - package.json looks like this now: 
  ![](/testing/switch-to-mkcert.webp)
- run `npm run start` once from VS Code's terminal
  - on Windows, this will open a new window and guide you through the creation and installation of the certificate
  - on MacOS, the terminal prompts for your password and then generates and installs the certificate.
  - if you're getting an error `Error: Port 3000 is already in use`, please close the server that may still be running from Unity.
- the generated certificate will automatically be installed on the machine you generated it on.
- you can stop the terminal process again.
- from now on, pressing Play in Unity/Blender will use the generated certificate for the local server, and no "security warning" will be shown anymore, since your browser now trusts the local connection.

On your development devices, you need to _install_ the generated certificate and allow the OS to _trust_ it. This is different for each OS. For each of them, you'll need the rootCA.pem file that was generated, and send it to the device you want to authenticate.

From Windows: find the certificate in `Users/<your-user>/.../rootCA.pem`
From MacOS: find the certificate in `Users/<your-user>/.vite-plugin-mkcert/rootCA.pem`

Send the device to yourself (e.g. via E-Mail, AirDrop, iCloud, via USB, ...) so that you can access it on your development devices(s).

## Installing the certificate on your development devices

### Installing the certificate on Android

1. Open the file. You'll be prompted to install the certificate.

### Installing the certificate on iOS / iPadOS / VisionOS
1. Open the file.
2. You'll be prompted to _add_ the profile to your device.
3. Go to Settings
4. There will be a new entry "Profile". Select it and allow the profile to be _active_ for this device.
5. On iOS / iPadOS, you also need to allow "Root Certificate Trust". For this, go to `Settings > General > About > Info > Certificate Trust Settings` and enable trust for the certificate.

::: tip
The certificate is automatically installed on the machine you generated it on. For other machines in the local network, follow the steps below to also establish a trusted connection.
:::

### Installing the certificate on another MacOS machine
1. Open the file. Keychain Access will open and allow you to install the certificate. 
2. You may have to set "Trust" to "Always allow".

### Installing the certificate on another Windows machine
1. Open `certmgr` ("Manage user certificates") by typing <kbd>Windows key</kbd> + `certmgr`.
2. In the left sidebar, select "Trusted Root Certification Authorities".
3. Right-click on "Certificates" and select "All Tasks > Import".
4. Select the `rootCA.pem` file (you may have to change the file type to "all") and follow the instructions.
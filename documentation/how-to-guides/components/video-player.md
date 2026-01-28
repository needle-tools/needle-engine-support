---
title: Play Videos in Your Scene
description: Play video files, streams, and live broadcasts in your 3D scenes with the VideoPlayer component. Works in Unity and Blender.
---

# Play Videos in Your Scene

Display videos on 3D surfaces, play livestreams, and create video-based experiences.

<video-embed src="/docs/videos/video-component.mp4" autoplay muted />

:::tip Works with Unity and Blender
The VideoPlayer component is available for both Unity and Blender integrations.
:::

## What You Can Do

- **Play Videos** - MP4, WebM, and other browser-supported formats
- **Livestreams** - Support for HLS (m3u8) streaming
- **Video Surfaces** - Project videos onto any 3D object
- **Playback Control** - Play, pause, loop, and control speed
- **Picture-in-Picture** - Native browser PiP support
- **Fullscreen Mode** - Display videos in screenspace overlay

Perfect for:
- Video walls and displays
- Product demonstrations
- Interactive presentations
- Live event streaming
- Video textures on objects

## Quick Start

### Basic Setup

**In Unity or Blender:**
1. Add a 3D object with a material (like a Plane or Cube)
2. Add the `VideoPlayer` component to the object
3. Set the **URL** to your video file
4. Enable **Play On Awake** if you want it to start automatically
5. Export and view in browser - the video plays on the surface!

### Video Formats

The VideoPlayer supports any format your browser can play:
- **MP4** (H.264) - Best compatibility
- **WebM** - Good for web, smaller file sizes
- **OGG** - Open format
- **HLS Streams** (m3u8) - For livestreaming

## Settings

| Setting | What it does |
| --- | --- |
| **Play On Awake** | Start playing automatically when the scene loads |
| **URL** | The video file URL or stream address |
| **Is Looping** | Repeat the video when it finishes |
| **Playback Speed** | Speed multiplier (1 = normal, 2 = double speed, 0.5 = half speed) |
| **Muted** | Start with audio muted |
| **Aspect Mode** | How to adjust object dimensions to match video aspect ratio |

## Examples

### Video Display Screen

Create a video screen in your scene:

1. Add a Plane object
2. Add `VideoPlayer` component
3. Set **URL** to your video file
4. Enable **Play On Awake** and **Is Looping**
5. The plane now shows your video

### Interactive Video Control

Let users start/stop videos with clicks:

```ts
import { Behaviour, VideoPlayer, serializable } from "@needle-tools/engine";

export class VideoControl extends Behaviour {

    @serializable(VideoPlayer)
    videoPlayer?: VideoPlayer;

    onPointerClick() {
        if (!this.videoPlayer) return;

        if (this.videoPlayer.isPlaying) {
            this.videoPlayer.pause();
        } else {
            this.videoPlayer.play();
        }
    }
}
```

### Livestream Display

Show a live video stream:

1. Add `VideoPlayer` component
2. Set **URL** to an m3u8 stream (e.g., `https://example.com/live/stream.m3u8`)
3. Enable **Play On Awake**
4. The stream plays automatically with HLS support

### Video Gallery

Create multiple video displays:

1. Create multiple objects with VideoPlayer components
2. Set different **URL** values for each
3. Disable **Play On Awake** on all of them
4. Use scripting to play videos when users approach or click

## Scripting

### Basic Controls

Control video playback from code:

```ts
import { Behaviour, VideoPlayer } from "@needle-tools/engine";

export class MyVideoController extends Behaviour {

    start() {
        const video = this.gameObject.getComponent(VideoPlayer);

        if (video) {
            // Play the video
            video.play();

            // Pause the video
            video.pause();

            // Stop the video (resets to beginning)
            video.stop();

            // Check if playing
            if (video.isPlaying) {
                console.log("Video is playing");
            }

            // Jump to specific time (in seconds)
            video.currentTime = 10;

            // Loop the video
            video.isLooping = true;

            // Change playback speed
            video.playbackSpeed = 1.5; // 1.5x speed

            // Mute/unmute
            video.muted = true;
        }
    }
}
```

### Change Video Source

Switch between different videos:

```ts
import { Behaviour, VideoPlayer } from "@needle-tools/engine";

export class VideoSwitcher extends Behaviour {

    @serializable(VideoPlayer)
    videoPlayer?: VideoPlayer;

    switchToVideo(url: string) {
        if (this.videoPlayer) {
            this.videoPlayer.setClipURL(url);
            this.videoPlayer.play();
        }
    }
}
```

### Picture-in-Picture

Request the browser's picture-in-picture mode:

```ts
import { Behaviour, VideoPlayer } from "@needle-tools/engine";

export class PiPController extends Behaviour {

    onPointerClick() {
        const video = this.gameObject.getComponent(VideoPlayer);
        video?.requestPictureInPicture();
    }
}
```

### Screenspace Fullscreen

Display video as a fullscreen overlay:

```ts
import { Behaviour, VideoPlayer } from "@needle-tools/engine";

export class FullscreenVideo extends Behaviour {

    onPointerClick() {
        const video = this.gameObject.getComponent(VideoPlayer);
        if (video) {
            video.screenspace = true; // Show fullscreen
            // video.screenspace = false; // Exit fullscreen
        }
    }
}
```

When in screenspace mode:
- Press **Escape** to exit
- Mouse wheel to zoom
- Click and drag to pan
- On mobile: pinch to zoom, drag to pan, double-tap to exit

### Access Video Element

For advanced control, access the underlying HTML video element:

```ts
const video = this.gameObject.getComponent(VideoPlayer);
if (video) {
    const element = video.videoElement;
    const texture = video.videoTexture;
    const material = video.videoMaterial;

    // Direct access to HTML video element
    console.log("Duration:", element.duration);
    console.log("Current time:", element.currentTime);
}
```

## Aspect Ratio Modes

Control how the video dimensions affect your object:

**None (default)**
Object keeps its original size, video may appear stretched

**Adjust Height**
Object height changes to match video aspect ratio

**Adjust Width**
Object width changes to match video aspect ratio

This is especially useful for video streams where the aspect ratio may not be known in advance.

## Common Questions

**What video formats are supported?**
Any format your browser supports. MP4 with H.264 encoding has the best compatibility across all browsers.

**Can I play videos without user interaction?**
Videos may start muted until the user interacts with the page (browser autoplay policy). The VideoPlayer handles this automatically.

**How do I play YouTube videos?**
Direct YouTube URLs don't work. You need to use the YouTube embed API or download/convert the video to a supported format.

**Can I play videos from my local computer?**
For development, serve videos from your local web server or use a URL to a hosted video. For production, host videos on a CDN or web server.

**What about livestreams?**
Yes! The VideoPlayer supports HLS streams (m3u8 files). The component automatically loads the HLS.js library when needed.

**Does it work on mobile?**
Yes! The component uses `playsInline` to prevent fullscreen takeover on iOS and handles touch input for screenspace mode.

**How do I hide the video but keep the audio?**
Set the object's scale to very small or move it off-screen. The audio will still play.

## Performance Tips

**Video Resolution**
Use appropriate resolution for your target display size. A 1920×1080 video on a small UI element wastes bandwidth and processing power.

**Compression**
Compress videos before deployment. Tools like HandBrake or FFmpeg can significantly reduce file size while maintaining quality.

**Preloading**
Call `videoPlayer.preloadVideo()` to start loading the video before playback is needed.

**Multiple Videos**
If showing many videos simultaneously, consider starting them paused and only playing those currently visible to users.

## Debugging

Enable debug mode by adding `?debugvideo` to your URL:

```
http://localhost:3000?debugvideo
```

This logs detailed information about video loading, playback state, and errors.

## More Information

**Live Example:**
- [Video Playback Sample](https://engine.needle.tools/samples/video-playback/) - Interactive demo with playback controls

**API Documentation:**
- [VideoPlayer API](https://engine.needle.tools/docs/api/VideoPlayer) - Complete technical reference

**Related Components:**
- [Audio Source](/docs/reference/components#audiosource) - Play audio files
- [UI Components](/docs/reference/components#ui) - Create video UI controls

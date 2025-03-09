import { AudioSource, Behaviour, serializable } from "@needle-tools/engine";

// declaring AudioClip type is for codegen to produce the correct input field (for e.g. Unity or Blender)
declare type AudioClip = string;

export class My2DAudio extends Behaviour {

    // The clip contains a string pointing to the audio file - by default it's relative to the GLB that contains the component
    // by adding the URL decorator the clip string will be resolved relative to your project root and can be loaded
    @serializable(URL)
    clip?: AudioClip;

    awake() {
        // creating a new audio element and playing it
        const audioElement = new Audio(this.clip);
        audioElement.loop = true;
        // on the web we have to wait for the user to interact with the page before we can play audio
        AudioSource.registerWaitForAllowAudio(() => {
            audioElement.play();
        })
    }
}
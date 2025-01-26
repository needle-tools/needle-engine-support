import { Behaviour, FileReference, ImageReference, serializable } from "@needle-tools/engine";

export class FileReferenceExample extends Behaviour {

    // A FileReference can be used to load and assign arbitrary data in the editor. You can use it to load images, audio, text files... FileReference types will not be saved inside as part of the GLB (the GLB will only contain a relative URL to the file)
    @serializable(FileReference)
    myFile?: FileReference;
    // Tip: if you want to export and load an image (that is not part of your GLB) if you intent to add it to your HTML content for example you can use the ImageReference type instead of FileReference. It will be loaded as an image and you can use it as a source for an <img> tag.

    async start() {
        console.log("This is my file: ", this.myFile);
        // load the file
        const data = await this.myFile?.loadRaw();
        if (!data) {
            console.error("Failed loading my file...");
            return;
        }
        console.log("Loaded my file. These are the bytes:", await data.arrayBuffer());
    }
}
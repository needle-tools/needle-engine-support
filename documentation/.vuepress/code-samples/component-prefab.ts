
import { Behaviour, serializeable, AssetReference } from "@needle-tools/engine";

export class MyClass extends Behaviour {

    // if you export a prefab or scene as a reference from Unity you'll get a path to that asset
    // which you can de-serialize to AssetReference for convenient loading
    @serializeable(AssetReference)
    myPrefab?: AssetReference;
    
    async start() {
      // directly instantiate
      const myInstance = await myPrefab?.instantiate();

      // you can also just load and instantiate later
      // myPrefab.loadAssetAsync();
    }  
} 
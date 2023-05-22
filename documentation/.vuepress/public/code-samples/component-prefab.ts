import { Behaviour, serializable, AssetReference } from "@needle-tools/engine";

export class MyClass extends Behaviour {

    // if you export a prefab or scene as a reference from Unity you'll get a path to that asset
    // which you can de-serialize to AssetReference for convenient loading
    @serializable(AssetReference)
    myPrefab?: AssetReference;
    
    async start() {
      // directly instantiate
      const myInstance = await this.myPrefab?.instantiate();

      // you can also just load and instantiate later
      // const myInstance = await this.myPrefab.loadAssetAsync();
      // this.gameObject.add(myInstance)
      // this is useful if you know that you want to load this asset only once because it will not create a copy
      // since ``instantiate()`` does create a copy of the asset after loading it
    }  
} 
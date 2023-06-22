# HOW TO




## Inject Sample Code

You can automatically include code written in the Needle Engine Samples repository in the documentation. The code for parsing the sample code can be found in [`documentation/.vuepress/plugins/include-samples-code/index.js`](documentation/.vuepress/plugins/include-samples-code/index.js)    

All typescript, javascript and c# code is parsed in the [Needle Engine Samples Repository](https://github.com/needle-tools/needle-engine-samples).   

Follow these steps to insert code blocks:

1) In the *samples repository* mark the beginning and end of a sample code block like this. Give each tag a sensible name, for example:    
      ```ts
      // START MARKER play_animation_on_trigger`
      <code>
      // END MARKER play_animation_on_trigger
      ```
2) Push to the `docs/code-marker` branch
3) In the *documentation repository* (this repo) include code blocks by adding a HTML comment in the markdown files. For example:  
      ```html
      <!-- SAMPLE subscribe_to_events -->      
      ```
      Note: If your code block doesnt show up check the console of the documentation local server. If you just updated the samples repository it may take a few minutes to be available.   
      
      You can also insert additional markdown inside of the HTML comment. It will then only be rendered if the sample code can be found.
      For example:  
      ```html
      <!-- SAMPLE disable environment light 
      ## Disable environment light
      -->
      ```
      This is looking for a sample marker with "disable environment light" and if it finds it, it will render the markdown in the subsequent rows and then the code

  
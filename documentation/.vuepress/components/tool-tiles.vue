

<template>
    <div>
        <tool-tile image="/docs/imgs/unity-logo.webp" docs_url="/docs/unity/">
            <template v-slot:tool-name>
                Needle × Unity
            </template>
            <template v-slot:tool-description>
                Unity 2021.3 LTS<br/>
                Unity 2022.3 LTS<br/>
                Unity 6
            </template>
            <template v-slot:download-button>
                <needle-button 
                    event_goal="download_unity" 
                    event_position="getting_started" 
                    large 
                    href="https://engine.needle.tools/downloads/unity?utm_source=needle_docs&utm_content=getting_started" 
                    next_url="./../unity/">
                    <strong>Download</strong>
                </needle-button>
            </template>
            <template v-slot:video-tutorial>
                <video-embed src="https://www.youtube.com/watch?v=gfslrxhkH3E" limit_height max_height="70xp"/>
            </template>
        </tool-tile>

        <tool-tile image="/docs/blender/logo.png" docs_url="/docs/blender/">
            <template v-slot:tool-name>
                Needle × Blender
            </template>
            <template v-slot:tool-description>
                Blender 4.1<br/>
                Blender 4.2+
            </template>
            <template v-slot:download-button>
                <needle-button 
                    event_goal="download_blender" 
                    event_position="getting_started" 
                    large 
                    href="https://engine.needle.tools/downloads/blender?utm_source=needle_docs&utm_content=getting_started"
                    next_url="./../blender/">
                    <strong>Download</strong>
                </needle-button>
            </template>
            <template v-slot:video-tutorial>
                <video-embed src="https://www.youtube.com/watch?v=TXEHR4Cq7iU" limit_height max_height="70xp"/>
            </template>
        </tool-tile>
    </div>
    <div>
        <tool-tile image="/docs/imgs/logo-webcomponents.png">
            <template v-slot:tool-name>
                &lt;needle-engine&gt;<br/>Web Component
            </template>
            <template v-slot:tool-description>
                Rich, interactive 3D content made easy
            </template>
            <template v-slot:download-button>
                <needle-button 
                    event_goal="download_webcomponent" 
                    event_position="getting_started" 
                    large same_tab
                    href="/docs/three/">
                    <strong>Get Started</strong>
                </needle-button>
            </template>
        </tool-tile>

        <tool-tile image="/docs/imgs/threejs-logo.webp">
            <template v-slot:tool-name>
                Needle × three.js
            </template>
            <template v-slot:tool-description>
                three.js r162+
            </template>
            <template v-slot:download-button>
                <needle-button 
                    event_goal="download_threejs" 
                    event_position="getting_started" 
                    large same_tab
                    href="/docs/three/">
                    <strong>Get Started</strong>
                </needle-button>
            </template>
        </tool-tile>


        <tool-tile>
            <template v-slot:tool-name>
                Other Workflows
            </template>
            <template v-slot:tool-description>
                Learn how to integrate Needle Engine into your tool or workflow
            </template>
            <template v-slot:download-button>
                <needle-button 
                    event_goal="download_custom" 
                    event_position="getting_started" 
                    large same_tab
                    href="/docs/custom-integrations/">
                    <strong>Learn More</strong>
                </needle-button>
            </template>
        </tool-tile>
    </div>
</template>

<style scoped>

div {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
}

div.vertical {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

@media screen and (max-width: 720px) {
    div {
        justify-content: center;
    }
}
</style>

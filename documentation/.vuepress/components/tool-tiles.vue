

<template>
    <div>
        <tool-tile image="/docs/imgs/unity-logo.webp" docs_url="/docs/unity/">
            <template v-slot:tool-name>
                Needle × Unity
            </template>
            <template v-slot:tool-description>
                Unity 6 LTS<br/>
                Unity 6.3 LTS
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
        </tool-tile>

        <tool-tile image="/docs/blender/logo.png" docs_url="/docs/blender/">
            <template v-slot:tool-name>
                Needle × Blender
            </template>
            <template v-slot:tool-description>
                Blender 4.5 LTS<br/>
                Blender 5.0.1
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
        </tool-tile>

        <tool-tile image="/docs/imgs/needle-logo.webp" reserve_next_steps>
            <template v-slot:tool-name>
                Needle Editor
            </template>
            <template v-slot:download-button>
                <needle-button large disabled>
                    <strong>Coming soon</strong>
                </needle-button>
            </template>
        </tool-tile>

        <tool-tile image="/docs/imgs/threejs-logo.webp">
            <template v-slot:tool-name>
                Needle × three.js
            </template>
            <template v-slot:tool-description>
                three.js r185
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

        <tool-tile class="vibe-coding-tile" image="/docs/imgs/vibe-coding.webp">
            <template v-slot:tool-name>
                Vibe coding
            </template>
            <template v-slot:tool-description>
                Set up your AI coding assistant with Needle Engine skills and connect it to live scenes with MCP.
            </template>
            <template v-slot:download-button>
                <needle-button
                    event_goal="setup_ai"
                    event_position="getting_started"
                    large same_tab
                    href="/docs/ai/">
                    <strong>Set Up AI</strong>
                </needle-button>
            </template>
        </tool-tile>

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
                    href="/docs/how-to-guides/web-integration/">
                    <strong>Get Started</strong>
                </needle-button>
            </template>
        </tool-tile>


        <tool-tile>
            <template v-slot:tool-name>
                Custom Integrations
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

:deep(.vibe-coding-tile > img) {
    width: 110px;
    height: 110px;
    max-height: 110px;
}


div {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
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

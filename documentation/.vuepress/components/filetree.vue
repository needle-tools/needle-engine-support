<template>
    <dl>
        <div class="header">
            <span class="header">{{ props.name }}</span>
            <span class="header">Description</span>
        </div>
        <slot></slot>
    </dl>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const props = defineProps<{
    name: string;
    showall?: boolean;
}>();

let selectedItem: TreeItem | null = null;

// Each div.file is either a folder or a file
// The DD element is the description/content of the file or folder
// The DT element is clickable
// If it's a folder, clicking it will show/hide the divs below that are inside that folder
// If it's a file, clicking it will show/hide the content in the DD element

const canToggleFolders = false;

class TreeItem {
    element: HTMLElement; // The DT element
    contentElement: HTMLElement; // The DD element
    isFolder: boolean; // Whether this item is a folder or a file
    isExpanded: boolean = true; // Whether the folder is expanded or not
    children: FileTree; // Children of this item, if it's a folder

    toggleChildren(state: boolean | undefined) {
        if (state === undefined) state = !this.isExpanded;
        this.isExpanded = state;
        this.children.items.forEach((childData, childDiv) => {
            childDiv.classList.toggle('hidden', !state);
            childData.toggleChildren(state);
        });
        this.element.classList.toggle('closed', !state);
    }
}

class FileTree {
    items: Map<HTMLDivElement, TreeItem> = new Map();
    pathToItem: Map<string, TreeItem> = new Map();
}

let fileTree = new FileTree();

onMounted(() => {
    // find all DD elements and add a class to them
    const dds = document.querySelectorAll('dd');
    dds.forEach(dd => {
        if (!props.showall)
            dd.classList.add('hidden');
    });

    let firstItem: TreeItem | null = null;

    // make all DT elements clickable
    const dts = document.querySelectorAll('dt') as NodeListOf<HTMLElement>;
    dts.forEach(dt => {

        // If the text content looks like a path, split it by / and only keep the last part,
        // with a few tabs in front
        // If the last part is empty, it means this is a folder, show it with a folder icon
        let content = dt.textContent?.trim() || '';
        let isFolder = content.endsWith('/');

        const parts = dt.textContent?.split('/') || [];
        const lastPartIndex = isFolder ? parts.length - 2 : parts.length - 1;
        const lastPart = parts[lastPartIndex] || ''; // Get the last part, or the second last if it's a folder

        if (isFolder) {
            dt.classList.add('folder');
        }
        else {
            dt.classList.add('file');
            const extension = lastPart.split('.').pop()?.toLowerCase() || '';
            dt.classList.add(extension);
        }


        dt.style.setProperty('--depth', `${lastPartIndex}`); // Set a custom property for depth
        dt.textContent = lastPart; // Set the text content to the last part

        const path = parts.slice(0, lastPartIndex + 1).join('/');
        if (!props.showall)
        dt.addEventListener('click', () => {
            const item = fileTree.pathToItem.get(path);
            if (isFolder && canToggleFolders) {
                if (item) {
                    item.toggleChildren(!item.isExpanded);
                }
            }
            else {
                const nextDd = dt.nextElementSibling as HTMLElement;
                const isOn = nextDd.classList.contains('hidden');
                nextDd.classList.toggle('hidden', !isOn);
                if (selectedItem && selectedItem !== item) {
                    selectedItem.contentElement.classList.toggle('hidden', isOn);
                    selectedItem.element.classList.remove('selected');
                }
                selectedItem = item || null;
                selectedItem?.element.classList.add('selected'); // Highlight the selected item
            }
        });

        // Add the item to the file tree
        const fileDiv = dt.parentElement as HTMLDivElement;
        const contentDd = dt.nextElementSibling as HTMLElement;

        let newItem = new TreeItem();
        newItem.element = dt;
        newItem.contentElement = contentDd;
        newItem.isFolder = isFolder;
        newItem.children = new FileTree();
        
        if (firstItem === null)
            firstItem = newItem;

        if (lastPartIndex == 0) {
            fileTree.items.set(fileDiv, newItem);
        }
        else {
            // Find the parent item based on the path
            const parentPath = parts.slice(0, lastPartIndex).join('/');
            // Add the item to the parent's children
            const parentData = fileTree.pathToItem.get(parentPath);
            if (parentData) {
                parentData.children.items.set(fileDiv, newItem);
            }
            else {
                // Traverse from the start and create the missing parents
                // TODO
                console.warn(`Parent not found for path: ${parentPath}. Creating implicit parents is not implemented yet.`);
            }
        }
        // Update the path to item map
        fileTree.pathToItem.set(path, newItem);
    });

    // The very first DT should be visible by default
    if (!props.showall && firstItem) {
        let item = firstItem as TreeItem;
        item.element.classList.remove('hidden');
        item.element.classList.add('selected'); // Highlight the first item
        const nextDd = item.contentElement;
        if (nextDd) {
            nextDd.classList.remove('hidden');
            selectedItem = item; // Set the selected DD to the first one
        }
    }
});
</script>

<style>

.file {
    position: relative;
    display: flex;
    align-items: stretch;
}

div.header {
    border-bottom: 1px solid #eee;
}

span.header {
    width: 250px;
    font-weight: bold;
    display: inline-block;
    margin-bottom: 0.5em;
    margin-left: 0.1em;
}

dt:hover {
    background-color: rgb(241, 241, 241) !important;
}

html[data-theme='dark'] dt:hover {
    background-color: rgb(50, 50, 50) !important;
}

.file.hidden, dt.hidden, dd.hidden {
    display: none;
}

dl {
    overflow-x: auto;
}

dd {
    min-width: 250px;
}

dt, dd {
    padding-bottom: 0.3em !important;
    padding-top: 0.3em !important;
    margin: 0;
}

dd > p {
    margin: 0;
}

dt {
    --depth: 0;
    cursor: pointer;
    font-family: monospace;
    font-size: 0.9em;
    position: relative;
    padding-left: calc(var(--depth) * 1.5em) !important;
    width: calc(250px - var(--depth) * 1.5em);
    border-right: 1px solid #eee !important;
    flex-shrink: 0;

    &.selected {
        font-weight: bold;
    }
}

dt.folder {
    &::before {
        content: 'folder_open';
        font-family: 'Material Symbols Outlined';
        margin-right: 1em;
    }

    &.closed::before {
        content: 'folder';
    }
}

dt.file {
    &::before {
        content: 'draft';
        font-family: 'Material Symbols Outlined';
        margin-right: 1em;
    }

    &.js::before, &.ts::before, &.json::before {
        content: 'code';
    }

    &.html::before {
        content: 'draft';
    }

    &.css::before {
        content: 'code';
    }

    &.glb::before {
        content: 'deployed_code';
    }
}

dd {
    padding-left: 1em !important;
    flex: 1;
}
</style>
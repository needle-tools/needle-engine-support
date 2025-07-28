<template>
    <slot></slot>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

let selectedItem: TreeItem | null = null;

// Each TR is either a folder or a file
// The second TD is the description/content of the file or folder
// The first TD is clickable
// If it's a folder, clicking it will show/hide the TRs below that are inside that folder
// If it's a file, clicking it will show/hide the content in the second TD

const canToggleFolders = false;

class TreeItem {
    element: HTMLTableCellElement; // The first TD
    contentElement: HTMLTableCellElement; // The second TD
    isFolder: boolean; // Whether this item is a folder or a file
    isExpanded: boolean = true; // Whether the folder is expanded or not
    children: TableTree; // Children of this item, if it's a folder

    toggleChildren(state: boolean | undefined) {
        if (state === undefined) state = !this.isExpanded;
        this.isExpanded = state;
        this.children.items.forEach((childData, childTr) => {
            childTr.classList.toggle('hidden', state);
            childData.toggleChildren(state);
        });
    }
}

class TableTree {
    items: Map<HTMLTableRowElement, TreeItem> = new Map();
    pathToItem: Map<string, TreeItem> = new Map();
}

let tableTree = new TableTree();

onMounted(() => {
    // find all second TDs and add a class to them
    const tds = document.querySelectorAll('td:nth-child(2)');
    tds.forEach(td => {
        td.classList.add('hidden');
    });

    let firstItem: TreeItem | null = null;

    // make all first TDs clickable
    const firstTds = document.querySelectorAll('td:first-child') as NodeListOf<HTMLTableCellElement>;
    firstTds.forEach(td => {

        // If the text content looks like a path, split it by / and only keep the last part,
        // with a few tabs in front
        // If the last part is empty, it means this is a folder, show it with a folder icon
        let content = td.textContent?.trim() || '';
        let isFolder = content.endsWith('/');

        const parts = td.textContent?.split('/') || [];
        const lastPartIndex = isFolder ? parts.length - 2 : parts.length - 1;
        const lastPart = parts[lastPartIndex] || ''; // Get the last part, or the second last if it's a folder

        if (isFolder)
            td.classList.add('folder');
        else
            td.classList.add('file');

        td.style.setProperty('--depth', `${lastPartIndex}`); // Set a custom property for depth
        td.textContent = lastPart; // Set the text content to the last part

        const path = parts.slice(0, lastPartIndex + 1).join('/');
        td.addEventListener('click', () => {
            const item = tableTree.pathToItem.get(path);
            if (isFolder && canToggleFolders) {
                if (item) {
                    item.toggleChildren(!item.isExpanded);
                }
            }
            else {
                const nextTd = td.nextElementSibling as HTMLTableCellElement;
                const isOn = nextTd.classList.contains('hidden');
                nextTd.classList.toggle('hidden', !isOn);
                if (selectedItem && selectedItem !== item) {
                    selectedItem.contentElement.classList.toggle('hidden', isOn);
                    selectedItem.element.classList.remove('selected');
                }
                selectedItem = item || null;
                selectedItem?.element.classList.add('selected'); // Highlight the selected item
            }
        });

        // Add the item to the table tree
        const tr = td.parentElement as HTMLTableRowElement;
        const contentTd = td.nextElementSibling as HTMLTableCellElement;

        let newItem = new TreeItem();
        newItem.element = td;
        newItem.contentElement = contentTd;
        newItem.isFolder = isFolder;
        newItem.children = new TableTree();

        if (firstItem === null)
            firstItem = newItem;

        if (lastPartIndex == 0) {
            tableTree.items.set(tr, newItem);
        }
        else {
            // Find the parent item based on the path
            const parentPath = parts.slice(0, lastPartIndex).join('/');
            // Add the item to the parent's children
            const parentData = tableTree.pathToItem.get(parentPath);
            if (parentData) {
                parentData.children.items.set(tr, newItem);
            }
        }
        // Update the path to item map
        tableTree.pathToItem.set(path, newItem);
    });

    // The very first TD should be visible by default
    if (firstItem) {
        let item = firstItem as TreeItem;
        item.element.classList.remove('hidden');
        item.element.classList.add('selected'); // Highlight the first item
        const nextTd = item.contentElement;
        if (nextTd) {
            nextTd.classList.remove('hidden');
            selectedItem = item; // Set the selected TD to the first one
        }
    }
});
</script>

<style>

table {
    position: relative;
}

tr {
    border: none !important;
    width: 100%;
}

tr:hover {
    background-color: rgb(241, 241, 241) !important;
}

html[data-theme='dark'] tr:hover {
    background-color: rgb(50, 50, 50) !important;
}

tr.hidden, td.hidden {
    display: none;
}

td {
    padding-bottom: 0.3em !important;
    padding-top: 0.3em !important;
}

td:first-child {
    --depth: 0;
    cursor: pointer;
    font-family: monospace;
    font-size: 0.9em;
    position: relative;
    padding-left: calc(var(--depth) * 1.5em) !important;
    width: calc(250px - var(--depth) * 1.5em);
    border-right: 1px solid #eee !important;

    &.selected {
        font-weight: bold;
    }
}

td.folder::before {
    content: '📁';
    margin-right: 1em;
}

td.file::before {
    content: '📄';
    margin-right: 1em;
}

td:nth-child(2) {
    padding-left: 1em !important;
    width: initial;
}
</style>
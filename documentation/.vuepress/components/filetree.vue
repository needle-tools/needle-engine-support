<template>
    <dl role="tree" :aria-labelledby="treeId" tabindex="0" @keydown="handleKeyDown">
        <h3 class="visually-hidden" :id="treeId">
            File Tree: {{ props.name }}
        </h3>
        <div class="header">
            <span class="header">{{ props.name }}</span>
            <span class="header">Description</span>
        </div>
        <slot></slot>
    </dl>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';

const props = defineProps<{
    name: string;
    showall?: boolean;
}>();

let selectedItem: TreeItem | null = null;
let focusedItem: TreeItem | null = null;

const treeId = computed(() => `tree-${Math.random().toString(36).substr(2, 9)}`);

// Generate unique IDs for ARIA attributes
function generateId(path: string, type: 'label' | 'desc'): string {
    const safePath = path.replace(/[^a-zA-Z0-9]/g, '_');
    return `${type}-${safePath}-${Math.random().toString(36).substr(2, 5)}`;
}

// Keyboard navigation handler
function handleKeyDown(event: KeyboardEvent) {
    if (!focusedItem) return;

    switch (event.key) {
        case 'ArrowDown':
            event.preventDefault();
            moveToNext();
            break;
        case 'ArrowUp':
            event.preventDefault();
            moveToPrevious();
            break;
        case 'ArrowRight':
            event.preventDefault();
            if (focusedItem.isFolder) {
                if (!focusedItem.isExpanded) {
                    focusedItem.toggleChildren(true);
                } else {
                    moveToFirstChild();
                }
            }
            break;
        case 'ArrowLeft':
            event.preventDefault();
            if (focusedItem.isFolder && focusedItem.isExpanded) {
                focusedItem.toggleChildren(false);
            } else {
                moveToParent();
            }
            break;
        case 'Home':
            event.preventDefault();
            moveToFirst();
            break;
        case 'End':
            event.preventDefault();
            moveToLast();
            break;
        case 'Enter':
        case ' ':
            event.preventDefault();
            handleItemClick(focusedItem);
            break;
    }
}

function moveToNext() {
    const visibleItems = getVisibleItems();
    const currentIndex = visibleItems.indexOf(focusedItem!);
    if (currentIndex < visibleItems.length - 1) {
        setFocus(visibleItems[currentIndex + 1]);
    }
}

function moveToPrevious() {
    const visibleItems = getVisibleItems();
    const currentIndex = visibleItems.indexOf(focusedItem!);
    if (currentIndex > 0) {
        setFocus(visibleItems[currentIndex - 1]);
    }
}

function moveToFirstChild() {
    if (focusedItem && focusedItem.isFolder && focusedItem.isExpanded) {
        const children = Array.from(focusedItem.children.items.values());
        if (children.length > 0) {
            setFocus(children[0]);
        }
    }
}

function moveToParent() {
    if (focusedItem && focusedItem.depth > 0) {
        const parentPath = getParentPath(focusedItem.path);
        const parent = fileTree.pathToItem.get(parentPath);
        if (parent) {
            setFocus(parent);
        }
    }
}

function moveToFirst() {
    const visibleItems = getVisibleItems();
    if (visibleItems.length > 0) {
        setFocus(visibleItems[0]);
    }
}

function moveToLast() {
    const visibleItems = getVisibleItems();
    if (visibleItems.length > 0) {
        setFocus(visibleItems[visibleItems.length - 1]);
    }
}

function getVisibleItems(): TreeItem[] {
    const visible: TreeItem[] = [];
    
    function collectVisible(items: Map<HTMLDivElement, TreeItem>) {
        items.forEach((item, element) => {
            if (!element.classList.contains('hidden')) {
                visible.push(item);
                if (item.isFolder && item.isExpanded) {
                    collectVisible(item.children.items);
                }
            }
        });
    }
    
    collectVisible(fileTree.items);
    return visible;
}

function setFocus(item: TreeItem) {
    if (focusedItem) {
        focusedItem.element.removeAttribute('tabindex');
        focusedItem.element.classList.remove('focused');
    }
    
    focusedItem = item;
    item.element.setAttribute('tabindex', '0');
    item.element.classList.add('focused');
    item.element.focus();
}

function getParentPath(path: string): string {
    const parts = path.split('/').filter(part => part !== '');
    const parentParts = parts.slice(0, -1);
    return parentParts.join('/') + (parentParts.length > 0 ? '/' : '');
}

// Each div.file is either a folder or a file
// The DD element is the description/content of the file or folder
// The DT element is clickable
// If it's a folder, clicking it will show/hide the divs below that are inside that folder
// If it's a file, clicking it will show/hide the content in the DD element

const canToggleFolders = false;

class TreeItem {
    element: HTMLElement; // The DT element
    contentElement: HTMLElement; // The DD element
    fileDiv: HTMLDivElement; // The parent div containing both DT and DD
    isFolder: boolean; // Whether this item is a folder or a file
    isExpanded: boolean = true; // Whether the folder is expanded or not
    children: FileTree; // Children of this item, if it's a folder
    path: string;
    depth: number;
    labelId: string;
    descId: string;

    constructor(dtElement: HTMLElement, ddElement: HTMLElement, fileDiv: HTMLDivElement, path: string) {
        this.element = dtElement;
        this.contentElement = ddElement;
        this.fileDiv = fileDiv;
        this.path = path;
        this.children = new FileTree();
        this.labelId = generateId(path, 'label');
        this.descId = generateId(path, 'desc');
        
        const parts = path.split('/').filter(part => part !== '');
        this.isFolder = path.endsWith('/');
        // For folders: src/scripts/ -> ['src', 'scripts'] -> depth should be 1 (scripts)
        // For files: src/main.ts -> ['src', 'main.ts'] -> depth should be 1 (main.ts)
        this.depth = parts.length - 1;
        
        this.setupElement();
        this.setupAria();
    }

    private setupElement() {
        const parts = this.path.split('/').filter(part => part !== '');
        // For folders: src/myfolder/ -> ['src', 'myfolder'] -> show 'myfolder'
        // For files: src/main.ts -> ['src', 'main.ts'] -> show 'main.ts'
        const lastPart = parts[parts.length - 1] || '';
        
        // Set classes
        if (this.isFolder) {
            this.element.classList.add('folder');
        } else {
            this.element.classList.add('file');
            const extension = lastPart.split('.').pop()?.toLowerCase() || '';
            this.element.classList.add(extension);
        }

        // Set styling and content
        this.element.style.setProperty('--depth', `${this.depth}`);
        this.element.textContent = lastPart;
    }

    private setupAria() {
        // Add ARIA role and attributes to the file div
        this.fileDiv.setAttribute('role', 'treeitem');
        this.fileDiv.setAttribute('aria-labelledby', this.labelId);
        this.fileDiv.setAttribute('aria-describedby', this.descId);
        this.fileDiv.setAttribute('aria-selected', 'false');
        
        // Add IDs for ARIA references
        this.element.id = this.labelId;
        this.contentElement.id = this.descId;
        
        // Add aria-expanded for folders
        if (this.isFolder) {
            this.fileDiv.setAttribute('aria-expanded', this.isExpanded.toString());
        }
        
        // Make the DT element focusable but not the primary focus target
        this.element.setAttribute('tabindex', '-1');
    }

    updateAriaExpanded() {
        if (this.isFolder) {
            this.fileDiv.setAttribute('aria-expanded', this.isExpanded.toString());
        }
    }

    updateAriaSelected(selected: boolean) {
        this.fileDiv.setAttribute('aria-selected', selected.toString());
    }

    toggleChildren(state: boolean | undefined) {
        if (state === undefined) state = !this.isExpanded;
        this.isExpanded = state;
        this.updateAriaExpanded();
        
        this.children.items.forEach((childData, childDiv) => {
            childDiv.classList.toggle('hidden', !state);
            if (!state) {
                childData.toggleChildren(false);
            }
        });
        this.element.classList.toggle('closed', !state);
    }

    toggle(force?: boolean) {
        const shouldShow = force !== undefined ? force : this.contentElement.classList.contains('hidden');
        
        this.contentElement.classList.toggle('hidden', !shouldShow);
        this.element.classList.toggle('selected', shouldShow);
        this.updateAriaSelected(shouldShow);
    }
}

class FileTree {
    items: Map<HTMLDivElement, TreeItem> = new Map();
    pathToItem: Map<string, TreeItem> = new Map();
}

let fileTree = new FileTree();

function handleItemClick(item: TreeItem) {
    // Update selection state
    if (selectedItem && selectedItem !== item) {
        selectedItem.updateAriaSelected(false);
        selectedItem.toggle(false);
    }
    
    if (item.isFolder && canToggleFolders) {
        item.toggleChildren(!item.isExpanded);
    } else {
        // Toggle current item
        item.toggle();
        const isNowSelected = !item.contentElement.classList.contains('hidden');
        selectedItem = isNowSelected ? item : null;
    }
    
    // Set focus to the clicked item
    setFocus(item);
}

function addToParent(item: TreeItem, fileDiv: HTMLDivElement) {
    const parts = item.path.split('/').filter(part => part !== '');
    const parentParts = parts.slice(0, -1);
    const parentPath = parentParts.join('/') + (parentParts.length > 0 ? '/' : '');
    
    const parentData = fileTree.pathToItem.get(parentPath);
    if (parentData) {
        parentData.children.items.set(fileDiv, item);
    } else {
        console.warn(`Parent not found for path: ${parentPath}. Creating implicit parents is not implemented yet.`);
    }
}

onMounted(() => {
    // Hide all DD elements initially if not showing all
    if (!props.showall) {
        const dds = document.querySelectorAll('dd');
        dds.forEach(dd => dd.classList.add('hidden'));
    }

    let firstItem: TreeItem | null = null;

    // Process all DT elements
    const dts = document.querySelectorAll('dt') as NodeListOf<HTMLElement>;
    dts.forEach(dt => {
        const content = dt.textContent?.trim() || '';
        const path = content;
        const ddElement = dt.nextElementSibling as HTMLElement;
        const fileDiv = dt.parentElement as HTMLDivElement;

        // Create tree item
        const newItem = new TreeItem(dt, ddElement, fileDiv, path);
        
        if (firstItem === null) {
            firstItem = newItem;
        }

        // Setup click handler
        if (!props.showall) {
            dt.addEventListener('click', () => handleItemClick(newItem));
        }

        // Add to tree structure
        if (newItem.depth === 0) {
            fileTree.items.set(fileDiv, newItem);
        } else {
            addToParent(newItem, fileDiv);
        }

        // Update path mapping
        fileTree.pathToItem.set(path, newItem);
    });

    // Show first item by default and set initial focus
    if (!props.showall && firstItem) {
        (firstItem as TreeItem).toggle(true);
        selectedItem = firstItem as TreeItem;
        // setFocus(firstItem as TreeItem);
    }
});
</script>

<style>

html[data-theme='dark'] dt:hover {
    background-color: rgb(50, 50, 50) !important;
}

html[data-theme='dark'] dt.focused {
    border-right-color: #4fc3f7;
}

dl[role="tree"] {

    background-color: var(--c-quote-background);
    padding: 1em;
    border-radius: 0.5em;

    & .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }

    & div.file {
        position: relative;
        display: flex;
        align-items: stretch;

        @media print {
            border-bottom: 1px solid #00000012;
        }
    }

    & div.header {
        border-bottom: 1px solid #eee;
    }

    & span.header {
        width: 250px;
        font-weight: bold;
        display: inline-block;
        margin-bottom: 0.5em;
        margin-left: 0.1em;
    }

    & dt:hover {
        background-color: rgb(241, 241, 241) !important;
    }

    & dt.focused {
        border-right: 2px solid #007acc;
        outline-offset: -2px;
    }

    & .file.hidden, & dt.hidden, & dd.hidden {
        display: none;

        @media print {
            display: block;
        }
    }

    & dl {
        overflow-x: auto;
    }

    & dd {
        min-width: 250px;
    }

    & dd:has(*) {
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
    }

    & dt, & dd {
        padding-bottom: 0.3em !important;
        padding-top: 0.3em !important;
        margin: 0;
    }

    & dd > p {
        margin: 0;
    }

    & dt {
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

            @media print {
                font-weight: initial;
            }
        }
    }

    & dt.folder {
        &::before {
            content: 'folder_open';
            content: 'folder_open' / '';
            font-family: 'Material Symbols Outlined';
            margin-right: 1em;
        }

        &.closed::before {
            content: 'folder';
            content: 'folder' / '';
        }
    }

    & dt.file {
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

    & dd {
        padding-left: 1em !important;
        flex: 1;
        margin-top: -1px;
    }

}

</style>
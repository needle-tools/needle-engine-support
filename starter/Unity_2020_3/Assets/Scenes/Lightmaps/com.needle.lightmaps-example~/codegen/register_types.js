﻿import { TypeStore } from "needle.tiny.engine/engine/engine_typestore"

// Import types
import { Hover } from "../Hover.ts";
import { LoadScenes } from "../LoadScenes.ts";

// Register types
TypeStore.add("Hover", Hover);
TypeStore.add("LoadScenes", LoadScenes);

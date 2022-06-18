import { TypeStore } from "needle.tiny.engine/engine/engine_typestore"

// Import types
import { SetHitPoint } from "../SetHitPoint.ts";
import { RandomTimeOffset } from "../SetHitPoint.ts";

// Register types
TypeStore.add("SetHitPoint", SetHitPoint);
TypeStore.add("RandomTimeOffset", RandomTimeOffset);

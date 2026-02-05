import * as mc from '@minecraft/server';
import { introDimensionStrip } from "../assets/story_assets.js"
import { CHUNK_SIZE, DIM_SIZE } from "../dimension.js"
import { cyrb128 } from "../random.js"
import { VMath } from "../utils/vmath.js"
import { getPortalPermutation, updatePortalInfo } from '../portal.js';
import { HALL_DIMENSION } from '../scenes/hall.js';

export const hardcodedDimensions = {}
const busyCallbacks = new Set();
hardcodedDimensions[cyrb128(introDimensionStrip)] = (ctx) => {
    ctx.callbacks.chunkLoaded = async () => {
        let alreadyLoaded = ctx.dimension.getProperty(`houseLoaded`);
        if (alreadyLoaded) {
            delete ctx.generatorCallback;
            return;
        }
        if (busyCallbacks.has(ctx.dimension.id)) return;
        if (Math.sqrt((ctx.chunk.x - DIM_SIZE / 2) ** 2 + (ctx.chunk.z - DIM_SIZE / 2) ** 2) < DIM_SIZE / 4) return;

        busyCallbacks.add(ctx.dimension.id);
        await ctx.dimension.awaitChunks(ctx.chunk, 2);
        let location = VMath.add(ctx.info.origin, VMath.floor(VMath.scale(VMath.add(ctx.chunk, { x: Math.random(), z: Math.random() }), CHUNK_SIZE)));
        location.y = ctx.dimension.dimension.getTopmostBlock(location)?.location.y - 1;
        let structure = mc.world.structureManager.get(`mystructure:rinexohouse`);
        let hash = ctx.dimension.id;
        let permutation = getPortalPermutation(hash, `north`);
        let portalOffset = { x: 11, y: 6, z: 14 };
        let portalLocation = VMath.add(location, portalOffset);
        for (let j = 0; j < 6; j++) structure.setBlockPermutation(VMath.add(
            portalOffset,
            { x: Math.floor(j / 3), y: j % 3, z: 0 }
        ), permutation);
        mc.world.structureManager.place(structure, ctx.dimension.dimension, location);
        let portalInfo = {
            location: portalLocation,
            hash,
            id: Date.now(),
            orientation: `x`,
            dimension: ctx.dimension.dimension.id,
            from: portalLocation,
            to: VMath.add(portalLocation, {
                x: 1,
                y: 3,
                z: 2
            })
        };
        updatePortalInfo(portalInfo);
        ctx.dimension.setProperty(`houseLoaded`, true);
        mc.world.setDynamicProperty(`og:house_location`, portalLocation)
    }
}
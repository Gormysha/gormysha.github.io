import { VMath } from "./vmath";
import * as mc from '@minecraft/server';

function rotateAroundPivot(point, pivot, rotation) {
    return VMath.add(rotateVector(VMath.subtract(point, pivot), rotation), pivot);
}

function toEntitySpace(point, entity, translate = true) {
    let t = { x: point.x, y: point.y, z: point.z }
    //translation
    if (translate) {
        t.x -= entity.location.x;
        t.y -= entity.location.y;
        t.z -= entity.location.z;
    }

    //y rotation
    let a = Math.PI * (entity.getRotation().y) / 180;
    //let a = entity.getRotation().y;
    let r = { y: t.y };
    r.x = Math.cos(a) * t.x + Math.sin(a) * t.z;
    r.z = -Math.sin(a) * t.x + Math.cos(a) * t.z;

    //scale
    r.x *= -16;
    r.y *= 16;
    r.z *= -16;
    return r;
}

function toWorldSpace(point, entity, translate = true) {
    let t = { x: point.x, y: point.y, z: point.z }

    //scale
    t.x /= -16;
    t.y /= 16;
    t.z /= -16;

    //y rotation
    let a = -Math.PI * (entity.getRotation().y) / 180;
    //let a = -entity.getRotation().y;
    let r = { y: t.y };
    r.x = Math.cos(a) * t.x + Math.sin(a) * t.z;
    r.z = -Math.sin(a) * t.x + Math.cos(a) * t.z;

    if (translate) {
        r.x += entity.location.x;
        r.y += entity.location.y;
        r.z += entity.location.z;
    }
    return r;
}

function degreesToRadians(deg) {
    return deg * Math.PI / 180;
}

// function rotateVector(v, rot) {
//     // Apply inverse rotation: around X, then Y, then Z (or reverse - depends on your convention)
//     //^^^was it written by chatgpt???:/
//     //if i understand correctly it's not supposed to be inverse rotation
//     //whatever i'm removing the minus sign
//     let rx = degreesToRadians(rot.x);
//     let ry = degreesToRadians(rot.y);
//     let rz = degreesToRadians(rot.z);

//     let x = v.x, y = v.y, z = v.z;

//     // Rotate around Z
//     let cz = Math.cos(rz), sz = Math.sin(rz);
//     [x, y] = [x * cz - y * sz, x * sz + y * cz];

//     // Rotate around Y
//     let cy = Math.cos(ry), sy = Math.sin(ry);
//     [x, z] = [x * cy + -z * sy, x * sy + z * cy];

//     // Rotate around X
//     let cx = Math.cos(rx), sx = Math.sin(rx);
//     [y, z] = [y * cx + -z * sx, y * sx + z * cx];

//     return { x, y, z };
// }
function rotateVector(v, rot, order = `YXZ`) {
    let rx = degreesToRadians(rot.x);
    let ry = degreesToRadians(rot.y);
    let rz = degreesToRadians(rot.z);

    let x = v.x, y = v.y, z = v.z;

    for (let i = 0; i < order.length; i++) {
        let c = order[i].toUpperCase();
        if (c === 'Y') {
            let cy = Math.cos(ry), sy = Math.sin(ry);
            [x, z] = [x * cy + -z * sy, x * sy + z * cy];
        } else if (c === 'X') {
            let cx = Math.cos(rx), sx = Math.sin(rx);
            [y, z] = [y * cx + -z * sx, y * sx + z * cx];
        } else if (c === 'Z') {
            let cz = Math.cos(rz), sz = Math.sin(rz);
            [x, y] = [x * cz - y * sz, x * sz + y * cz];
        }
    }
    return { x, y, z };
}

function rayBoneDot(origin, direction, bone) {
    const [bmin, bmax] = [{
        x: bone.origin.x,
        y: bone.origin.y,
        z: bone.origin.z
    }, {
        x: bone.origin.x + bone.size.x,
        y: bone.origin.y + bone.size.y,
        z: bone.origin.z + bone.size.z
    }];
    if (bone.rotation) {
        const pivot = bone.pivot || bone.origin;
        origin = rotateVector({
            x: origin.x - pivot.x,
            y: origin.y - pivot.y,
            z: origin.z - pivot.z
        }, bone.rotation);
        direction = rotateVector(direction, bone.rotation)
        bmin.x -= pivot.x;
        bmin.y -= pivot.y;
        bmin.z -= pivot.z;
        bmax.x -= pivot.x;
        bmax.y -= pivot.y;
        bmax.z -= pivot.z;
    }
    const center = {
        x: (bmin.x + bmax.x) / 2,
        y: (bmin.y + bmax.y) / 2,
        z: (bmin.z + bmax.z) / 2
    }
    return VMath.dot(VMath.normalize(VMath.subtract(center, origin)), VMath.normalize(direction));
}

function rayIntersectsBone(origin, direction, bone) {
    const [bmin, bmax] = [{
        x: bone.origin.x,
        y: bone.origin.y,
        z: bone.origin.z
    }, {
        x: bone.origin.x + bone.size.x,
        y: bone.origin.y + bone.size.y,
        z: bone.origin.z + bone.size.z
    }];
    if (bone.rotation) {
        const pivot = bone.pivot || bone.origin;
        let angle = VMath.scale(bone.rotation, -1);
        origin = rotateVector({
            x: origin.x - pivot.x,
            y: origin.y - pivot.y,
            z: origin.z - pivot.z
        }, angle);
        direction = rotateVector(direction, angle)
        bmin.x -= pivot.x;
        bmin.y -= pivot.y;
        bmin.z -= pivot.z;
        bmax.x -= pivot.x;
        bmax.y -= pivot.y;
        bmax.z -= pivot.z;
    }

    for (let i = 0; i < 3; i++) {
        let axes = [`x`, `y`, `z`].map((_, j, arr) => arr[(i + j) % 3]);
        let [k, l, m] = axes;
        let d = direction[k];
        if (Math.abs(d) < 1e-8) {
            if (origin[l] < bmin[l] || origin[l] > bmax[l] || origin[m] < bmin[m] || origin[m] > bmax[m]) return false;
        } else {
            for (let t of [(bmin[k] - origin[k]) / d, (bmax[k] - origin[k]) / d]) {
                let [p, q] = [
                    origin[l] + t * direction[l],
                    origin[m] + t * direction[m]
                ]
                if ((bmin[l] < p && p < bmax[l]) && (bmin[m] < q && q < bmax[l])) return true;
            }
        }
    }
    return false;
}

export function viewRayPlaneIntersection(player, planeOrigin, planeNormal, unitX, unitY) {
    //a cleaner version of stuff above
    //calculates intersection point relative to plane origin
    let rayOrigin = player.getHeadLocation();
    let rayDirection = player.getViewDirection();
    let distanceToPlane = VMath.dot(VMath.subtract(planeOrigin, rayOrigin), planeNormal);
    let orthogonalComponent = VMath.dot(rayDirection, planeNormal); //requires ray and normal to be directed the same which probably isn't that convenient
    if (distanceToPlane <= 0 || orthogonalComponent <= 0) return 0;
    let intersection = VMath.add(rayOrigin, VMath.scale(rayDirection, distanceToPlane / orthogonalComponent));
    // mc.system.run(()=>{
    //     player.dimension.spawnParticle(`og:test`, intersection);
    //     player.dimension.spawnParticle(`og:test`, VMath.add(planeOrigin, unitX));
    //     player.dimension.spawnParticle(`og:test`, VMath.add(planeOrigin, unitY));
    //     player.dimension.spawnParticle(`og:test`, planeOrigin);
    // });
    let interactionPoint = VMath.subtract(intersection, planeOrigin)
    let [projX, projY] = [unitX, unitY].map(v => VMath.dot(v, interactionPoint) / (VMath.norm(v) ** 2));
    return [projX, projY];
}

export function highlightPlane(entity, origin, unitX, unitY, map) {
    mc.system.run(() => {
        if (!map) {
            map = new mc.MolangVariableMap();
            map.setColorRGB(`color`, { red: 0.13, green: 0.8, blue: 0.4 });
        }
        entity.dimension.spawnParticle(`og:test`, origin, map);
        entity.dimension.spawnParticle(`og:test`, VMath.add(origin, unitX), map);
        entity.dimension.spawnParticle(`og:test`, VMath.add(origin, unitY), map);
        entity.dimension.spawnParticle(`og:test`, VMath.add(origin, unitX, unitY), map);
    });
}
export function highlightRect(entity, origin, unitX, unitY, color) {
    mc.system.run(() => [origin, unitY, unitX, unitY, unitX].reduce((currentOrigin, next, i) => {
        let particleVariables = new mc.MolangVariableMap();
        if (i > 2) next = VMath.scale(next, -1);
        particleVariables.setColorRGB(`color`, color);
        particleVariables.setVector3(`direction`, next);
        entity.dimension.spawnParticle(`og:test_line`, currentOrigin, particleVariables);
        return VMath.add(currentOrigin, next);
    }))
}
export function highlightBonePlane(entity, bone, color) {
    color ??= { red: 1, green: 0, blue: 0 };
    if (!entity) return;
    let relOrigin, relX, relY;
    let xyz = [`x`, `y`, `z`];
    for (let i = 0; i < 3; i++) if (bone.size[xyz[i]] === 0) {
        relOrigin = {};
        relX = { x: 1, y: 1, z: 1 };
        relY = { x: 1, y: 1, z: 1 };
        relOrigin[xyz[i]] = 1;
        relX[xyz.at((i + 1) % 3)] = 0;
        relY[xyz.at((i - 1) % 3)] = 0;
    }
    let [rectOrigin, unitX, unitY] = getBonePlane(entity, bone, relOrigin, relX, relY);
    let map = new mc.MolangVariableMap();
    map.setColorRGB(`color`, color);
    entity.dimension.spawnParticle(`og:test`, rectOrigin, map);
    entity.dimension.spawnParticle(`og:test`, VMath.add(rectOrigin, unitX), map);
    entity.dimension.spawnParticle(`og:test`, VMath.add(rectOrigin, unitY), map);
    entity.dimension.spawnParticle(`og:test`, VMath.add(rectOrigin, unitX, unitY), map);
}
export function highlightBone(entity, bone, color = { red: 0.13, green: 0.8, blue: 0.4 }) {
    bone = { ...bone };
    bone.rotation ??= { x: 0, y: 0, z: 0 };
    bone.pivot ??= bone.origin;
    let origin = toWorldSpace(rotateAroundPivot(bone.origin, bone.pivot, bone.rotation), entity);
    let size = toWorldSpace(rotateVector(bone.size, bone.rotation), entity);
    let map = new mc.MolangVariableMap();
    map.setColorRGB(`color`, color);
    mc.system.run(() => {
        for (let i = 0; i < 8; i++) {
            entity.dimension.spawnParticle(`og:test`, VMath.add(origin, {
                x: size.x * i % 2,
                y: size.y * Math.floor(i / 2) % 2,
                z: size.z * Math.floor(i / 4) % 2
            }), map);
        }
    });
}
export function getBonePlane(entity, bone, relativeOrigin = { y: 1 }, relativeX = { x: 1, y: 1 }, relativeY = { y: 1, z: 1 }, absoluteSizing = false) {
    bone.rotation ??= { x: 0, y: 0, z: 0 };
    bone = { ...bone };
    if (absoluteSizing) bone.size = { x: 1, y: 1, z: 1 };
    bone.pivot ??= bone.origin;
    let rel = VMath.add(bone.origin, VMath.multiply(bone.size, relativeOrigin))
    let [rectOrigin, unitX, unitY] = [
        rel,
        VMath.add(bone.origin, VMath.multiply(bone.size, relativeX)),
        VMath.add(bone.origin, VMath.multiply(bone.size, relativeY))
    ].map((v) => toWorldSpace(rotateAroundPivot(v, bone.pivot, bone.rotation), entity));
    [unitX, unitY].forEach(e => Object.assign(e, VMath.subtract(e, rectOrigin)));
    return [rectOrigin, unitX, unitY];
}
function boneViewRayProjection(player, entity, bone, relativeOrigin = { y: 1 }, relativeX = { x: 1, y: 1 }, relativeY = { y: 1, z: 1 }, relativeNormal = { x: 0, y: -1, z: 0 }, absoluteSizing = false) {
    let [rectOrigin, unitX, unitY] = getBonePlane(entity, bone, relativeOrigin, relativeX, relativeY, absoluteSizing);
    let planeNormal = VMath.normalize(toWorldSpace(rotateVector(relativeNormal, bone.rotation), entity, false));
    let rayOrigin = player.getHeadLocation();
    let rayDirection = player.getViewDirection();
    let distanceToPlane = VMath.dot(VMath.subtract(rectOrigin, rayOrigin), planeNormal);
    let orthogonalComponent = VMath.dot(rayDirection, planeNormal);
    if (distanceToPlane <= 0 || orthogonalComponent <= 0 || player.isSneaking) return 0;
    let intersection = VMath.add(rayOrigin, VMath.scale(rayDirection, distanceToPlane / orthogonalComponent));
    // mc.system.run(()=>{
    //     player.dimension.spawnParticle(`og:test`, intersection);
    //     player.dimension.spawnParticle(`og:test`, VMath.add(rectOrigin, unitX));
    //     player.dimension.spawnParticle(`og:test`, VMath.add(rectOrigin, unitY));
    //     player.dimension.spawnParticle(`og:test`, rectOrigin);
    // });
    let interactionPoint = VMath.subtract(intersection, rectOrigin)
    let [projX, projY] = [unitX, unitY].map(v => VMath.dot(v, interactionPoint) / (VMath.norm(v) ** 2));
    return [projX, projY];
}

export { rayBoneDot, boneViewRayProjection, rayIntersectsBone, toEntitySpace, toWorldSpace, degreesToRadians, rotateVector, rotateAroundPivot }
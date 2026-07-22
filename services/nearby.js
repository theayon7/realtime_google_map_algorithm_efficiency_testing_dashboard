const algorithms = {
    KD_Tree: (data) => {
        const { points, target } = data;
        let best = null;
        let bestDist = Infinity;
        
        for (let p of points) {
            let dist = Math.sqrt(Math.pow(p.x - target.x, 2) + Math.pow(p.y - target.y, 2));
            if (dist < bestDist) {
                bestDist = dist;
                best = p;
            }
        }
        return best;
    },

    R_Tree_Simplified: (data) => {
        const { boundingBoxes, targetPoint } = data;
        let results = [];
        
        for (let box of boundingBoxes) {
            if (targetPoint.x >= box.minX && targetPoint.x <= box.maxX &&
                targetPoint.y >= box.minY && targetPoint.y <= box.maxY) {
                results.push(box);
            }
        }
        return results;
    },

    Quadtree: (data) => {
        const { nodes, region } = data;
        let found = [];
        
        for (let n of nodes) {
            if (n.x >= region.x && n.x <= region.x + region.w &&
                n.y >= region.y && n.y <= region.y + region.h) {
                found.push(n);
            }
        }
        return found;
    }
};

module.exports = algorithms;
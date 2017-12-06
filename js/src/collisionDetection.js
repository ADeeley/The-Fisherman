/**
 * Checks if objects a and b are colliding.
 * Assumes that both objects have x, y, width and height parameters.
 * @param {*} a The first object
 * @param {*} b The second object
 * @return {Boolean} The result.
 */
function collisionDetected(a, b) {
if (a.x < b.x + b.width && a.x + a.width > b.x &&
    a.y < b.y + b.height && a.height + a.y > b.y) {
        // Collision
        return true;
    }
    // No collision
    return false;
};

module.exports = {
    collisionDetected: collisionDetected,
};

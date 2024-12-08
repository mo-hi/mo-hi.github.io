Object.defineProperties(Array.prototype, {
    depth: {
        value: function(iterations = 99) {

            function recursiveDepth(arr) {
                if (!Array.isArray(arr)) return 0
                let ret = 0;
                for (let item of arr) {
                    ret = Math.max(ret, recursiveDepth(item));
                    if (ret >= iterations) {
                        ret = iterations-1
                        break}}
                return ret + 1
            }

            return recursiveDepth(this)
        }
    }
});


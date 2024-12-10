Object.defineProperties(Array.prototype, {
    depth: {
        value: function(iterations = 9) {

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

Object.defineProperties(Array.prototype, {
    count: {
        value: function(searchItem) {
            var ret = 0;
            for(let item of this)
                // if (Array.isArray(item)) continue
                if (searchItem===item) ret++;
            return ret;
        }
    }
});

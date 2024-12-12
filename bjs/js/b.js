// ####################################################################################################
// #                                            protoArray                                            #
// ####################################################################################################

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

// ####################################################################################################
// #                                           protoString                                            #
// ####################################################################################################

Object.defineProperties(String.prototype, {
    until: {
        value: function(n) {
            if (n == '') {return this.substring(0)}     // return this will return the wrong data type 'String()'. Equvivalent to String(this)

            let idx = this.indexOf(n)
            if (idx == -1) { 
                return this.substring(0)}
            return this.substring(0,idx)
        }
    } 
});

Object.defineProperties(String.prototype, {
    digits: {
        value: function(min, max) {
            if (min == undefined) min = 1
            if (max == undefined) max = ''
            const regex = new RegExp(`\\b\\d{${min},${max}}\\b`, 'g');
            const matches = this.match(regex);
            return matches || [];
          }
        }
});

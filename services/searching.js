const algorithms = {
    Linear_Search: (data) => {
        const { array, target } = data;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === target) return i;
        }
        return -1;
    },

    Binary_Search: (data) => {
        const { array, target } = data;
        let left = 0;
        let right = array.length - 1;

        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (array[mid] === target) return mid;
            if (array[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    },

    Trie_Search: (data) => {
        const { dictionary, target } = data;
        const trie = {};
        
        for (let word of dictionary) {
            let node = trie;
            for (let char of word) {
                if (!node[char]) node[char] = {};
                node = node[char];
            }
            node.isEndOfWord = true;
        }

        let node = trie;
        for (let char of target) {
            if (!node[char]) return false;
            node = node[char];
        }
        return node.isEndOfWord === true;
    },

    Hash_Table_Lookup: (data) => {
        const { array, target } = data;
        const hashTable = new Set(array);
        return hashTable.has(target);
    }
};

module.exports = algorithms;
function checkSumExists(a, b, v) {
    for (let numA of a) {
        for (let numB of b) {
            if (numA + numB === v) {
                return true;
            }
        }
    }
    return false;
}

//该函数的时间复杂度为 O(m * n)，其中 m 是数组 a 的长度，n 是数组 b 的长度。因为对于数组 a 中的每个元素，都要遍历数组 b 中的所有元素来进行比较。
/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves2 = function (nums) {
	// 保证是有序的，这样二分查找才有效
	nums.sort((a, b) => a - b);
	let i = 1;
	let j = nums.length - 1;
	let res = 0;
	while (i <= j) {
		console.log(1);
		// const num = Math.floor(low + higt / 2);
		// const target = nums[num];
		// if (target) {
		res += Math.abs(nums[j--] - nums[i++]);
		// }
	}
	console.log(res, 'res');
	return res;
};

minMoves2([3, 2, 1]);

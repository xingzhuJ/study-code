/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，
// 写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 - 1。

// 要点： 每次只检查中间的数值，大了往前，小了往后

var search = function (nums, target) {
	// 最小下标
	let low = 0;
	// 最大下标
	let higt = nums.length - 1;
	while (low <= higt) {
		let centerNumber = Math.floor((low + higt) / 2);
		console.log(centerNumber, 'centerNumber---');
		const num = nums[centerNumber];
		if (num === target) {
			return centerNumber;
		}
		if (target > num) {
			low = centerNumber + 1;
			continue;
		} else {
			higt = centerNumber - 1;
			continue;
		}
	}
	return -1;
};
const a = search([-1, 0, 5, 6, 7, 8, 9, 10, 11], 5);
console.log(a, '123');

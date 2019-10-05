var chihosy = function () {

  /**
   * chunk
   * @param {Array} ary 
   * @param {Number} size
   * 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。 如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
   */
  function chunk(ary, size = 1) {
    if (ary.length == 0) {
      return [];
    }
    let res = [];
    for (let i = 0; i < ary.length; i += size) {
      res.push(ary.slice(i, i + size));
    }
    return res;
  }

  /**
   * compact
   * @param {Array} ary 
   * 创建一个新数组，包含原数组中所有的非假值元素。例如false, null, 0, "", undefined, 和 NaN 都是被认为是“假值”。
   */
  function compact(ary) {
    return ary.filter(it => it);
  }

  /**
   * concat
   * @param {Array} ary 
   * @param  {...Array Or Number} args 
   * 创建一个新数组，将array与任何数组 或 值连接在一起。
   */
  function concat(ary, ...args) {
    let res = [];
    for (let item of ary) {
      res.push(item);
    }
    for (let arg of args) {
      if (Array.isArray(arg)) {
        for (let item of arg) {
          res.push(item);
        }
      }
      else {
        res.push(arg);
      }
    }
    return res;
  }

  /**
   * difference
   * @param {Array} ary 
   * @param  {...Array} args 
   * 创建一个具有唯一array值的数组，每个值不包含在其他给定的数组中。（即创建一个新数组，这个数组中的值，为第一个数字（array 参数）排除了给定数组中的值。）该方法使用 SameValueZero做相等比较。结果值的顺序是由第一个数组中的顺序确定。 
   */
  function difference(ary, ...args) {
    let arr = [];
    let res = [];
    for (let arg of args) {
      for (let item of arg) {
        if (arr.indexOf(item) == -1) {
          arr.push(item);
        }
      }
    }
    for (let a of ary) {
      if (arr.indexOf(a) == -1) {
        res.push(a);
      }
    }
    return res;
  }

  /**
   * differenceBy
   * @param {Array} ary 
   * @param  {...Array} args 
   * @param {iteratee=_.identity] (Array|Function|Object|string)} iteratee 
   * 这个方法类似 _.difference ，除了它接受一个 iteratee （迭代器）， 调用array 和 values 中的每个元素以产生比较的标准。 结果值是从第一数组中选择。iteratee 会调用一个参数：(value)。（首先使用迭代器分别迭代array 和 values中的每个元素，返回的值作为比较值）。 
   */
  function differenceBy(ary, ...args) {
    // let iteratee=args.splice(-1,1)[0];  //splice方法返回的是一个数组，iteratee是最后一个参数，此时args已经去掉了最后一个参数
    // 这玩意不就是pop(),太蠢了
    if (args.length < 1) {
      return ary;
    }
    let iteratee = args[args.length - 1];
    if (Array.isArray(iteratee)) {  //typeof 会把数组判断为object类型
      return difference(ary, ...args);
    }
    args.splice(-1, 1);
    let func;
    if (typeof iteratee == 'function') {
      func = x => iteratee(x);
    }
    if (typeof iteratee == 'string') {
      func = x => x[iteratee];
    }
    if (typeof iteratee == 'object') {
      // return ary.includes(iteratee) ? [iteratee] : [];
      // 这是错的，比较的是引用，实际上不同对象的引用是不等的，而深比较我不会
    }
    let argsArray = args.reduce((res, cus) => res.concat(cus), []); //合并...args成为一个大数组argsArray
    let argsTemp = argsArray.map(func); //argsTemp为argsArray经过func处理后的数组
    return ary.filter(item => !argsTemp.includes(func(item)));  //func(item)为ary的每项经过处理的结果
  }

  // 这个方法类似 _.difference ，除了它接受一个 comparator （比较器），它调用比较array，values中的元素。 结果值是从第一数组中选择。comparator 调用参数有两个：(arrVal, othVal)。
  // function differenceWith(ary, ...args, comparator) {
  // }

  /**
   * drop
   * @param {Array} ary 
   * @param {Number} n 
   * 创建一个切片数组，去除array前面的n个元素。（n默认值为1。）
   */
  function drop(ary, n = 1) {
    ary.splice(0, n);
    return ary;
  }

  return {
    chunk,
    compact,
    concat,
    difference,
    drop,

  }
  
}()
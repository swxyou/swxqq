(function () {
    var root = this;
    var previousUnderscore = root._;
    var breaker = {};
    var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
    var
        push = ArrayProto.push, slice = ArrayProto.slice, concat = ArrayProto.concat, toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;
    var
        nativeForEach = ArrayProto.forEach, nativeMap = ArrayProto.map, nativeReduce = ArrayProto.reduce,
        nativeReduceRight = ArrayProto.reduceRight, nativeFilter = ArrayProto.filter, nativeEvery = ArrayProto.every,
        nativeSome = ArrayProto.some, nativeIndexOf = ArrayProto.indexOf, nativeLastIndexOf = ArrayProto.lastIndexOf,
        nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = FuncProto.bind;
    var _ = function (obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else if (typeof define === 'function' && define.amd && define.amd.underscore) {
        define('underscore', [], function () {
            return _;
        });
    } else {
        root._ = _;
    }
    _.VERSION = '1.6.0';
    var each = _.each = _.forEach = function (obj, iterator, context) {
        if (obj == null) return obj;
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, length = obj.length; i < length; i++) {
                if (iterator.call(context, obj[i], i, obj) === breaker) return;
            }
        } else {
            var keys = _.keys(obj);
            for (var i = 0, length = keys.length; i < length; i++) {
                if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
            }
        }
        return obj;
    };
    _.map = _.collect = function (obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
        each(obj, function (value, index, list) {
            results.push(iterator.call(context, value, index, list));
        });
        return results;
    };
    var reduceError = 'Reduce of empty array with no initial value';
    _.reduce = _.foldl = _.inject = function (obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (obj == null) obj = [];
        if (nativeReduce && obj.reduce === nativeReduce) {
            if (context) iterator = _.bind(iterator, context);
            return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
        }
        each(obj, function (value, index, list) {
            if (!initial) {
                memo = value;
                initial = true;
            } else {
                memo = iterator.call(context, memo, value, index, list);
            }
        });
        if (!initial) throw new TypeError(reduceError);
        return memo;
    };
    _.reduceRight = _.foldr = function (obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (obj == null) obj = [];
        if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
            if (context) iterator = _.bind(iterator, context);
            return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
        }
        var length = obj.length;
        if (length !== +length) {
            var keys = _.keys(obj);
            length = keys.length;
        }
        each(obj, function (value, index, list) {
            index = keys ? keys[--length] : --length;
            if (!initial) {
                memo = obj[index];
                initial = true;
            } else {
                memo = iterator.call(context, memo, obj[index], index, list);
            }
        });
        if (!initial) throw new TypeError(reduceError);
        return memo;
    };
    _.find = _.detect = function (obj, predicate, context) {
        var result;
        any(obj, function (value, index, list) {
            if (predicate.call(context, value, index, list)) {
                result = value;
                return true;
            }
        });
        return result;
    };
    _.filter = _.select = function (obj, predicate, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
        each(obj, function (value, index, list) {
            if (predicate.call(context, value, index, list)) results.push(value);
        });
        return results;
    };
    _.reject = function (obj, predicate, context) {
        return _.filter(obj, function (value, index, list) {
            return !predicate.call(context, value, index, list);
        }, context);
    };
    _.every = _.all = function (obj, predicate, context) {
        predicate || (predicate = _.identity);
        var result = true;
        if (obj == null) return result;
        if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
        each(obj, function (value, index, list) {
            if (!(result = result && predicate.call(context, value, index, list))) return breaker;
        });
        return !!result;
    };
    var any = _.some = _.any = function (obj, predicate, context) {
        predicate || (predicate = _.identity);
        var result = false;
        if (obj == null) return result;
        if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
        each(obj, function (value, index, list) {
            if (result || (result = predicate.call(context, value, index, list))) return breaker;
        });
        return !!result;
    };
    _.contains = _.include = function (obj, target) {
        if (obj == null) return false;
        if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
        return any(obj, function (value) {
            return value === target;
        });
    };
    _.invoke = function (obj, method) {
        var args = slice.call(arguments, 2);
        var isFunc = _.isFunction(method);
        return _.map(obj, function (value) {
            return (isFunc ? method : value[method]).apply(value, args);
        });
    };
    _.pluck = function (obj, key) {
        return _.map(obj, _.property(key));
    };
    _.where = function (obj, attrs) {
        return _.filter(obj, _.matches(attrs));
    };
    _.findWhere = function (obj, attrs) {
        return _.find(obj, _.matches(attrs));
    };
    _.max = function (obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
            return Math.max.apply(Math, obj);
        }
        var result = -Infinity, lastComputed = -Infinity;
        each(obj, function (value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            if (computed > lastComputed) {
                result = value;
                lastComputed = computed;
            }
        });
        return result;
    };
    _.min = function (obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
            return Math.min.apply(Math, obj);
        }
        var result = Infinity, lastComputed = Infinity;
        each(obj, function (value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            if (computed < lastComputed) {
                result = value;
                lastComputed = computed;
            }
        });
        return result;
    };
    _.shuffle = function (obj) {
        var rand;
        var index = 0;
        var shuffled = [];
        each(obj, function (value) {
            rand = _.random(index++);
            shuffled[index - 1] = shuffled[rand];
            shuffled[rand] = value;
        });
        return shuffled;
    };
    _.sample = function (obj, n, guard) {
        if (n == null || guard) {
            if (obj.length !== +obj.length) obj = _.values(obj);
            return obj[_.random(obj.length - 1)];
        }
        return _.shuffle(obj).slice(0, Math.max(0, n));
    };
    var lookupIterator = function (value) {
        if (value == null) return _.identity;
        if (_.isFunction(value)) return value;
        return _.property(value);
    };
    _.sortBy = function (obj, iterator, context) {
        iterator = lookupIterator(iterator);
        return _.pluck(_.map(obj, function (value, index, list) {
            return {value: value, index: index, criteria: iterator.call(context, value, index, list)};
        }).sort(function (left, right) {
            var a = left.criteria;
            var b = right.criteria;
            if (a !== b) {
                if (a > b || a === void 0) return 1;
                if (a < b || b === void 0) return -1;
            }
            return left.index - right.index;
        }), 'value');
    };
    var group = function (behavior) {
        return function (obj, iterator, context) {
            var result = {};
            iterator = lookupIterator(iterator);
            each(obj, function (value, index) {
                var key = iterator.call(context, value, index, obj);
                behavior(result, key, value);
            });
            return result;
        };
    };
    _.groupBy = group(function (result, key, value) {
        _.has(result, key) ? result[key].push(value) : result[key] = [value];
    });
    _.indexBy = group(function (result, key, value) {
        result[key] = value;
    });
    _.countBy = group(function (result, key) {
        _.has(result, key) ? result[key]++ : result[key] = 1;
    });
    _.sortedIndex = function (array, obj, iterator, context) {
        iterator = lookupIterator(iterator);
        var value = iterator.call(context, obj);
        var low = 0, high = array.length;
        while (low < high) {
            var mid = (low + high) >>> 1;
            iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
        }
        return low;
    };
    _.toArray = function (obj) {
        if (!obj) return [];
        if (_.isArray(obj)) return slice.call(obj);
        if (obj.length === +obj.length) return _.map(obj, _.identity);
        return _.values(obj);
    };
    _.size = function (obj) {
        if (obj == null) return 0;
        return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
    };
    _.first = _.head = _.take = function (array, n, guard) {
        if (array == null) return void 0;
        if ((n == null) || guard) return array[0];
        if (n < 0) return [];
        return slice.call(array, 0, n);
    };
    _.initial = function (array, n, guard) {
        return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
    };
    _.last = function (array, n, guard) {
        if (array == null) return void 0;
        if ((n == null) || guard) return array[array.length - 1];
        return slice.call(array, Math.max(array.length - n, 0));
    };
    _.rest = _.tail = _.drop = function (array, n, guard) {
        return slice.call(array, (n == null) || guard ? 1 : n);
    };
    _.compact = function (array) {
        return _.filter(array, _.identity);
    };
    var flatten = function (input, shallow, output) {
        if (shallow && _.every(input, _.isArray)) {
            return concat.apply(output, input);
        }
        each(input, function (value) {
            if (_.isArray(value) || _.isArguments(value)) {
                shallow ? push.apply(output, value) : flatten(value, shallow, output);
            } else {
                output.push(value);
            }
        });
        return output;
    };
    _.flatten = function (array, shallow) {
        return flatten(array, shallow, []);
    };
    _.without = function (array) {
        return _.difference(array, slice.call(arguments, 1));
    };
    _.partition = function (array, predicate) {
        var pass = [], fail = [];
        each(array, function (elem) {
            (predicate(elem) ? pass : fail).push(elem);
        });
        return [pass, fail];
    };
    _.uniq = _.unique = function (array, isSorted, iterator, context) {
        if (_.isFunction(isSorted)) {
            context = iterator;
            iterator = isSorted;
            isSorted = false;
        }
        var initial = iterator ? _.map(array, iterator, context) : array;
        var results = [];
        var seen = [];
        each(initial, function (value, index) {
            if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
                seen.push(value);
                results.push(array[index]);
            }
        });
        return results;
    };
    _.union = function () {
        return _.uniq(_.flatten(arguments, true));
    };
    _.intersection = function (array) {
        var rest = slice.call(arguments, 1);
        return _.filter(_.uniq(array), function (item) {
            return _.every(rest, function (other) {
                return _.contains(other, item);
            });
        });
    };
    _.difference = function (array) {
        var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
        return _.filter(array, function (value) {
            return !_.contains(rest, value);
        });
    };
    _.zip = function () {
        var length = _.max(_.pluck(arguments, 'length').concat(0));
        var results = new Array(length);
        for (var i = 0; i < length; i++) {
            results[i] = _.pluck(arguments, '' + i);
        }
        return results;
    };
    _.object = function (list, values) {
        if (list == null) return {};
        var result = {};
        for (var i = 0, length = list.length; i < length; i++) {
            if (values) {
                result[list[i]] = values[i];
            } else {
                result[list[i][0]] = list[i][1];
            }
        }
        return result;
    };
    _.indexOf = function (array, item, isSorted) {
        if (array == null) return -1;
        var i = 0, length = array.length;
        if (isSorted) {
            if (typeof isSorted == 'number') {
                i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
            } else {
                i = _.sortedIndex(array, item);
                return array[i] === item ? i : -1;
            }
        }
        if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
        for (; i < length; i++) if (array[i] === item) return i;
        return -1;
    };
    _.lastIndexOf = function (array, item, from) {
        if (array == null) return -1;
        var hasIndex = from != null;
        if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
            return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
        }
        var i = (hasIndex ? from : array.length);
        while (i--) if (array[i] === item) return i;
        return -1;
    };
    _.range = function (start, stop, step) {
        if (arguments.length <= 1) {
            stop = start || 0;
            start = 0;
        }
        step = arguments[2] || 1;
        var length = Math.max(Math.ceil((stop - start) / step), 0);
        var idx = 0;
        var range = new Array(length);
        while (idx < length) {
            range[idx++] = start;
            start += step;
        }
        return range;
    };
    var ctor = function () {
    };
    _.bind = function (func, context) {
        var args, bound;
        if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
        if (!_.isFunction(func)) throw new TypeError;
        args = slice.call(arguments, 2);
        return bound = function () {
            if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
            ctor.prototype = func.prototype;
            var self = new ctor;
            ctor.prototype = null;
            var result = func.apply(self, args.concat(slice.call(arguments)));
            if (Object(result) === result) return result;
            return self;
        };
    };
    _.partial = function (func) {
        var boundArgs = slice.call(arguments, 1);
        return function () {
            var position = 0;
            var args = boundArgs.slice();
            for (var i = 0, length = args.length; i < length; i++) {
                if (args[i] === _) args[i] = arguments[position++];
            }
            while (position < arguments.length) args.push(arguments[position++]);
            return func.apply(this, args);
        };
    };
    _.bindAll = function (obj) {
        var funcs = slice.call(arguments, 1);
        if (funcs.length === 0) throw new Error('bindAll must be passed function names');
        each(funcs, function (f) {
            obj[f] = _.bind(obj[f], obj);
        });
        return obj;
    };
    _.memoize = function (func, hasher) {
        var memo = {};
        hasher || (hasher = _.identity);
        return function () {
            var key = hasher.apply(this, arguments);
            return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
        };
    };
    _.delay = function (func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function () {
            return func.apply(null, args);
        }, wait);
    };
    _.defer = function (func) {
        return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
    };
    _.throttle = function (func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        options || (options = {});
        var later = function () {
            previous = options.leading === false ? 0 : _.now();
            timeout = null;
            result = func.apply(context, args);
            context = args = null;
        };
        return function () {
            var now = _.now();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0) {
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
                context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    };
    _.debounce = function (func, wait, immediate) {
        var timeout, args, context, timestamp, result;
        var later = function () {
            var last = _.now() - timestamp;
            if (last < wait) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    context = args = null;
                }
            }
        };
        return function () {
            context = this;
            args = arguments;
            timestamp = _.now();
            var callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }
            return result;
        };
    };
    _.once = function (func) {
        var ran = false, memo;
        return function () {
            if (ran) return memo;
            ran = true;
            memo = func.apply(this, arguments);
            func = null;
            return memo;
        };
    };
    _.wrap = function (func, wrapper) {
        return _.partial(wrapper, func);
    };
    _.compose = function () {
        var funcs = arguments;
        return function () {
            var args = arguments;
            for (var i = funcs.length - 1; i >= 0; i--) {
                args = [funcs[i].apply(this, args)];
            }
            return args[0];
        };
    };
    _.after = function (times, func) {
        return function () {
            if (--times < 1) {
                return func.apply(this, arguments);
            }
        };
    };
    _.keys = function (obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj) if (_.has(obj, key)) keys.push(key);
        return keys;
    };
    _.values = function (obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var values = new Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    };
    _.pairs = function (obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var pairs = new Array(length);
        for (var i = 0; i < length; i++) {
            pairs[i] = [keys[i], obj[keys[i]]];
        }
        return pairs;
    };
    _.invert = function (obj) {
        var result = {};
        var keys = _.keys(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
            result[obj[keys[i]]] = keys[i];
        }
        return result;
    };
    _.functions = _.methods = function (obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    };
    _.extend = function (obj) {
        each(slice.call(arguments, 1), function (source) {
            if (source) {
                for (var prop in source) {
                    obj[prop] = source[prop];
                }
            }
        });
        return obj;
    };
    _.pick = function (obj) {
        var copy = {};
        var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        each(keys, function (key) {
            if (key in obj) copy[key] = obj[key];
        });
        return copy;
    };
    _.omit = function (obj) {
        var copy = {};
        var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        for (var key in obj) {
            if (!_.contains(keys, key)) copy[key] = obj[key];
        }
        return copy;
    };
    _.defaults = function (obj) {
        each(slice.call(arguments, 1), function (source) {
            if (source) {
                for (var prop in source) {
                    if (obj[prop] === void 0) obj[prop] = source[prop];
                }
            }
        });
        return obj;
    };
    _.clone = function (obj) {
        if (!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };
    _.tap = function (obj, interceptor) {
        interceptor(obj);
        return obj;
    };
    var eq = function (a, b, aStack, bStack) {
        if (a === b) return a !== 0 || 1 / a == 1 / b;
        if (a == null || b == null) return a === b;
        if (a instanceof _) a = a._wrapped;
        if (b instanceof _) b = b._wrapped;
        var className = toString.call(a);
        if (className != toString.call(b)) return false;
        switch (className) {
            case'[object String]':
                return a == String(b);
            case'[object Number]':
                return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
            case'[object Date]':
            case'[object Boolean]':
                return +a == +b;
            case'[object RegExp]':
                return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
        }
        if (typeof a != 'object' || typeof b != 'object') return false;
        var length = aStack.length;
        while (length--) {
            if (aStack[length] == a) return bStack[length] == b;
        }
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) && _.isFunction(bCtor) && (bCtor instanceof bCtor)) && ('constructor' in a && 'constructor' in b)) {
            return false;
        }
        aStack.push(a);
        bStack.push(b);
        var size = 0, result = true;
        if (className == '[object Array]') {
            size = a.length;
            result = size == b.length;
            if (result) {
                while (size--) {
                    if (!(result = eq(a[size], b[size], aStack, bStack))) break;
                }
            }
        } else {
            for (var key in a) {
                if (_.has(a, key)) {
                    size++;
                    if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
                }
            }
            if (result) {
                for (key in b) {
                    if (_.has(b, key) && !(size--)) break;
                }
                result = !size;
            }
        }
        aStack.pop();
        bStack.pop();
        return result;
    };
    _.isEqual = function (a, b) {
        return eq(a, b, [], []);
    };
    _.isEmpty = function (obj) {
        if (obj == null) return true;
        if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
        for (var key in obj) if (_.has(obj, key)) return false;
        return true;
    };
    _.isElement = function (obj) {
        return !!(obj && obj.nodeType === 1);
    };
    _.isArray = nativeIsArray || function (obj) {
        return toString.call(obj) == '[object Array]';
    };
    _.isObject = function (obj) {
        return obj === Object(obj);
    };
    each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function (name) {
        _['is' + name] = function (obj) {
            return toString.call(obj) == '[object ' + name + ']';
        };
    });
    if (!_.isArguments(arguments)) {
        _.isArguments = function (obj) {
            return !!(obj && _.has(obj, 'callee'));
        };
    }
    if (typeof(/./) !== 'function') {
        _.isFunction = function (obj) {
            return typeof obj === 'function';
        };
    }
    _.isFinite = function (obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj));
    };
    _.isNaN = function (obj) {
        return _.isNumber(obj) && obj != +obj;
    };
    _.isBoolean = function (obj) {
        return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
    };
    _.isNull = function (obj) {
        return obj === null;
    };
    _.isUndefined = function (obj) {
        return obj === void 0;
    };
    _.has = function (obj, key) {
        return hasOwnProperty.call(obj, key);
    };
    _.noConflict = function () {
        root._ = previousUnderscore;
        return this;
    };
    _.identity = function (value) {
        return value;
    };
    _.constant = function (value) {
        return function () {
            return value;
        };
    };
    _.property = function (key) {
        return function (obj) {
            return obj[key];
        };
    };
    _.matches = function (attrs) {
        return function (obj) {
            if (obj === attrs) return true;
            for (var key in attrs) {
                if (attrs[key] !== obj[key])
                    return false;
            }
            return true;
        }
    };
    _.times = function (n, iterator, context) {
        var accum = Array(Math.max(0, n));
        for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
        return accum;
    };
    _.random = function (min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };
    _.now = Date.now || function () {
        return new Date().getTime();
    };
    var entityMap = {escape: {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;'}};
    entityMap.unescape = _.invert(entityMap.escape);
    var entityRegexes = {
        escape: new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
        unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
    };
    _.each(['escape', 'unescape'], function (method) {
        _[method] = function (string) {
            if (string == null) return '';
            return ('' + string).replace(entityRegexes[method], function (match) {
                return entityMap[method][match];
            });
        };
    });
    _.result = function (object, property) {
        if (object == null) return void 0;
        var value = object[property];
        return _.isFunction(value) ? value.call(object) : value;
    };
    _.mixin = function (obj) {
        each(_.functions(obj), function (name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function () {
                var args = [this._wrapped];
                push.apply(args, arguments);
                return result.call(this, func.apply(_, args));
            };
        });
    };
    var idCounter = 0;
    _.uniqueId = function (prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    };
    _.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
    var noMatch = /(.)^/;
    var escapes = {"'": "'", '\\': '\\', '\r': 'r', '\n': 'n', '\t': 't', '\u2028': 'u2028', '\u2029': 'u2029'};
    var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    _.template = function (text, data, settings) {
        var render;
        settings = _.defaults({}, settings, _.templateSettings);
        var matcher = new RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g');
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset).replace(escaper, function (match) {
                return '\\' + escapes[match];
            });
            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
            }
            if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            }
            if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='";
            }
            index = offset + match.length;
            return match;
        });
        source += "';\n";
        if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
        source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" +
            source + "return __p;\n";
        try {
            render = new Function(settings.variable || 'obj', '_', source);
        } catch (e) {
            e.source = source;
            throw e;
        }
        if (data) return render(data, _);
        var template = function (data) {
            return render.call(this, data, _);
        };
        template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';
        return template;
    };
    _.chain = function (obj) {
        return _(obj).chain();
    };
    var result = function (obj) {
        return this._chain ? _(obj).chain() : obj;
    };
    _.mixin(_);
    each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
        var method = ArrayProto[name];
        _.prototype[name] = function () {
            var obj = this._wrapped;
            method.apply(obj, arguments);
            if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
            return result.call(this, obj);
        };
    });
    each(['concat', 'join', 'slice'], function (name) {
        var method = ArrayProto[name];
        _.prototype[name] = function () {
            return result.call(this, method.apply(this._wrapped, arguments));
        };
    });
    _.extend(_.prototype, {
        chain: function () {
            this._chain = true;
            return this;
        }, value: function () {
            return this._wrapped;
        }
    });
    return _;
}).call(this);
;(function (t, e) {
    if (typeof define === "function" && define.amd) {
        define('backbone', ["underscore", "jquery", "exports"], function (i, r, s) {
            t.Backbone = e(t, s, i, r)
        })
    } else if (typeof exports !== "undefined") {
        var i = require("underscore");
        e(t, exports, i)
    } else {
        t.Backbone = e(t, {}, t._, t.jQuery || t.Zepto || t.ender || t.$)
    }
})(this, function (t, e, i, r) {
    var s = t.Backbone;
    var n = [];
    var a = n.push;
    var o = n.slice;
    var h = n.splice;
    e.VERSION = "1.1.2";
    e.$ = r;
    e.noConflict = function () {
        t.Backbone = s;
        return this
    };
    e.emulateHTTP = false;
    e.emulateJSON = false;
    var u = e.Events = {
        on: function (t, e, i) {
            if (!c(this, "on", t, [e, i]) || !e) return this;
            this._events || (this._events = {});
            var r = this._events[t] || (this._events[t] = []);
            r.push({callback: e, context: i, ctx: i || this});
            return this
        }, once: function (t, e, r) {
            if (!c(this, "once", t, [e, r]) || !e) return this;
            var s = this;
            var n = i.once(function () {
                s.off(t, n);
                e.apply(this, arguments)
            });
            n._callback = e;
            return this.on(t, n, r)
        }, off: function (t, e, r) {
            var s, n, a, o, h, u, l, f;
            if (!this._events || !c(this, "off", t, [e, r])) return this;
            if (!t && !e && !r) {
                this._events = void 0;
                return this
            }
            o = t ? [t] : i.keys(this._events);
            for (h = 0, u = o.length; h < u; h++) {
                t = o[h];
                if (a = this._events[t]) {
                    this._events[t] = s = [];
                    if (e || r) {
                        for (l = 0, f = a.length; l < f; l++) {
                            n = a[l];
                            if (e && e !== n.callback && e !== n.callback._callback || r && r !== n.context) {
                                s.push(n)
                            }
                        }
                    }
                    if (!s.length) delete this._events[t]
                }
            }
            return this
        }, trigger: function (t) {
            if (!this._events) return this;
            var e = o.call(arguments, 1);
            if (!c(this, "trigger", t, e)) return this;
            var i = this._events[t];
            var r = this._events.all;
            if (i) f(i, e);
            if (r) f(r, arguments);
            return this
        }, stopListening: function (t, e, r) {
            var s = this._listeningTo;
            if (!s) return this;
            var n = !e && !r;
            if (!r && typeof e === "object") r = this;
            if (t) (s = {})[t._listenId] = t;
            for (var a in s) {
                t = s[a];
                t.off(e, r, this);
                if (n || i.isEmpty(t._events)) delete this._listeningTo[a]
            }
            return this
        }
    };
    var l = /\s+/;
    var c = function (t, e, i, r) {
        if (!i) return true;
        if (typeof i === "object") {
            for (var s in i) {
                t[e].apply(t, [s, i[s]].concat(r))
            }
            return false
        }
        if (l.test(i)) {
            var n = i.split(l);
            for (var a = 0, o = n.length; a < o; a++) {
                t[e].apply(t, [n[a]].concat(r))
            }
            return false
        }
        return true
    };
    var f = function (t, e) {
        var i, r = -1, s = t.length, n = e[0], a = e[1], o = e[2];
        switch (e.length) {
            case 0:
                while (++r < s) (i = t[r]).callback.call(i.ctx);
                return;
            case 1:
                while (++r < s) (i = t[r]).callback.call(i.ctx, n);
                return;
            case 2:
                while (++r < s) (i = t[r]).callback.call(i.ctx, n, a);
                return;
            case 3:
                while (++r < s) (i = t[r]).callback.call(i.ctx, n, a, o);
                return;
            default:
                while (++r < s) (i = t[r]).callback.apply(i.ctx, e);
                return
        }
    };
    var d = {listenTo: "on", listenToOnce: "once"};
    i.each(d, function (t, e) {
        u[e] = function (e, r, s) {
            var n = this._listeningTo || (this._listeningTo = {});
            var a = e._listenId || (e._listenId = i.uniqueId("l"));
            n[a] = e;
            if (!s && typeof r === "object") s = this;
            e[t](r, s, this);
            return this
        }
    });
    u.bind = u.on;
    u.unbind = u.off;
    i.extend(e, u);
    var p = e.Model = function (t, e) {
        var r = t || {};
        e || (e = {});
        this.cid = i.uniqueId("c");
        this.attributes = {};
        if (e.collection) this.collection = e.collection;
        if (e.parse) r = this.parse(r, e) || {};
        r = i.defaults({}, r, i.result(this, "defaults"));
        this.set(r, e);
        this.changed = {};
        this.initialize.apply(this, arguments)
    };
    i.extend(p.prototype, u, {
        changed: null, validationError: null, idAttribute: "id", initialize: function () {
        }, toJSON: function (t) {
            return i.clone(this.attributes)
        }, sync: function () {
            return e.sync.apply(this, arguments)
        }, get: function (t) {
            return this.attributes[t]
        }, escape: function (t) {
            return i.escape(this.get(t))
        }, has: function (t) {
            return this.get(t) != null
        }, set: function (t, e, r) {
            var s, n, a, o, h, u, l, c;
            if (t == null) return this;
            if (typeof t === "object") {
                n = t;
                r = e
            } else {
                (n = {})[t] = e
            }
            r || (r = {});
            if (!this._validate(n, r)) return false;
            a = r.unset;
            h = r.silent;
            o = [];
            u = this._changing;
            this._changing = true;
            if (!u) {
                this._previousAttributes = i.clone(this.attributes);
                this.changed = {}
            }
            c = this.attributes, l = this._previousAttributes;
            if (this.idAttribute in n) this.id = n[this.idAttribute];
            for (s in n) {
                e = n[s];
                if (!i.isEqual(c[s], e)) o.push(s);
                if (!i.isEqual(l[s], e)) {
                    this.changed[s] = e
                } else {
                    delete this.changed[s]
                }
                a ? delete c[s] : c[s] = e
            }
            if (!h) {
                if (o.length) this._pending = r;
                for (var f = 0, d = o.length; f < d; f++) {
                    this.trigger("change:" + o[f], this, c[o[f]], r)
                }
            }
            if (u) return this;
            if (!h) {
                while (this._pending) {
                    r = this._pending;
                    this._pending = false;
                    this.trigger("change", this, r)
                }
            }
            this._pending = false;
            this._changing = false;
            return this
        }, unset: function (t, e) {
            return this.set(t, void 0, i.extend({}, e, {unset: true}))
        }, clear: function (t) {
            var e = {};
            for (var r in this.attributes) e[r] = void 0;
            return this.set(e, i.extend({}, t, {unset: true}))
        }, hasChanged: function (t) {
            if (t == null) return !i.isEmpty(this.changed);
            return i.has(this.changed, t)
        }, changedAttributes: function (t) {
            if (!t) return this.hasChanged() ? i.clone(this.changed) : false;
            var e, r = false;
            var s = this._changing ? this._previousAttributes : this.attributes;
            for (var n in t) {
                if (i.isEqual(s[n], e = t[n])) continue;
                (r || (r = {}))[n] = e
            }
            return r
        }, previous: function (t) {
            if (t == null || !this._previousAttributes) return null;
            return this._previousAttributes[t]
        }, previousAttributes: function () {
            return i.clone(this._previousAttributes)
        }, fetch: function (t) {
            t = t ? i.clone(t) : {};
            if (t.parse === void 0) t.parse = true;
            var e = this;
            var r = t.success;
            t.success = function (i) {
                if (!e.set(e.parse(i, t), t)) return false;
                if (r) r(e, i, t);
                e.trigger("sync", e, i, t)
            };
            q(this, t);
            return this.sync("read", this, t)
        }, save: function (t, e, r) {
            var s, n, a, o = this.attributes;
            if (t == null || typeof t === "object") {
                s = t;
                r = e
            } else {
                (s = {})[t] = e
            }
            r = i.extend({validate: true}, r);
            if (s && !r.wait) {
                if (!this.set(s, r)) return false
            } else {
                if (!this._validate(s, r)) return false
            }
            if (s && r.wait) {
                this.attributes = i.extend({}, o, s)
            }
            if (r.parse === void 0) r.parse = true;
            var h = this;
            var u = r.success;
            r.success = function (t) {
                h.attributes = o;
                var e = h.parse(t, r);
                if (r.wait) e = i.extend(s || {}, e);
                if (i.isObject(e) && !h.set(e, r)) {
                    return false
                }
                if (u) u(h, t, r);
                h.trigger("sync", h, t, r)
            };
            q(this, r);
            n = this.isNew() ? "create" : r.patch ? "patch" : "update";
            if (n === "patch") r.attrs = s;
            a = this.sync(n, this, r);
            if (s && r.wait) this.attributes = o;
            return a
        }, destroy: function (t) {
            t = t ? i.clone(t) : {};
            var e = this;
            var r = t.success;
            var s = function () {
                e.trigger("destroy", e, e.collection, t)
            };
            t.success = function (i) {
                if (t.wait || e.isNew()) s();
                if (r) r(e, i, t);
                if (!e.isNew()) e.trigger("sync", e, i, t)
            };
            if (this.isNew()) {
                t.success();
                return false
            }
            q(this, t);
            var n = this.sync("delete", this, t);
            if (!t.wait) s();
            return n
        }, url: function () {
            var t = i.result(this, "urlRoot") || i.result(this.collection, "url") || M();
            if (this.isNew()) return t;
            return t.replace(/([^\/])$/, "$1/") + encodeURIComponent(this.id)
        }, parse: function (t, e) {
            return t
        }, clone: function () {
            return new this.constructor(this.attributes)
        }, isNew: function () {
            return !this.has(this.idAttribute)
        }, isValid: function (t) {
            return this._validate({}, i.extend(t || {}, {validate: true}))
        }, _validate: function (t, e) {
            if (!e.validate || !this.validate) return true;
            t = i.extend({}, this.attributes, t);
            var r = this.validationError = this.validate(t, e) || null;
            if (!r) return true;
            this.trigger("invalid", this, r, i.extend(e, {validationError: r}));
            return false
        }
    });
    var v = ["keys", "values", "pairs", "invert", "pick", "omit"];
    i.each(v, function (t) {
        p.prototype[t] = function () {
            var e = o.call(arguments);
            e.unshift(this.attributes);
            return i[t].apply(i, e)
        }
    });
    var g = e.Collection = function (t, e) {
        e || (e = {});
        if (e.model) this.model = e.model;
        if (e.comparator !== void 0) this.comparator = e.comparator;
        this._reset();
        this.initialize.apply(this, arguments);
        if (t) this.reset(t, i.extend({silent: true}, e))
    };
    var m = {add: true, remove: true, merge: true};
    var y = {add: true, remove: false};
    i.extend(g.prototype, u, {
        model: p, initialize: function () {
        }, toJSON: function (t) {
            return this.map(function (e) {
                return e.toJSON(t)
            })
        }, sync: function () {
            return e.sync.apply(this, arguments)
        }, add: function (t, e) {
            return this.set(t, i.extend({merge: false}, e, y))
        }, remove: function (t, e) {
            var r = !i.isArray(t);
            t = r ? [t] : i.clone(t);
            e || (e = {});
            var s, n, a, o;
            for (s = 0, n = t.length; s < n; s++) {
                o = t[s] = this.get(t[s]);
                if (!o) continue;
                delete this._byId[o.id];
                delete this._byId[o.cid];
                a = this.indexOf(o);
                this.models.splice(a, 1);
                this.length--;
                if (!e.silent) {
                    e.index = a;
                    o.trigger("remove", o, this, e)
                }
                this._removeReference(o, e)
            }
            return r ? t[0] : t
        }, set: function (t, e) {
            e = i.defaults({}, e, m);
            if (e.parse) t = this.parse(t, e);
            var r = !i.isArray(t);
            t = r ? t ? [t] : [] : i.clone(t);
            var s, n, a, o, h, u, l;
            var c = e.at;
            var f = this.model;
            var d = this.comparator && c == null && e.sort !== false;
            var v = i.isString(this.comparator) ? this.comparator : null;
            var g = [], y = [], _ = {};
            var b = e.add, w = e.merge, x = e.remove;
            var E = !d && b && x ? [] : false;
            for (s = 0, n = t.length; s < n; s++) {
                h = t[s] || {};
                if (h instanceof p) {
                    a = o = h
                } else {
                    a = h[f.prototype.idAttribute || "id"]
                }
                if (u = this.get(a)) {
                    if (x) _[u.cid] = true;
                    if (w) {
                        h = h === o ? o.attributes : h;
                        if (e.parse) h = u.parse(h, e);
                        u.set(h, e);
                        if (d && !l && u.hasChanged(v)) l = true
                    }
                    t[s] = u
                } else if (b) {
                    o = t[s] = this._prepareModel(h, e);
                    if (!o) continue;
                    g.push(o);
                    this._addReference(o, e)
                }
                o = u || o;
                if (E && (o.isNew() || !_[o.id])) E.push(o);
                _[o.id] = true
            }
            if (x) {
                for (s = 0, n = this.length; s < n; ++s) {
                    if (!_[(o = this.models[s]).cid]) y.push(o)
                }
                if (y.length) this.remove(y, e)
            }
            if (g.length || E && E.length) {
                if (d) l = true;
                this.length += g.length;
                if (c != null) {
                    for (s = 0, n = g.length; s < n; s++) {
                        this.models.splice(c + s, 0, g[s])
                    }
                } else {
                    if (E) this.models.length = 0;
                    var k = E || g;
                    for (s = 0, n = k.length; s < n; s++) {
                        this.models.push(k[s])
                    }
                }
            }
            if (l) this.sort({silent: true});
            if (!e.silent) {
                for (s = 0, n = g.length; s < n; s++) {
                    (o = g[s]).trigger("add", o, this, e)
                }
                if (l || E && E.length) this.trigger("sort", this, e)
            }
            return r ? t[0] : t
        }, reset: function (t, e) {
            e || (e = {});
            for (var r = 0, s = this.models.length; r < s; r++) {
                this._removeReference(this.models[r], e)
            }
            e.previousModels = this.models;
            this._reset();
            t = this.add(t, i.extend({silent: true}, e));
            if (!e.silent) this.trigger("reset", this, e);
            return t
        }, push: function (t, e) {
            return this.add(t, i.extend({at: this.length}, e))
        }, pop: function (t) {
            var e = this.at(this.length - 1);
            this.remove(e, t);
            return e
        }, unshift: function (t, e) {
            return this.add(t, i.extend({at: 0}, e))
        }, shift: function (t) {
            var e = this.at(0);
            this.remove(e, t);
            return e
        }, slice: function () {
            return o.apply(this.models, arguments)
        }, get: function (t) {
            if (t == null) return void 0;
            return this._byId[t] || this._byId[t.id] || this._byId[t.cid]
        }, at: function (t) {
            return this.models[t]
        }, where: function (t, e) {
            if (i.isEmpty(t)) return e ? void 0 : [];
            return this[e ? "find" : "filter"](function (e) {
                for (var i in t) {
                    if (t[i] !== e.get(i)) return false
                }
                return true
            })
        }, findWhere: function (t) {
            return this.where(t, true)
        }, sort: function (t) {
            if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
            t || (t = {});
            if (i.isString(this.comparator) || this.comparator.length === 1) {
                this.models = this.sortBy(this.comparator, this)
            } else {
                this.models.sort(i.bind(this.comparator, this))
            }
            if (!t.silent) this.trigger("sort", this, t);
            return this
        }, pluck: function (t) {
            return i.invoke(this.models, "get", t)
        }, fetch: function (t) {
            t = t ? i.clone(t) : {};
            if (t.parse === void 0) t.parse = true;
            var e = t.success;
            var r = this;
            t.success = function (i) {
                var s = t.reset ? "reset" : "set";
                r[s](i, t);
                if (e) e(r, i, t);
                r.trigger("sync", r, i, t)
            };
            q(this, t);
            return this.sync("read", this, t)
        }, create: function (t, e) {
            e = e ? i.clone(e) : {};
            if (!(t = this._prepareModel(t, e))) return false;
            if (!e.wait) this.add(t, e);
            var r = this;
            var s = e.success;
            e.success = function (t, i) {
                if (e.wait) r.add(t, e);
                if (s) s(t, i, e)
            };
            t.save(null, e);
            return t
        }, parse: function (t, e) {
            return t
        }, clone: function () {
            return new this.constructor(this.models)
        }, _reset: function () {
            this.length = 0;
            this.models = [];
            this._byId = {}
        }, _prepareModel: function (t, e) {
            if (t instanceof p) return t;
            e = e ? i.clone(e) : {};
            e.collection = this;
            var r = new this.model(t, e);
            if (!r.validationError) return r;
            this.trigger("invalid", this, r.validationError, e);
            return false
        }, _addReference: function (t, e) {
            this._byId[t.cid] = t;
            if (t.id != null) this._byId[t.id] = t;
            if (!t.collection) t.collection = this;
            t.on("all", this._onModelEvent, this)
        }, _removeReference: function (t, e) {
            if (this === t.collection) delete t.collection;
            t.off("all", this._onModelEvent, this)
        }, _onModelEvent: function (t, e, i, r) {
            if ((t === "add" || t === "remove") && i !== this) return;
            if (t === "destroy") this.remove(e, r);
            if (e && t === "change:" + e.idAttribute) {
                delete this._byId[e.previous(e.idAttribute)];
                if (e.id != null) this._byId[e.id] = e
            }
            this.trigger.apply(this, arguments)
        }
    });
    var _ = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample"];
    i.each(_, function (t) {
        g.prototype[t] = function () {
            var e = o.call(arguments);
            e.unshift(this.models);
            return i[t].apply(i, e)
        }
    });
    var b = ["groupBy", "countBy", "sortBy", "indexBy"];
    i.each(b, function (t) {
        g.prototype[t] = function (e, r) {
            var s = i.isFunction(e) ? e : function (t) {
                return t.get(e)
            };
            return i[t](this.models, s, r)
        }
    });
    var w = e.View = function (t) {
        this.cid = i.uniqueId("view");
        t || (t = {});
        i.extend(this, i.pick(t, E));
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents()
    };
    var x = /^(\S+)\s*(.*)$/;
    var E = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    i.extend(w.prototype, u, {
        tagName: "div", $: function (t) {
            return this.$el.find(t)
        }, initialize: function () {
        }, render: function () {
            return this
        }, remove: function () {
            this.$el.remove();
            this.stopListening();
            return this
        }, setElement: function (t, i) {
            if (this.$el) this.undelegateEvents();
            this.$el = t instanceof e.$ ? t : e.$(t);
            this.el = this.$el[0];
            if (i !== false) this.delegateEvents();
            return this
        }, delegateEvents: function (t) {
            if (!(t || (t = i.result(this, "events")))) return this;
            this.undelegateEvents();
            for (var e in t) {
                var r = t[e];
                if (!i.isFunction(r)) r = this[t[e]];
                if (!r) continue;
                var s = e.match(x);
                var n = s[1], a = s[2];
                r = i.bind(r, this);
                n += ".delegateEvents" + this.cid;
                if (a === "") {
                    this.$el.on(n, r)
                } else {
                    this.$el.on(n, a, r)
                }
            }
            return this
        }, undelegateEvents: function () {
            this.$el.off(".delegateEvents" + this.cid);
            return this
        }, _ensureElement: function () {
            if (!this.el) {
                var t = i.extend({}, i.result(this, "attributes"));
                if (this.id) t.id = i.result(this, "id");
                if (this.className) t["class"] = i.result(this, "className");
                var r = e.$("<" + i.result(this, "tagName") + ">").attr(t);
                this.setElement(r, false)
            } else {
                this.setElement(i.result(this, "el"), false)
            }
        }
    });
    e.sync = function (t, r, s) {
        var n = T[t];
        i.defaults(s || (s = {}), {emulateHTTP: e.emulateHTTP, emulateJSON: e.emulateJSON});
        var a = {type: n, dataType: "json"};
        if (!s.url) {
            a.url = i.result(r, "url") || M()
        }
        if (s.data == null && r && (t === "create" || t === "update" || t === "patch")) {
            a.contentType = "application/json";
            a.data = JSON.stringify(s.attrs || r.toJSON(s))
        }
        if (s.emulateJSON) {
            a.contentType = "application/x-www-form-urlencoded";
            a.data = a.data ? {model: a.data} : {}
        }
        if (s.emulateHTTP && (n === "PUT" || n === "DELETE" || n === "PATCH")) {
            a.type = "POST";
            if (s.emulateJSON) a.data._method = n;
            var o = s.beforeSend;
            s.beforeSend = function (t) {
                t.setRequestHeader("X-HTTP-Method-Override", n);
                if (o) return o.apply(this, arguments)
            }
        }
        if (a.type !== "GET" && !s.emulateJSON) {
            a.processData = false
        }
        if (a.type === "PATCH" && k) {
            a.xhr = function () {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }
        }
        var h = s.xhr = e.ajax(i.extend(a, s));
        r.trigger("request", r, h, s);
        return h
    };
    var k = typeof window !== "undefined" && !!window.ActiveXObject && !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);
    var T = {create: "POST", update: "PUT", patch: "PATCH", "delete": "DELETE", read: "GET"};
    e.ajax = function () {
        return e.$.ajax.apply(e.$, arguments)
    };
    var $ = e.Router = function (t) {
        t || (t = {});
        if (t.routes) this.routes = t.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    };
    var S = /\((.*?)\)/g;
    var H = /(\(\?)?:\w+/g;
    var A = /\*\w+/g;
    var I = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    i.extend($.prototype, u, {
        initialize: function () {
        }, route: function (t, r, s) {
            if (!i.isRegExp(t)) t = this._routeToRegExp(t);
            if (i.isFunction(r)) {
                s = r;
                r = ""
            }
            if (!s) s = this[r];
            var n = this;
            e.history.route(t, function (i) {
                var a = n._extractParameters(t, i);
                n.execute(s, a);
                n.trigger.apply(n, ["route:" + r].concat(a));
                n.trigger("route", r, a);
                e.history.trigger("route", n, r, a)
            });
            return this
        }, execute: function (t, e) {
            if (t) t.apply(this, e)
        }, navigate: function (t, i) {
            e.history.navigate(t, i);
            return this
        }, _bindRoutes: function () {
            if (!this.routes) return;
            this.routes = i.result(this, "routes");
            var t, e = i.keys(this.routes);
            while ((t = e.pop()) != null) {
                this.route(t, this.routes[t])
            }
        }, _routeToRegExp: function (t) {
            t = t.replace(I, "\\$&").replace(S, "(?:$1)?").replace(H, function (t, e) {
                return e ? t : "([^/?]+)"
            }).replace(A, "([^?]*?)");
            return new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$")
        }, _extractParameters: function (t, e) {
            var r = t.exec(e).slice(1);
            return i.map(r, function (t, e) {
                if (e === r.length - 1) return t || null;
                return t ? decodeURIComponent(t) : null
            })
        }
    });
    var N = e.History = function () {
        this.handlers = [];
        i.bindAll(this, "checkUrl");
        if (typeof window !== "undefined") {
            this.location = window.location;
            this.history = window.history
        }
    };
    var R = /^[#\/]|\s+$/g;
    var O = /^\/+|\/+$/g;
    var P = /msie [\w.]+/;
    var C = /\/$/;
    var j = /#.*$/;
    N.started = false;
    i.extend(N.prototype, u, {
        interval: 50, atRoot: function () {
            return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root
        }, getHash: function (t) {
            var e = (t || this).location.href.match(/#(.*)$/);
            return e ? e[1] : ""
        }, getFragment: function (t, e) {
            if (t == null) {
                if (this._hasPushState || !this._wantsHashChange || e) {
                    t = decodeURI(this.location.pathname + this.location.search);
                    var i = this.root.replace(C, "");
                    if (!t.indexOf(i)) t = t.slice(i.length)
                } else {
                    t = this.getHash()
                }
            }
            return t.replace(R, "")
        }, start: function (t) {
            if (N.started) throw new Error("Backbone.history has already been started");
            N.started = true;
            this.options = i.extend({root: "/"}, this.options, t);
            this.root = this.options.root;
            this._wantsHashChange = this.options.hashChange !== false;
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
            var r = this.getFragment();
            var s = document.documentMode;
            var n = P.exec(navigator.userAgent.toLowerCase()) && (!s || s <= 7);
            this.root = ("/" + this.root + "/").replace(O, "/");
            if (n && this._wantsHashChange) {
                var a = e.$('<iframe src="javascript:0" tabindex="-1">');
                this.iframe = a.hide().appendTo("body")[0].contentWindow;
                this.navigate(r)
            }
            if (this._hasPushState) {
                e.$(window).on("popstate", this.checkUrl)
            } else if (this._wantsHashChange && "onhashchange" in window && !n) {
                e.$(window).on("hashchange", this.checkUrl)
            } else if (this._wantsHashChange) {
                this._checkUrlInterval = setInterval(this.checkUrl, this.interval)
            }
            this.fragment = r;
            var o = this.location;
            if (this._wantsHashChange && this._wantsPushState) {
                if (!this._hasPushState && !this.atRoot()) {
                    this.fragment = this.getFragment(null, true);
                    this.location.replace(this.root + "#" + this.fragment);
                    return true
                } else if (this._hasPushState && this.atRoot() && o.hash) {
                    this.fragment = this.getHash().replace(R, "");
                    this.history.replaceState({}, document.title, this.root + this.fragment)
                }
            }
            if (!this.options.silent) return this.loadUrl()
        }, stop: function () {
            e.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl);
            if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
            N.started = false
        }, route: function (t, e) {
            this.handlers.unshift({route: t, callback: e})
        }, checkUrl: function (t) {
            var e = this.getFragment();
            if (e === this.fragment && this.iframe) {
                e = this.getFragment(this.getHash(this.iframe))
            }
            if (e === this.fragment) return false;
            if (this.iframe) this.navigate(e);
            this.loadUrl()
        }, loadUrl: function (t) {
            t = this.fragment = this.getFragment(t);
            return i.any(this.handlers, function (e) {
                if (e.route.test(t)) {
                    e.callback(t);
                    return true
                }
            })
        }, navigate: function (t, e) {
            if (!N.started) return false;
            if (!e || e === true) e = {trigger: !!e};
            var i = this.root + (t = this.getFragment(t || ""));
            t = t.replace(j, "");
            if (this.fragment === t) return;
            this.fragment = t;
            if (t === "" && i !== "/") i = i.slice(0, -1);
            if (this._hasPushState) {
                this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, i)
            } else if (this._wantsHashChange) {
                this._updateHash(this.location, t, e.replace);
                if (this.iframe && t !== this.getFragment(this.getHash(this.iframe))) {
                    if (!e.replace) this.iframe.document.open().close();
                    this._updateHash(this.iframe.location, t, e.replace)
                }
            } else {
                return this.location.assign(i)
            }
            if (e.trigger) return this.loadUrl(t)
        }, _updateHash: function (t, e, i) {
            if (i) {
                var r = t.href.replace(/(javascript:|#).*$/, "");
                t.replace(r + "#" + e)
            } else {
                t.hash = "#" + e
            }
        }
    });
    e.history = new N;
    var U = function (t, e) {
        var r = this;
        var s;
        if (t && i.has(t, "constructor")) {
            s = t.constructor
        } else {
            s = function () {
                return r.apply(this, arguments)
            }
        }
        i.extend(s, r, e);
        var n = function () {
            this.constructor = s
        };
        n.prototype = r.prototype;
        s.prototype = new n;
        if (t) i.extend(s.prototype, t);
        s.__super__ = r.prototype;
        return s
    };
    p.extend = g.extend = $.extend = w.extend = N.extend = U;
    var M = function () {
        throw new Error('A "url" property or function must be specified')
    };
    var q = function (t, e) {
        var i = e.error;
        e.error = function (r) {
            if (i) i(t, r, e);
            t.trigger("error", t, r, e)
        }
    };
    return e
});
;define('index_amd/base', ['underscore', 'common_amd/tool'], function () {
});
var MyMap = /** @class */ (function () {
    function MyMap() {
        this.map = {};
    }
    MyMap.prototype.hash = function (value) {
        var resultHash = 0;
        for (var i = 0; i < value.length; i++) {
            resultHash = (resultHash * 31 + value.charCodeAt(i)) % Math.pow(2, 32);
        }
        return resultHash.toString(16);
    };
    // для тестов одинкового хеша
    MyMap.prototype.testEqualHash = function (key) {
        return '01';
    };
    MyMap.prototype.add = function (key, value) {
        var hashKey = this.hash(key);
        if (!this.map[hashKey]) {
            this.map[hashKey] = [];
        }
        else {
            var existObject = this.map[hashKey].filter(function (item) { return item.key === key; });
            if (existObject.length > 0) {
                existObject[0].value = value.toString();
                return;
            }
        }
        this.map[hashKey].push({ key: key, value: value.toString() });
    };
    MyMap.prototype.delete = function (key) {
        var hashKey = this.hash(key);
        if (!this.map[hashKey]) {
            return;
        }
        if (this.map[hashKey].length > 1) {
            this.map[hashKey] = this.map[hashKey].filter(function (item) { return item.key !== key; });
        }
        else {
            delete this.map[hashKey];
        }
    };
    MyMap.prototype.get = function (key) {
        var hashKey = this.hash(key);
        var result = '';
        if (!this.map[hashKey]) {
            return result;
        }
        this.map[hashKey].forEach(function (item) {
            if (item.key === key) {
                result = item.value;
            }
        });
        return result;
    };
    MyMap.prototype.clear = function () {
        this.map = {};
    };
    return MyMap;
}());
var weatherMap = new MyMap();
weatherMap.add('London', 20);
weatherMap.add('London', 550);
weatherMap.add('Berlin', 25);
weatherMap.add('Moscow', 15);
weatherMap.add('Tula', 22);
console.log(weatherMap);
weatherMap.delete('London');
weatherMap.delete('Tula');
console.log(weatherMap);
console.log(weatherMap.get('Moscow'));
weatherMap.clear();
console.log(weatherMap);

interface IMap {
  key: string;
  value: string;
}

interface IMapItem {
  [key: string]: IMap[];
}

class MyMap {
  private map: IMapItem = {};

  private hash(value: string): string {
    let resultHash = 0;
    for (let i = 0; i < value.length; i++) {
      resultHash = (resultHash * 31 + value.charCodeAt(i)) % 2 ** 32;
    }
    return resultHash.toString(16);
  }

  // для тестов одинкового хеша
  private testEqualHash(key: string): string {
    return '01';
  }

  public add(key: string, value: number): void {
    const hashKey = this.hash(key);

    if (!this.map[hashKey]) {
      this.map[hashKey] = [];
    } else {
      const existObject = this.map[hashKey].filter((item) => item.key === key);
      if (existObject.length > 0) {
        existObject[0].value = value.toString();
        return;
      }
    }

    this.map[hashKey].push({ key, value: value.toString() });
  }

  public delete(key: string): void {
    const hashKey = this.hash(key);
    if (!this.map[hashKey]) {
      return;
    }

    if (this.map[hashKey].length > 1) {
      this.map[hashKey] = this.map[hashKey].filter((item) => item.key !== key);
    } else {
      delete this.map[hashKey];
    }
  }

  public get(key: string): string {
    const hashKey = this.hash(key);
    let result = '';

    if (!this.map[hashKey]) {
      return result;
    }

    this.map[hashKey].forEach((item) => {
      if (item.key === key) {
        result = item.value;
      }
    });

    return result;
  }

  public clear(): void {
    this.map = {};
  }
}

const weatherMap = new MyMap();
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

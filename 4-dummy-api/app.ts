import axios from 'axios';

/* 
{
      id: 30,
      firstName: 'Maurine',
      lastName: 'Stracke',
      maidenName: 'Abshire',
      age: 31,
      gender: 'female',
      email: 'kdulyt@umich.edu',
      phone: '+48 143 590 6847',
      username: 'kdulyt',
      password: '5t6q4KC7O',
      birthDate: '1964-12-18',
      image: 'https://robohash.org/Maurine.png?set=set4',
      bloodGroup: 'O-',
      height: 170,
      weight: 107.2,
      eyeColor: 'Blue',
      hair: [Object],
      domain: 'ow.ly',
      ip: '97.11.116.84',
      address: [Object],
      macAddress: '42:87:72:A1:4D:9A',
      university: 'Poznan School of Banking',
      bank: [Object],
      company: [Object],
      ein: '51-7727524',
      ssn: '534-76-0952',
      userAgent: 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11',
      crypto: [Object]
    }
*/
interface Address {
    address: string,
    city: string,
    coordinates: {
        lat: number,
        lng: number
    },
    postalCode: string,
    state: string,
}

interface User {
    id: number,
    firstName: string,
    lastName: string,
    maidenName: string,
    age: number,
    gender: 'male' | 'female',
    email: string,
    phone: string,
    username: string,
    password: string,
    birthDate: string,
    image: string,
    bloodGroup: string,
    height: number,
    weight: number,
    eyeColor: string,
    hair: {
        color: string,
        type: string,
    },
    domain: string,
    ip: string,
    address: Address,
    macAddress: string,
    university: string,
    bank: {
        cardExpire: string,
        cardNumber: string,
        cardType: string,
        currency: string,
        iban: string,
    },
    company: Address,
    ein: string,
    ssn: string,
    userAgent: string,
    crypto: {
        coin: string,
        wallet: string,
        network: string,
    }
}

interface DataSuccess {
    users: User[]
}

interface Response {
    status: number,
    data: DataSuccess,
}

async function getUsers(url: string) {
    try {
        const response: Response = await axios.get(url);
        
        if (response.status === 200) {
            console.log(response.data.users[0].gender);
            return response.data.users;
        }

        return [];
        
    } catch (error) {
        if (error instanceof Error) {
			console.log(error.message)
		}
    }
}

getUsers('https://dummyjson.com/users');

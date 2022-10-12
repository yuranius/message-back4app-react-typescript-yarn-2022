export type AddressType = {
    city: string,
    country: string
}

type UserType = {
    seyHello: (message:string) => void,
    name:string,
    age:number
    isSamurai: boolean,
    address: AddressType | null
}

let user:UserType = {
    seyHello(message:string) {alert(message)},
    name:'yuranius',
    age: 38,
    isSamurai:true,
    address: {
        city: 'Penza',
        country: 'Russia'
    }
}


let initialState = {
    name: null as string | null,
    age: null as number | null,
    isSamurai: false as boolean,
    address: [] as Array<AddressType>,
    counter: 0
}


type newStateType = typeof initialState

let user2:newStateType = {
    name:'to-yuranius',
    age: 38,
    isSamurai:true,
    address: [{country: 'Russia', city: 'Penza'}],
    counter: 34
}

console.log( '📌:',user2.address[0].city,'🌴 🏁')

// ===========================================================================


let GET_TASKS = 'GET_TASKS'

type GetTasksActionType = {
    id: number,
    type: typeof GET_TASKS
}

let action: GetTasksActionType = {
    id: 34,
    type: GET_TASKS
}

console.log( '📌:',action,'🌴 🏁')
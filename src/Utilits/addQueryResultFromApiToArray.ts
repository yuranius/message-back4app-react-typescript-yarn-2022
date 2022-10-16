interface IFriends {
	get: (name: string) => objFr
}

type objFr = {
	id: () => string
}

export function addQueryResultFromApiToArray (arrayOne:[], arrayTwo:[], fieldOne:string, fieldTwo:string) {
	let arrayIdFriends: {(): string}[] = []

	arrayOne.map((friend:IFriends) => {
		return arrayIdFriends.push(
				friend.get(fieldOne).id,
		)
	})

	arrayTwo.map((friend:IFriends) => {
		return arrayIdFriends.push(
				friend.get(fieldTwo).id,
		)
	})

	return arrayIdFriends
}


interface IUsers {
	id: string,
	get: (field: string) => urlFn
}

type urlFn = {
	url: () => string
}


export function creatArrayUsersWithStatusFriend(allUsers: Array<IUsers>, arrayIdFriends: Array<string>) {
	let allUsersAsFriends = []

	for (let result of allUsers) {
		let checkFriends = () => {
			if (arrayIdFriends.filter((el) => el === result.id).length) {
				return true
			} else {
				return false
			}
		}
		allUsersAsFriends.push({id: result.id,login: result.get('username'),avatar: result.get('avatar').url(),friend: checkFriends()})
	}

	return allUsersAsFriends
}
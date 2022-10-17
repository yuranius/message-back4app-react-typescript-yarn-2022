import {MyUsersSagaType} from "../types/reducersType";

export function mapAndPuhMessagesFromApi (messages:any, field:'user_from_id' | 'user_to_id' ) {
	let allMessage:Array<MyUsersSagaType> = []
	messages.map( (message:any) => allMessage.push({
		id: message.get(field).id,
		content: message.get('content'),
		login: message.get(field).get('username'),
		avatar: message.get(field).get('avatar').url(),
		created_at: message.get('created_at')
	}))
	console.log( '📌:',allMessage,'🌴 🏁')

	return allMessage
}


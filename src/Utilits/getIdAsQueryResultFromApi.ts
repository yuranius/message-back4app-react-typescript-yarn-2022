export function getIdAsQueryResultFromApi(result1:[], result2:[]) {
	let id = ''
	if (result1.length) {
		result1.forEach( (t:any) => {id = t.id})
	} else if (result2.length) {
		result2.forEach( (t:any) => {id = t.id})
	} else {
		return undefined
	}
	return id
}


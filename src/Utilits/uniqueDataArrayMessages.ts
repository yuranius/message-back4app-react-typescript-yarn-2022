import {MyUsersType} from "../types/reducersType";

export const  uniqueDataArrayMessages = (devices:Array<MyUsersType>) => {
	return Array.from(devices).filter((value:any, index, array) => {
		return index === array.findIndex((item:any) => Object.is(item.id, value.id));
	});
}
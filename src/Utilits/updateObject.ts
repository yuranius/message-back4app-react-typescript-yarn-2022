// items - элементы массива
// itemId - значения на сравнение (с чем сравнивать)
// objPropName - свойство, которое берем у объекта
// newObjProps  - новые свойства объекта

type updateObjectInArrayTypes = {
    items: [],
    itemId:number,
    objPropName: {},
    newObjProps: []
}

export const updateObjectInArray= (items:[], itemId:number, objPropName:string, newObjProps:[]) => {
    return items.map((u) => {
        if (u[objPropName] === itemId) {
            return { ...(u as object), ...newObjProps }; //* наоборот
        }
        return u;
    })
};
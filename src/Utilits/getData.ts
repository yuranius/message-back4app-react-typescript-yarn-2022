export let todayDate = () => {
    let time = new Date().toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
    });
    let date = new Date().toLocaleDateString();
    let days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    let d = new Date();
    let dayName = days[d.getDay()];
    let todayDate = {
        time: time,
        date: date,
        dayName: dayName,
    };
    return todayDate;
};

export const currentDate = `${todayDate().dayName} | ${todayDate().time} | ${todayDate().date}`
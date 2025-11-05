import { DateTime } from "luxon";

// const formattedDate = (fechaISO) => {
//     const localeDate = DateTime.fromISO(fechaISO).toLocal();
//     const date = localeDate.toFormat("dd/MM/yyyy");
//     const time = localeDate.toFormat(" hh:mm a");
//     return {
//         date: date,
//         time: time,
//     };
// };
const formattedDate = (fechaISO, zona = "America/Mexico_City") => {
    let dt = DateTime.fromISO(fechaISO, { zone: "utc" });

    // Si se especifica zona, la aplica, si no usa la local del navegador
    dt = zona ? dt.setZone(zona) : dt.toLocal();

    return {
        date: dt.toFormat("dd/MM/yyyy"),
        time: dt.toFormat("hh:mm a"),
    };
};

// const formattedEventDate = (fechaISO) => {
//     const localeDate = DateTime.fromISO(fechaISO).toLocal();
//     const date = localeDate.toFormat("yyyy-MM-dd HH:mm");
//     return date;
// };
const formattedEventDate = (fechaISO, zona = "America/Mexico_City") => {
    let dt = DateTime.fromISO(fechaISO, { zone: "utc" });
    dt = zona ? dt.setZone(zona) : dt.toLocal();
    return dt.toFormat("yyyy-MM-dd HH:mm");
};

function formatDateTime(date, time) {
    if (!(date instanceof Date) || !time) return null

    const d = new Date(date)
    const [hours, minutes] = time.split(':')
    d.setHours(hours)
    d.setMinutes(minutes)
    d.setSeconds(0)

    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    const hh = String(d.getHours()).padStart(2, '0')
    const mi = String(d.getMinutes()).padStart(2, '0')
    const ss = '00'

    return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`
}

export { formattedDate, formattedEventDate, formatDateTime };


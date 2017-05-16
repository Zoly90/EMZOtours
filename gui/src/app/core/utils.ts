export function sortById(sortable) {
    return sortable.sort((a, b) => {
        if (a.id < b.id) {
            return -1;
        } else if (a.id > b.id) {
            return 1;
        } else {
            return 0;
        }
    });
}
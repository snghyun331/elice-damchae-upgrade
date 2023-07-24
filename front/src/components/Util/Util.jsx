export const moodColors = {
    '😨': '#F1E3FF',
    '😮': '#FFFBB8',
    '😊': '#FFE3F0',
    '😢': '#ECF1FF',
    '😡': '#F9EBDE',
    '😐': '#E0E0E0',
};

export const truncateString = (string, length) => {
    return string.length > length ? `${string.slice(0, length)}...` : string
}

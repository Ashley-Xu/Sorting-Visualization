export default function* (input) {
    while (!is_asc(input)) {
        shuffleArray(input);
        yield {list: [...input]};
    }
}

const is_asc = list => {
    if (list.length === 0)
        return true;
    let prev = list[0];
    for (const v of list) {
        if (v < prev)
            return false;
        prev = v;
    }
    return true;
};

// list shuffling copied from https://stackoverflow.com/a/12646864
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

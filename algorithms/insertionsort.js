// translated from pseudocode on wikipedia: https://en.wikipedia.org/wiki/Insertion_sort
export default function* (list) {
    let i = 1;
    while (i < list.length) {
        let j = i;
        while (j > 0 && list[j - 1] > list[j]) {
            [list[j], list[j - 1]] = [list[j - 1], list[j]];
            --j;
            yield {list}
        }
        ++i;
    }
};



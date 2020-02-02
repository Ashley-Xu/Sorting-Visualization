

export default function* quickSort(list, smallerList = 0, greaterList = list.length - 1){

    if (list.length > 1) {
        let index = partition (list, smallerList, greaterList);

        if (smallerList < index - 1){
            yield* quickSort(list, smallerList, index - 1);
        }
        if (index < greaterList){
            yield* quickSort(list, index, greaterList);
        }
    }
    yield {list: [...list]};
    
}

function partition(list, smallerListIndex, biggerListIndex){
    let pivot = list[Math.floor((biggerListIndex + smallerListIndex)/2)]; // let the pivot be the middle element
    let i = smallerListIndex;
    let j = biggerListIndex;
    while (i <= j){
        while (list[i] < pivot) {
            i++;
        }
        while (list[j] > pivot){
            j--;
        }
        if (i <= j){
            swap(list, i, j);
            i++;
            j--;
        }
    }
    return i;
}

function swap(list, smallerListIndex, largerListIndex){
    let temp = list[smallerListIndex];
    list[smallerListIndex] = list[largerListIndex];
    list[largerListIndex]= temp;
}

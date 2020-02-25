
// Repeatedly create the maxHeap and remove the node to put to the end of the list

export default function* heapSort(list) {
    let array_length = list.length;
    console.log(array_length);

    let mid = Math.floor(array_length/2 - 1);

    for(let i = mid; i >= 0; i-- ){
        yield* heap_root(list,i);
    }
    for(let i = array_length - 1; i > 0; i--){
        swap(list, 0, i);
        array_length --;
        yield* heap_root(list,0);
    }
}

function* heap_root(list, i){
    let left = 2*i + 1;
    let right = left + 1;
    let max = i;

    if(left < list.length && list[left] > list[max]){
        max = left;
    }
    if(right < list.length && list[right] > list[max]){
        max = right;
    }
    if(max != i){
        swap(list, i, max);
        heap_root(list, max)
    }

    yield {list: [...list]};
}

function swap (list, num1, num2){
    let tmp = list[num1];
    list[num1] = list[num2];
    list[num2] = tmp;
}

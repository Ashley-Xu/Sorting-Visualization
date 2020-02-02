//translated from pseudocode on wikipedia: https://en.wikipedia.org/wiki/Bubble_sort

export default function* bubble_Sort(list){


for (var i=0; i < list.length; i++){
    for (var j=0; j < list.length-i; j++){
        if (list[j] > list[j+1]){
            swap(list, j, j+1);
            yield {list: [...list]}
        }

    }
}
function swap(arr, index1, index2){
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    }

    yield {list: [...list]}
}


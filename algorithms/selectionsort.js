export default function* selection_Sort(list){

    //Partition the list into 2 parts: a sorted part and a remaining part
    // repeatedly find the smallest element in the remaining part and add to the sorted part

    for (let i=0; i < list.length-1; i++){
        //Going through each slot of the array but the last iteration is not needed
        let currentIndex = i;
        let minValue = list[i];
        for (let j=i + 1; j < list.length; j++){ // finding the min in the remaining array
            if (list[j] < minValue){
                currentIndex = j;
                minValue = list[j];
            }
        }
        if(currentIndex!= i){
            swap(list, i, currentIndex)
        }
        yield {list: [...list]};
    }
    function swap(arr, index1, index2){
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    }

    yield {list: [...list]};
}

export default function* merge_Sort(list){
    //Since we need to yield the whole sorted list, it would be hard to do so during recursion

    yield* real_merge_Sort(list, 0, list.length-1);
}

//translated from pseudocode https://www.cs.mcgill.ca/~dprecup/courses/IntroCS/Lectures/comp250-lecture15.pdf
function* real_merge_Sort(list, i, j) {

    if (list.length <= 1){
        return list;
    }else{
        if(i<j){
            const mid = Math.floor(i+j/2);
            //let list1 = list.slice(0, mid);
            //let list2 = list.slice(mid);
            yield merge(real_merge_Sort(list, i, mid), real_merge_Sort(list, mid+1, j));
        }
    }
}

function merge(list1, list2) {
    let sortedList = [];
    let index1 = 0;
    let index2 = 0;
    while (index1 < list1.length && index2 < list2.length){
        if (list1[index1] < list2[index2]){
            sortedList.push(list1[index1]);
            index1++;
        }else if (list1[index1] > list2[index2]){
            sortedList.push(list2[index2]);
            index2++;
        }else{ //if the 2 elements are equal
            sortedList.push(list1[index1]);
            index1++;
            sortedList.push(list2[index2]);
            index2++;
        }
    }
    //In the end, one of the list will go empty first, so we need to add the other list
    while (index1 < list1.length){
        sortedList.push(list1[index1]);
        index1++;
    }
    while (index2 < list2.length){
        sortedList.push(list2[index2]);
        index2++;
    }
    return sortedList;

}

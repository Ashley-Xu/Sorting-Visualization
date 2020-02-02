//translated from pseudocode https://www.cs.mcgill.ca/~dprecup/courses/IntroCS/Lectures/comp250-lecture15.pdf

export default function* merge_sort(list, start = 0, end = list.length - 1){
    const mid = Math.floor((start+end)/2);
    if ((start + 2) > end){
        merge(list, start, mid, end);
        yield {list: [...list]};

    }else{
        yield* merge_sort(list, start, mid);
        yield* merge_sort(list, mid+1, end);
        merge(list, start, mid, end);
        yield {list: [...list]};
    }
}

// function* real_merge_Sort(list, i, j) {
//
//     if (list.length <= 1){
//         return list;
//     }else{
//         if(i<j){
//             const mid = Math.floor((i+j)/2);
//             //let list1 = list.slice(0, mid);
//             //let list2 = list.slice(mid);
//             yield* real_merge_Sort(list, i, mid);
//             yield* real_merge_Sort(list,mid+1, j);
//             yield* merge(real_merge_Sort(list, i, mid), real_merge_Sort(list, mid+1, j));
//             //yield* {list: [...list]}
//         }
//     }
// }

// function merge(list, s, mid, e){
//     let tmp = [];
//     let i = s;
//     let j = mid + 1;
//     let k = 0;
//     while (i <= mid || j <= e){
//         if (j == e + 1 || list[i] <= list[j]){
//            tmp[k] = list[i];
//         }else if(i == mid +1 || list[i] > list[j]){
//             tmp[k] = list[j];
//             j++
//         }
//         k++
//     }
//     for (k = 1; k < s-e+1; k++){
//         list[k+e-1] = tmp[k-1]
//     }
// }

function merge(list, start, mid, end){
    const copy = [...list];
    let j = mid + 1;
    let k = start;
    for (let i = start; i <= mid; i++){
        while(j <= end && copy[i] > copy[j]){
            list[k++] = copy[j++];
        }
        list[k++] = copy [i];
    }
    while(j <= end){
        list[k++] = copy[j++];
    }
}

//
// function merge(list1, list2) {
//     let sortedList = [];
//     let index1 = 0;
//     let index2 = 0;
//     while (index1 < list1.length && index2 < list2.length){
//         if (list1[index1] < list2[index2]){
//             sortedList.push(list1[index1]);
//             index1++;
//         }else if (list1[index1] > list2[index2]){
//             sortedList.push(list2[index2]);
//             index2++;
//         }else{ //if the 2 elements are equal, push both elements
//             sortedList.push(list1[index1]);
//             index1++;
//             sortedList.push(list2[index2]);
//             index2++;
//         }
//     }
//     //In the end, one of the list will go empty first, so we need to add the other list
//     while (index1 < list1.length){
//         sortedList.push(list1[index1]);
//         index1++;
//     }
//     while (index2 < list2.length){
//         sortedList.push(list2[index2]);
//         index2++;
//     }
//     return sortedList;
//
// }
//


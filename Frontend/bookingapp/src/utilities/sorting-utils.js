const SortingUtility = {
    sortByDistance(inputArray, direction) {
        inputArray.sort(function(a, b){
            if (direction === "des") {
                return b.distance - a.distance
            }
            return a.distance - b.distance
        });
        return inputArray;
    },
    sortByName(inputArray, direction) {
        inputArray.sort(function(a, b){
            let x = a.name.toLowerCase();
            let y = b.name.toLowerCase();
            if (direction === "des") {
                if (x < y) {return 1;}
                if (x > y) {return -1;}
                return 0;
            }
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
        return inputArray;
    },
    sortByRating(inputArray, direction) {
        inputArray.sort(function(a, b){
            if (direction === "des") {
                return (a.averageRating===null)-(b.averageRating===null) || -(a.averageRating>b.averageRating)||+(a.averageRating<b.averageRating);
            }
            else if (direction === "asc") {
                return (a.averageRating===null)-(b.averageRating===null) || +(a.averageRating>b.averageRating)||-(a.averageRating<b.averageRating);
            }

        });
        return inputArray;
    },
};

export default SortingUtility;
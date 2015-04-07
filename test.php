<?php

$line = "aaabbbb";

echo uniquePermutations($line);


function uniquePermutations($pattern){
    $n = 0;
    $countArray = parsePattern($pattern);
    for($i = 0; $i < count($countArray); $i++){
        if($countArray[$i] % 2 !== 0){
            $countArray[$i] = $countArray[$i] - 1;
        }
        $countArray[$i] = $countArray[$i] / 2;
        $n += $countArray[$i];
    }
    // $n now equals the number of spaces in one half of the palindrome
    
    $divisor = 1;
    foreach($countArray as $count){
        if($count > 0){
            $divisor *= gmp_fact($count);
        }
    }
    
    return gmp_fact($n) / $divisor;
    
}

/**
 * Return an array with the count of each letter
 **/
function parsePattern($pattern){
    $countArray = array();
    $str = str_split($pattern);
    foreach($str as $ch){
        if(isset($countArray[$ch])){
            $countArray[$ch]++;
        } else {
            $countArray[$ch] = 1;
        }
    }
    return $countArray;
}

?>
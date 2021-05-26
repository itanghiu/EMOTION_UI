
$(function () { // a short-hand for: $(document).ready(function() { ... });
    // ensure that the function is called once all the DOM elements
    // of the page are ready to be used.

    var i;
    for (i = 0; i < cars.length; i++) {
        text += cars[i] + "<br>";
        sentence = data.SENTENCES
        emotion = data.EMOTION
        V = data.V
        A =  data.A
        D =  data.D
        str = "<tr>"
        + "<td>" + emotion + "</td>"
        + "<td>" + V + "</td>"
        + "<td>" + A + "</td>"
        + "<td>" + D + "</td>"
         + "<td>" + sentence + "</td>"
        + "</tr>"
        $("#vertical_part").append();
    }



}